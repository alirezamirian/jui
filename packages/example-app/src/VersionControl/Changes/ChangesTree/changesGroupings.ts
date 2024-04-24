import { GetRecoilValue, isRecoilValue, selector } from "recoil";

import { vcsRootsState } from "../../file-status.state";
import { createGroupByDirectory } from "../../../tree-utils/groupByDirectory";
import { Change } from "../Change";
import {
  changeNode,
  ChangeNode,
  ChangesTreeGroupNode,
  ChangesTreeNode,
  directoryNode,
  DirectoryNode,
  isChangeNode,
  isGroupNode,
  RepositoryNode,
  repositoryNode,
} from "./ChangeTreeNode";
import { VcsActionIds } from "../../VcsActionIds";
import { MaybeRecoilValue } from "../../../recoil-utils";

export type GroupFn<T extends ChangesTreeGroupNode<any>> = (
  nodes: ReadonlyArray<ChangeNode>
) => ReadonlyArray<T>;

export interface ChangeGrouping<
  T extends ChangesTreeGroupNode<any>,
  I = string
> {
  id: I;
  title: string;
  isAvailable: MaybeRecoilValue<boolean>;
  useShortcutOf?: string;
  groupFn: MaybeRecoilValue<GroupFn<T>>;
}

const repositoryGrouping: ChangeGrouping<RepositoryNode, "repository"> = {
  id: "repository",
  title: "Repository",
  isAvailable: selector({
    key: "repositoryGrouping/isAvailable",
    get: ({ get }) => get(vcsRootsState).length > 1,
  }),
  groupFn: selector({
    key: "repositoryGrouping/groupFn",
    get:
      ({ get }: { get: GetRecoilValue }) =>
      (nodes: ReadonlyArray<ChangeNode>) => {
        const repos = get(vcsRootsState);
        return repos.map(
          (repository): RepositoryNode =>
            repositoryNode(
              repository,
              nodes.filter((node) =>
                Change.path(node.change)?.startsWith(repository.dir)
              )
            )
        );
      },
  }),
};

export const directoryGrouping: ChangeGrouping<DirectoryNode, "directory"> = {
  id: "directory",
  title: "Directory",
  isAvailable: true,
  useShortcutOf: VcsActionIds.GROUP_BY_DIRECTORY,
  groupFn: createGroupByDirectory<ChangeNode, DirectoryNode>({
    shouldCollapseDirectories: true,
    createDirectoryNode: ({ dirPath, parentNodePath, children }) =>
      directoryNode(dirPath, parentNodePath, children),
    mapNode: (node) => changeNode(node.change, false),
    getPath: (node) => Change.path(node.change),
  }),
};

export const defaultChangeGroupings: ReadonlyArray<
  ChangeGrouping<DirectoryNode | RepositoryNode, "directory" | "repository">
> = [repositoryGrouping, directoryGrouping];

export const defaultChangeGroupingsState = selector<
  ReadonlyArray<Omit<typeof defaultChangeGroupings[number], "isAvailable">>
>({
  key: "changes.availableGroupings",
  get: ({ get }) =>
    defaultChangeGroupings.filter((grouping) =>
      isRecoilValue(grouping.isAvailable)
        ? get(grouping.isAvailable)
        : grouping.isAvailable
    ),
});

export const recursiveGrouping = <T extends ChangesTreeNode<any>>(
  groupingFns: Array<GroupFn<any>> /* Typing could be improved? */,
  nodes: ReadonlyArray<ChangeNode>
): ReadonlyArray<T> | ReadonlyArray<ChangeNode> => {
  if (groupingFns.length === 0 || nodes.length === 0) {
    return nodes;
  }
  const nextGroupingFns = groupingFns.slice(1);

  const changeNodes = (nodes as ReadonlyArray<ChangesTreeNode<any>>).filter(
    isChangeNode
  );
  const groupNodes = (nodes as ReadonlyArray<ChangesTreeNode<any>>).filter(
    isGroupNode
  );
  const groups = groupingFns[0](changeNodes);

  [...groupNodes, ...groups].forEach((groupNode) => {
    groupNode.children = recursiveGrouping(nextGroupingFns, groupNode.children);
  });
  return groups.filter((group) => group.children.length > 0);
};

/**
 * returns a function that accepts a `keyPrefix` and creates change grouping function based on the
 * passed {@param groupings}, in a way that the key of each grouping node is prefixed with the `keyPrefix`.
 * Useful for grouping changes under some root nodes with potentially overlapping groups. E.g. the same
 * folder or repository node may appear under different changeLists.
 */
export const getPrefixedChangesGroupFn =
  <G extends ChangesTreeGroupNode<any>>({
    get,
    isActive,
    groupings,
  }: {
    get: GetRecoilValue;
    isActive: (groupingId: string) => MaybeRecoilValue<boolean>;
    groupings: ReadonlyArray<ChangeGrouping<G, any>>;
  }) =>
  (keyPrefix: string) => {
    const resolve = <T>(value: MaybeRecoilValue<T>): T =>
      isRecoilValue(value) ? get(value) : value;
    const groupFns = groupings
      .filter(
        ({ id, isAvailable }) => resolve(isAvailable) && resolve(isActive(id))
      )
      .map(({ groupFn }) => {
        return resolve(groupFn);
      })
      .map<GroupFn<any>>((groupFn) =>
        keyPrefix
          ? (...args) =>
              groupFn(...args).map((group) => ({
                ...group,
                key: `${keyPrefix}:${group.key}`,
              }))
          : groupFn
      );
    return (changes: readonly ChangeNode[]) =>
      recursiveGrouping<G>(groupFns, changes);
  };

export const getChangesGroupFn = (
  ...args: Parameters<typeof getPrefixedChangesGroupFn>
) => getPrefixedChangesGroupFn(...args)("");
