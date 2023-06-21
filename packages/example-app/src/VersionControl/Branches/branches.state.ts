import { selector, selectorFamily, useRecoilCallback } from "recoil";
import git, { branch, deleteBranch } from "isomorphic-git";
import { fs } from "../../fs/fs";
import { repoCurrentBranch, vcsRootsState } from "../file-status.state";

export type LocalBranch = {
  name: string;
  isCurrent: boolean;
  trackingBranch: string | null;
};

const repoLocalBranchesState = selectorFamily<LocalBranch[], string>({
  key: "vcs/repoLocalBranches",
  get:
    (repoRoot: string) =>
    ({ get }) => {
      return git.listBranches({ fs, dir: repoRoot }).then((branches) => {
        const currentBranch = get(repoCurrentBranch(repoRoot));
        return Promise.all(
          branches.map(async (branch) => ({
            name: branch,
            isCurrent: currentBranch === branch,
            trackingBranch: await getTrackingBranch({
              fs,
              dir: repoRoot,
              branch,
            }),
          }))
        );
      });
    },
});
const repoRemoteBranchesState = selectorFamily({
  key: "vcs/repoRemoteBranches",
  get: (repoRoot: string) => async () => {
    const remotes = await git.listRemotes({ fs, dir: repoRoot });
    return (
      await Promise.all(
        remotes.map(({ remote }) =>
          git
            .listBranches({ fs, dir: repoRoot, remote })
            .then((branches) =>
              branches
                .filter((branch) => branch !== "HEAD")
                .map((branch) => `${remote}/${branch}`)
            )
        )
      )
    ).flat();
  },
});

export type RepoBranches = {
  repoRoot: string;
  localBranches: LocalBranch[];
  remoteBranches: string[];
};

export const allBranchesState = selector<RepoBranches[]>({
  key: "vcs/allBranches",
  get: ({ get }) => {
    const repoRoots = get(vcsRootsState);
    return repoRoots.map(({ dir: repoRoot }) => ({
      repoRoot,
      localBranches: get(repoLocalBranchesState(repoRoot)),
      remoteBranches: get(repoRemoteBranchesState(repoRoot)),
    }));
  },
});

async function getTrackingBranch({
  fs,
  dir,
  branch,
}: Pick<Parameters<typeof git["getConfig"]>[0], "fs" | "dir"> & {
  branch: string;
}): Promise<string | null> {
  const mergeRef = await git.getConfig({
    fs,
    dir,
    path: `branch.${branch}.merge`,
  });
  const remote = await git.getConfig({
    fs,
    dir,
    path: `branch.${branch}.remote`,
  });
  return mergeRef && remote
    ? `${remote}/${mergeRef.replace(/^refs\/heads\//, "")}`
    : null;
}

export function useCreateBranch() {
  return useRecoilCallback(
    ({ refresh }) =>
      (branchName: string, repoRoot: string, checkout: boolean = true) => {
        return branch({ fs, dir: repoRoot, checkout, ref: branchName }).then(
          () => {
            refresh(allBranchesState);
          }
        );
      },
    []
  );
}

export function useDeleteBranch() {
  return useRecoilCallback(
    ({ refresh }) =>
      (branchName: string, repoRoot: string) => {
        return deleteBranch({ fs, dir: repoRoot, ref: branchName }).then(() => {
          refresh(allBranchesState);
        });
      },
    []
  );
}
