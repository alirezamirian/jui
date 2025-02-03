import { resolveRef } from "isomorphic-git";
import { equals } from "ramda";
import { Key } from "react";
import { Selection } from "@react-types/shared";
import { atom } from "jotai";
import { atomFamily, atomWithDefault } from "jotai/utils";
import { withAtomEffect } from "jotai-effect";

import { CommitWithMeta, readCommits } from "../git-operations/readCommits";
import { vcsRootsAtom } from "../file-status.state";
import {
  repoBranchesAtom,
  repoCurrentBranchNameAtom,
} from "../Branches/branches.state";
import { fs } from "../../fs/fs";
import { createCommitsChangesTreeState } from "../VersionControlToolWindow/CommitChanges/createCommitsChangesTreeState";
import { activeFileRepoAtom } from "../active-file.state";
import { unwrapLatestOrNull } from "../../atom-utils/unwrapLatest";

export const pushLogTreeSelectionAtom = atom<Selection>(new Set([]));

/**
 * OIDs of the selected commits in commits table.
 */
export const pushLogSelectedCommitsAtom = atom(async (get) => {
  const selection = get(pushLogTreeSelectionAtom);
  const repoNodes = await get(pushTreeNodesAtom);
  return (
    selection === "all" ? repoNodes.map(({ key }) => key) : [...selection]
  )
    .flatMap((key) => {
      const { repo: repoPath, commit: oid } = deserializeKey(key);
      if (repoPath && oid) {
        return [
          {
            repoPath,
            oid,
          },
        ];
      }
      if (repoPath) {
        return repoNodes
          .find((repo) => repo.key === key)
          ?.children.map(
            ({
              commit: {
                repoPath,
                readCommitResult: { oid },
              },
            }) => ({
              repoPath,
              oid,
            })
          );
      }
    })
    .filter((i) => i != undefined);
});

export const pushDetailsTreeState = createCommitsChangesTreeState(
  pushLogSelectedCommitsAtom
);

export type PushTreeCommitNode = {
  type: "commit";
  key: string;
  commit: CommitWithMeta;
};
export type PushTreeRepoNode = {
  type: "repo";
  key: string;
  repo: {
    dir: string;
  };
  source:
    | {
        type: "branch";
        ref: string;
      }
    | {
        type: "commit";
        ref: string;
      };
  target: {
    remote: string;
    branch: string;
    isNew: boolean;
  };
  children: ReadonlyArray<PushTreeCommitNode>;
};

export type AnyPushTreeNode = PushTreeCommitNode | PushTreeRepoNode;

const serializeKey = (data: Record<string, string>) =>
  JSON.stringify(data, null);

export const getRepoFromKey = (key: Key) => deserializeKey(key)?.repo;
const deserializeKey = (key: Key) => JSON.parse(`${key}`);

const PushTreeNode = {
  repo: function ({
    commits,
    ...params
  }: Omit<PushTreeRepoNode, "key" | "type" | "children"> & {
    commits: CommitWithMeta[];
  }): PushTreeRepoNode {
    return {
      type: "repo",
      key: serializeKey({ repo: params.repo.dir }),
      children: commits.map(PushTreeNode.commit),
      ...params,
    };
  },
  commit: function (commitWithMeta: CommitWithMeta): PushTreeCommitNode {
    return {
      type: "commit",
      key: serializeKey({
        repo: commitWithMeta.repoPath,
        commit: commitWithMeta.readCommitResult.oid,
      }),
      commit: commitWithMeta,
    };
  },
};

const pushSourceAtom = atomFamily((repoPath: string) =>
  atom(async (get) => {
    const currentBranchName = await get(repoCurrentBranchNameAtom(repoPath));
    return currentBranchName
      ? {
          type: "branch" as const,
          ref: currentBranchName,
        }
      : {
          type: "commit" as const,
          ref: await resolveRef({ fs, dir: repoPath, ref: "HEAD" }),
        };
  })
);

export const pushTargetRemoteAtom = atomFamily((repoPath: string) =>
  atomWithDefault<string | Promise<string>>(async (get) => {
    const { currentBranch, remoteBranches } = await get(
      repoBranchesAtom(repoPath)
    );
    const trackingBranch = currentBranch?.trackingBranch;
    return trackingBranch
      ? trackingBranch.split("/")[0]
      : remoteBranches[0].remote;
  })
);

export const pushTargetBranchAtom = atomFamily((repoPath: string) =>
  atomWithDefault<string | Promise<string>>(async (get) => {
    const { currentBranch } = await get(repoBranchesAtom(repoPath));
    const trackingBranch = currentBranch?.trackingBranch;
    return (
      trackingBranch?.split("/").slice(1).join("/") ??
      currentBranch?.name ??
      "detached"
    );
  })
);
const pushTargetExistsAtom = atomFamily((repoPath: string) =>
  atom(async (get) => {
    const { remoteBranches } = await get(repoBranchesAtom(repoPath));
    const targetBranch = await get(pushTargetBranchAtom(repoPath));
    const targetRemote = await get(pushTargetRemoteAtom(repoPath));
    return remoteBranches.some(
      (branch) => branch.remote === targetRemote && branch.name === targetBranch
    );
  })
);

const commitNodesAtom = atomFamily(
  ({ repoPath }: { repoPath: string }) =>
    unwrapLatestOrNull(
      atom(async (get) => {
        const { remoteBranches } = await get(repoBranchesAtom(repoPath));
        const source = await get(pushSourceAtom(repoPath));
        const targetRemote = await get(pushTargetRemoteAtom(repoPath));
        const targetBranch = await get(pushTargetBranchAtom(repoPath));
        const targetExists = await get(pushTargetExistsAtom(repoPath));
        const allTargetRemoteRefs = remoteBranches
          .filter((branch) => branch.remote === targetRemote)
          .map((branch) => `${targetRemote}/${branch.name}`);
        console.log("reading commits", {
          repoPath,
          refs: [source.ref],
          notRefs: targetExists ? [targetBranch] : allTargetRemoteRefs,
        });
        return await readCommits(fs, {
          repoPath,
          refs: [source.ref],
          notRefs: targetExists
            ? [`${targetRemote}/${targetBranch}`]
            : allTargetRemoteRefs,
        });
      })
    ),
  equals
);

export const pushTreeNodesAtom = atom(
  (get): Promise<ReadonlyArray<PushTreeRepoNode>> => {
    const repo = get(vcsRootsAtom);

    return Promise.all(
      repo.map(async (repo) => {
        const targetRemote = await get(pushTargetRemoteAtom(repo.dir));
        const targetBranch = await get(pushTargetBranchAtom(repo.dir));
        const source = await get(pushSourceAtom(repo.dir));
        const targetExists = await get(pushTargetExistsAtom(repo.dir));
        return PushTreeNode.repo({
          repo,
          source,
          target: {
            remote: targetRemote,
            branch: targetBranch,
            isNew: !targetExists,
          },
          commits:
            get(
              commitNodesAtom({
                repoPath: repo.dir,
              })
            ) ?? [],
        });
      })
    );
  }
);

export const pushTreeIncludedReposAtom = withAtomEffect(
  atom<string[]>([]),
  (get, set) => {
    const repoRoots = get(vcsRootsAtom);
    set(
      pushTreeIncludedReposAtom,
      repoRoots.length === 1 ? [repoRoots[0].dir] : []
    );
    get.peek(activeFileRepoAtom).then((currentRepo) => {
      set(pushTreeIncludedReposAtom, currentRepo ? [currentRepo] : []);
    });
  }
);
