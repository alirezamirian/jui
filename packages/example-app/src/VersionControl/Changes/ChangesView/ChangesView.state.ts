import { atom, atomFamily, isRecoilValue, RecoilValue, selector } from "recoil";
import { Selection } from "@react-types/shared";
import { Key } from "react";
import { Change, ChangeListObj, changeListsState } from "../change-lists.state";
import { groupings } from "./changesGroupings";
import { VcsDirectoryMapping } from "../../file-status";

export interface ChangeBrowserNode<T extends string> {
  type: T;
  key: string;
}

export interface GroupNode<T extends string> extends ChangeBrowserNode<T> {
  children: ReadonlyArray<AnyNode>;
}

export interface ChangeNode extends ChangeBrowserNode<"change"> {
  change: Change;
}

export interface ChangeListNode extends GroupNode<"changelist"> {
  changeList: ChangeListObj;
}

export interface DirectoryNode extends GroupNode<"directory"> {
  dirPath: string;
  parentNodePath: string;
}

export interface RepositoryNode extends GroupNode<"repo"> {
  repository: VcsDirectoryMapping;
}

export type AnyGroupNode = ChangeListNode | RepositoryNode | DirectoryNode;
export type AnyNode = AnyGroupNode | ChangeNode;

type MaybeRecoilValue<T> = T | RecoilValue<T>;

export type GroupFn<T extends AnyGroupNode> = (
  nodes: ReadonlyArray<ChangeNode>
) => ReadonlyArray<T>;

export interface ChangeGrouping<T extends AnyGroupNode> {
  id: string;
  title: string;
  isAvailable: MaybeRecoilValue<boolean>;
  groupFn: MaybeRecoilValue<GroupFn<T>>;
}

export const currentBranchState = atom({
  key: "vcs/currentBranchName",
  default: "master",
  // TODO: effect for syncing (when toolWindow state changes?)
});

export const showIgnoredFilesState = atom({
  key: "changesView/showIgnoredFiles",
  default: false,
});

export const showRelatedFilesState = atom({
  key: "changesView/showRelatedFiles",
  default: false,
});

export const changesGroupingState = atomFamily({
  key: "changesView/grouping",
  default: true,
});
export const selectedKeysState = atom<Selection>({
  key: "changesView.selectedKeys",
  default: new Set<Key>([]),
});
export const expandedKeysState = atom<Selection>({
  key: "changesView.expandedKeys",
  default: new Set<Key>([]),
});

export const availableGroupingsState = selector({
  key: "changes.availableGroupings",
  get: ({ get }) =>
    groupings
      .filter((grouping) =>
        isRecoilValue(grouping.isAvailable)
          ? get(grouping.isAvailable)
          : grouping.isAvailable
      )
      .map((grouping) => ({
        grouping,
        isActive: get(changesGroupingState(grouping.id)),
      })),
});

const changeBrowserNodeKey = (type: string, id: string): string =>
  `${type}_${id}`;

export const changeNode = (change: Change): ChangeNode => ({
  type: "change",
  key: changeBrowserNodeKey("change", change.after.path),
  change,
});

export const changeListNode = (
  changeList: ChangeListObj,
  groupFn: GroupFn<any> = (i) => i
): ChangeListNode => ({
  type: "changelist",
  key: changeBrowserNodeKey("changelist", changeList.id),
  changeList,
  children: groupFn(changeList.changes.map((change) => changeNode(change))),
});

export const directoryNode = (
  dirPath: string,
  parentNodePath: string,
  children: AnyNode[] = []
): DirectoryNode => ({
  type: "directory",
  key: changeBrowserNodeKey("directory", dirPath),
  dirPath,
  parentNodePath,
  children,
});

export const repositoryNode = (
  repository: VcsDirectoryMapping,
  children: AnyNode[] = []
): RepositoryNode => ({
  type: "repo",
  key: changeBrowserNodeKey("repo", repository.dir),
  repository,
  children,
});

const isGroupNode = (node: ChangeBrowserNode<any>): node is GroupNode<any> =>
  "children" in node;

const isChangeNode = (node: ChangeBrowserNode<any>): node is ChangeNode =>
  node.type === "change";

export const isDirectoryNode = (node: AnyNode): node is DirectoryNode =>
  node.type === "directory";

const recursiveGrouping = (
  groupingFns: Array<GroupFn<AnyGroupNode>>,
  nodes: ReadonlyArray<ChangeBrowserNode<any>>
): ReadonlyArray<AnyGroupNode> => {
  if (groupingFns.length === 0 || nodes.length === 0) {
    return nodes as ReadonlyArray<AnyGroupNode>; // can we avoid explicit cast?
  }
  const nextGroupingFns = groupingFns.slice(1);
  const changeNodes = nodes.filter(isChangeNode);
  const groupNodes = nodes.filter(isGroupNode);
  const groups = groupingFns[0](changeNodes);

  [...groupNodes, ...groups].forEach((groupNode) => {
    groupNode.children = recursiveGrouping(nextGroupingFns, groupNode.children);
  });
  return groups;
};

export const changesTreeNodesState = selector<ChangeListNode[]>({
  key: "changesView.treeNodes",
  get: ({ get }) => {
    const resolve = <T>(value: MaybeRecoilValue<T>): T =>
      isRecoilValue(value) ? get(value) : value;
    const changeLists = get(changeListsState);
    const groupFns = get(availableGroupingsState)
      .filter(({ isActive }) => isActive)
      .map(({ grouping }) => {
        return resolve(grouping.groupFn);
      });

    const groupChanges = (changes: readonly ChangeNode[]) =>
      recursiveGrouping(groupFns, changes);

    return changeLists.map((changeList) =>
      changeListNode(changeList, groupChanges)
    );
  },
});
