import { GetRecoilValue, isRecoilValue, RecoilValue, selector } from "recoil";

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
import { ChangesViewTreeNode } from "../ChangesView/ChangesView.state";

export type MaybeRecoilValue<T> = T | RecoilValue<T>;

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
  groupFn: MaybeRecoilValue<GroupFn<T>>;
}

const repositoryGrouping: ChangeGrouping<RepositoryNode, "repository"> = {
  id: "repository",
  title: "Repository",
  isAvailable: selector({
    key: "repositoryGrouping/isAvailable",
    get: ({ get }) => get(vcsRootsState).length > 0,
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
                (
                  node.change.after?.path || node.change.before?.path
                )?.startsWith(repository.dir)
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
  groupFn: createGroupByDirectory<ChangeNode, DirectoryNode>({
    shouldCollapseDirectories: true,
    createDirectoryNode: ({ dirPath, parentNodePath, children }) =>
      directoryNode(dirPath, parentNodePath, children),
    mapNode: (node) => changeNode(node.change, false),
    getPath: (node) => {
      return Change.path(node.change);
    },
  }),
};

export const defaultChangeGroupings = [repositoryGrouping, directoryGrouping];

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
  nodes: ReadonlyArray<T>
): ReadonlyArray<T> => {
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
export const getChangesGroupFn = <G extends ChangeGrouping<any>>({
  get,
  isActive,
  groupings = defaultChangeGroupings as any /* FIXME */,
}: {
  get: GetRecoilValue;
  isActive: (groupingId: string) => MaybeRecoilValue<boolean>;
  groupings?: ReadonlyArray<G>;
}) => {
  const resolve = <T>(value: MaybeRecoilValue<T>): T =>
    isRecoilValue(value) ? get(value) : value;
  const groupFns = groupings
    .filter(
      ({ id, isAvailable }) => resolve(isAvailable) && resolve(isActive(id))
    )
    .map(({ groupFn }) => {
      return resolve(groupFn);
    });
  return (changes: readonly ChangeNode[]) => {
    return recursiveGrouping<ChangesViewTreeNode>(groupFns, changes);
  };
};
