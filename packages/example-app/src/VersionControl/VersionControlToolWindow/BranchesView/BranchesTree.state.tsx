import { basename } from "path";
import { groupBy } from "ramda";
import React, { Key, RefObject } from "react";
import { atom, atomFamily, isRecoilValue, selector } from "recoil";
import { Selection } from "@react-types/shared";
import { PlatformIcon, TreeRefValue } from "@intellij-platform/core";

import {
  allBranchesState,
  BranchType,
  isFavoriteBranchState,
  LocalBranch,
  RemoteBranch,
  RepoBranches,
} from "../../Branches/branches.state";
import {
  DirectoryNode,
  createGroupByDirectory,
} from "../../../tree-utils/groupByDirectory";
import { vcsRootsState } from "../../file-status.state";
import { vcsLogTabState } from "../vcs-logs.state";

type LocalBranchNode = {
  type: "localBranch";
  key: string;
  /**
   * Branch name (without prefixes), to show in the tree node.
   */
  name: string;
  /**
   * Whether the branch is current branch in at least one repo
   */
  isCurrent: boolean;
  /**
   * Whether the branch is marked as favorite in at least one repo
   */
  isFavorite: boolean;
  /**
   * repo names to show in parentheses, only shown when the branch doesn't exist in all repos.
   */
  repos: null | string[];

  branches: Array<{ repoRoot: string; branch: LocalBranch }>;
};
type RemoteBranchNode = {
  type: "remoteBranch";
  key: string;
  /**
   * Branch name (without prefixes), to show in the tree node.
   */
  name: string;
  /**
   * Whether the branch is marked as favorite in at least one repo
   */
  isFavorite: boolean;
  /**
   * repo names to show in parentheses, only shown when the branch doesn't exist in all repos.
   */
  repos: null | string[];
  branches: Array<{ repoRoot: string; branch: RemoteBranch }>;
};
type BranchDirectoryNode = DirectoryNode & {
  children: readonly AnyBranchTreeNode[];
};
type RepositoryNode = {
  type: "repository";
  key: string;
  repoRoot: string;
  children: ReadonlyArray<LocalBranchNode | RemoteBranchNode | DirectoryNode>;
};
export type AnyBranchTreeNode =
  | {
      type: "head";
    }
  | {
      type: "branchType";
      branchType: BranchType;
      children: readonly AnyBranchTreeNode[];
    }
  | RepositoryNode
  | BranchDirectoryNode
  | LocalBranchNode
  | RemoteBranchNode;

function getLocalBranchNodes(
  repoBranches: RepoBranches[],
  shouldGroupByDirectory: boolean
) {
  const allLocalBranches = repoBranches.flatMap(
    ({ repoRoot, localBranches, currentBranch }) =>
      localBranches.map((branch) => ({
        repoRoot,
        isCurrent: currentBranch?.name === branch.name,
        branch,
      }))
  );
  const localBranchNodes = Object.entries(
    groupBy(({ branch }) => branch.name, allLocalBranches)
  ).map<LocalBranchNode>(([name, branches]) => {
    const repos = branches.map(({ repoRoot }) => basename(repoRoot));
    return {
      type: "localBranch",
      key: `localBranch:${repos.join("|")}:${name}`,
      name,
      branches,
      isFavorite: branches.some(({ repoRoot, branch }) =>
        isFavoriteBranchState({
          repoRoot,
          branchType: "LOCAL",
          branchName: branch.name,
        })
      ),
      isCurrent: branches.some(({ isCurrent }) => isCurrent),
      repos: repos.length === repoBranches.length ? null : repos,
    };
  });
  if (shouldGroupByDirectory) {
    return groupNodesByDirectory(localBranchNodes);
  }
  return localBranchNodes;
}

function getRemoteBranchNodes(
  repoBranches: RepoBranches[],
  shouldGroupByDirectory: boolean
) {
  const allRemoteBranches = repoBranches.flatMap(
    ({ repoRoot, remoteBranches }) =>
      remoteBranches.map((branch) => ({
        repoRoot,
        branch,
      }))
  );
  const remoteBranchNodes = Object.entries(
    groupBy(
      ({ branch }) => `${branch.remote}/${branch.name}`,
      allRemoteBranches
    )
  ).map<RemoteBranchNode>(([name, branches]) => {
    const repos = branches.map(({ repoRoot }) => basename(repoRoot));
    return {
      type: "remoteBranch",
      key: `remoteBranch:${repos.join("|")}:${name}`,
      name,
      branches,
      isFavorite: branches.some(({ repoRoot, branch }) =>
        isFavoriteBranchState({
          repoRoot,
          branchType: "REMOTE",
          branchName: branch.name,
        })
      ),
      repos: repos.length === repoBranches.length ? null : repos,
    };
  });
  if (shouldGroupByDirectory) {
    return groupNodesByDirectory(remoteBranchNodes);
  }
  return remoteBranchNodes;
}

export const branchesTreeNodeState = selector({
  key: "vcs/logs/branchesTree/nodes",
  get: ({ get }): AnyBranchTreeNode[] => {
    // TODO: sorting. favorite should be on top. Others should be alphabetical
    const repoBranches = get(allBranchesState);
    const shouldGroupByDirectory = get(branchTreeGroupingState("directory"));
    const shouldGroupByRepository =
      get(isGroupByRepositoryAvailableState) &&
      get(branchTreeGroupingState("repository"));

    return [
      { type: "head" },
      {
        type: "branchType",
        branchType: "LOCAL",
        children: shouldGroupByRepository
          ? repoBranches.map((repoBranches) => {
              return {
                type: "repository",
                key: `LOCAL:repository:${repoBranches.repoRoot}`,
                repoRoot: repoBranches.repoRoot,
                children: getLocalBranchNodes(
                  [repoBranches],
                  shouldGroupByDirectory
                ),
              };
            })
          : getLocalBranchNodes(repoBranches, shouldGroupByDirectory),
      },
      {
        type: "branchType",
        branchType: "REMOTE",
        children: shouldGroupByRepository
          ? repoBranches.map((repoBranches) => {
              return {
                type: "repository",
                key: `REMOTE:repository:${repoBranches.repoRoot}`,
                repoRoot: repoBranches.repoRoot,
                children: getRemoteBranchNodes(
                  [repoBranches],
                  shouldGroupByDirectory
                ),
              };
            })
          : getRemoteBranchNodes(repoBranches, shouldGroupByDirectory),
      },
    ];
  },
});
const groupNodesByDirectory = createGroupByDirectory<
  LocalBranchNode | RemoteBranchNode,
  BranchDirectoryNode
>({
  shouldCollapseDirectories: false,
  getPath: (node) => node.name,
});
export const branchTreeGroupingState = atomFamily<
  boolean,
  "directory" | "repository"
>({
  key: "vcs/logs/branchesTree/grouping",
  default: true,
});
export const isGroupByRepositoryAvailableState = selector<boolean>({
  key: "vcs/logs/branchesTree/grouping/repo/available",
  get: ({ get }) => get(vcsRootsState).length > 1,
});
export const branchesTreeRefState = vcsLogTabState(
  atomFamily<RefObject<TreeRefValue>, string>({
    key: "vcs/logs/branchesTree/ref",
    default: React.createRef(),
    dangerouslyAllowMutability: true,
  })
);
export const selectedKeysState = vcsLogTabState(
  atomFamily<Selection, string>({
    key: "vcs/logs/branchesTree/selectedKeys",
    default: new Set(),
  })
);
export const expandedKeysState = vcsLogTabState(
  atomFamily<Set<Key>, string>({
    key: "vcs/logs/branchesTree/expandedKeys",
    default: new Set(),
  })
);

export const searchInputState = vcsLogTabState(
  atomFamily<string, string>({
    key: "vcs/logs/branchesTree/searchInput",
    default: "",
  })
);

const groupings = [
  {
    id: "directory" as const,
    title: "Directory",
    icon: <PlatformIcon icon="actions/GroupByPackage.svg" />,
    isActive: branchTreeGroupingState("directory"),
    isAvailable: true,
  },
  {
    id: "repository" as const,
    title: "Repository",
    isActive: branchTreeGroupingState("repository"),
    isAvailable: isGroupByRepositoryAvailableState,
  },
];
export const availableGroupingsState = selector({
  key: "vcs/logs/branchesTree/availableGroupings",
  get: ({ get }) =>
    groupings
      .filter((grouping) =>
        isRecoilValue(grouping.isAvailable)
          ? get(grouping.isAvailable)
          : grouping.isAvailable
      )
      .map((grouping) => ({
        ...grouping,
        isActive: get(branchTreeGroupingState(grouping.id)),
      })),
});
