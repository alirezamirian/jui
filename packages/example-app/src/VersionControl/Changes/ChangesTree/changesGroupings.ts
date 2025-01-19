import { atom, Atom, Getter } from "jotai";

import { vcsRootsAtom } from "../../file-status.state";
import { createGroupByDirectory } from "../../../tree-utils/groupByDirectory";
import { isAtom, MaybeAtom } from "../../../atom-utils/isAtom";
import { VcsActionIds } from "../../VcsActionIds";
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

export type GroupFn<T extends ChangesTreeGroupNode<any>> = (
  nodes: ReadonlyArray<ChangeNode>
) => ReadonlyArray<T>;

export interface ChangeGrouping<
  T extends ChangesTreeGroupNode<any>,
  I = string
> {
  id: I;
  title: string;
  isAvailable: MaybeAtom<boolean>;
  useShortcutOf?: string;
  groupFn: MaybeAtom<GroupFn<T>>;
}

const repositoryGrouping: ChangeGrouping<RepositoryNode, "repository"> = {
  id: "repository",
  title: "Repository",
  isAvailable: atom((get) => get(vcsRootsAtom).length > 1),
  groupFn: atom((get) => (nodes: ReadonlyArray<ChangeNode>) => {
    const repos = get(vcsRootsAtom);
    return repos.map(
      (repository): RepositoryNode =>
        repositoryNode(
          repository,
          nodes.filter((node) =>
            Change.path(node.change)?.startsWith(repository.dir)
          )
        )
    );
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

export const defaultChangeGroupingsAtom = atom<
  ReadonlyArray<Omit<(typeof defaultChangeGroupings)[number], "isAvailable">>
>((get) =>
  defaultChangeGroupings.filter((grouping) =>
    isAtom(grouping.isAvailable)
      ? get(grouping.isAvailable)
      : grouping.isAvailable
  )
);

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
    get: Getter;
    isActive: (groupingId: string) => MaybeAtom<boolean>;
    groupings: ReadonlyArray<ChangeGrouping<G, any>>;
  }) =>
  (keyPrefix: string) => {
    const resolve = <T>(value: Atom<T> | T): T =>
      isAtom(value) ? get(value) : value;
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
