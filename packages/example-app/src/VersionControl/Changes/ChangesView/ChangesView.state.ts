import { atom, atomFamily, isRecoilValue, RecoilValue, selector } from "recoil";
import { Selection } from "@react-types/shared";
import { Key } from "react";
import { Change, ChangeListObj, changeListsState } from "../change-lists.state";
import { groupings } from "./changesGroupings";
import { VcsDirectoryMapping } from "../../file-status";
import { dfsVisit } from "../../../TreeUtils/tree-utils";
import { NestedSelection, NestedSelectionState } from "@intellij-platform/core";
import { createSetInterface } from "@intellij-platform/core";

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

export interface ChangeGrouping<T extends AnyGroupNode, I = string> {
  id: I;
  title: string;
  isAvailable: MaybeRecoilValue<boolean>;
  groupFn: MaybeRecoilValue<GroupFn<T>>;
}

export const currentBranchState = atomFamily<string, string>({
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

// in a more extensible implementation, the id would be just string. but now that groupings are statically defined,
// why not have more type safety
export type GroupingIds = typeof groupings[number]["id"];

export const changesGroupingState = atomFamily<boolean, GroupingIds>({
  key: "changesView/grouping",
  default: true, // it's false in IntelliJ
});

/**
 * Selection state for the changes tree. Selection here means UI selection of tree nodes.
 */
export const selectedKeysState = atom<Selection>({
  key: "changesView.selectedKeys",
  default: new Set<Key>([]),
});

/**
 * The list of changes that are included for the commit (via checkboxes).
 * TODO: for both this and tree selection state, value should be updated to exclude removed keys, when the tree data
 *  is changed
 */
export const selectedChangesState = atom<Set<string>>({
  key: "changesView.selectedChanges",
  default: new Set<string>([]),
});

export const selectedChangesNestedSelection = selector<
  NestedSelectionState<AnyNode>
>({
  key: "changesView.selectedChanges.nestedSelectionState",
  get: ({ get, getCallback }) => {
    const { rootNodes } = get(changesTreeNodesState);
    const selectedChangeKeys = get(selectedChangesState);
    const setSelectedKeys = getCallback(
      ({ set }) => (setValue: (currentValue: Set<string>) => Set<string>) =>
        set(selectedChangesState, setValue)
    );
    return new NestedSelection(
      {
        items: selectedChangeKeys,
        ...createSetInterface(setSelectedKeys),
      },
      {
        rootNodes,
        getChildren: (item: AnyNode) =>
          isGroupNode(item) ? item.children : null,
        getKey: (item) => item.key,
      }
    );
  },
});

export const expandedKeysState = atom<Selection>({
  key: "changesView.expandedKeys",
  default: selector({
    key: "changesView.expandedKeys/temporaryDefault",
    get: ({ get }) => {
      return new Set<Key>(
        get(changesTreeNodesState)
          .rootNodes.map((node) => [
            node.key,
            ...node.children.map((child) => child.key),
          ])
          .flat()
      );
    },
  }),
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

export const isGroupNode = (
  node: ChangeBrowserNode<any>
): node is GroupNode<any> => "children" in node;

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

const getChildren = (node: AnyNode) =>
  isGroupNode(node) ? node.children : null;

export const changesTreeNodesState = selector<{
  rootNodes: ChangeListNode[];
  fileCountsMap: Map<string, number>;
}>({
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

    const rootNodes = changeLists.map((changeList) =>
      changeListNode(changeList, groupChanges)
    );
    const fileCountsMap = new Map();
    const getFileCount = (node: GroupNode<any>): number => {
      return node.children.reduce(
        (totalSum, child) =>
          totalSum + (isGroupNode(child) ? getFileCount(child) : 1),
        0
      );
    };
    dfsVisit<AnyNode, number>(
      (root) => (root === null ? rootNodes : getChildren(root)),
      (node, childrenFileCount) => {
        if (!childrenFileCount) {
          return 1;
        }
        const fileCount = childrenFileCount.reduce(
          (total, count) => total + count,
          0
        );
        fileCountsMap.set(node.key, fileCount);
        return fileCount;
      }
    );
    return { rootNodes, fileCountsMap };
  },
});

/**
 * Commit message split width, when the commit tool window is rendered in vertical layout
 */
export const commitMessageSizeState = atomFamily<
  number,
  "horizontal" | "vertical"
>({
  key: "changesView/splitter/commitMessageSize",
  default: (orientation) => (orientation === "horizontal" ? 0.4 : 0.3),
});
/**
 * Whether --amend should be used for commit.
 */
export const amendCommitState = atom({
  key: "changesView/amendCommit",
  default: false,
  // TODO: add a side effect to update message to the one from the last commit, when toggled to true.
  // it should add a record to the commit message history and switch the message. When toggled to false,
  // last entry in history should be back again. There is currently no history :D
});
/**
 * commit message text bound to the editor.
 */
export const commitMessageState = atom({
  key: "changesView/commitMessage",
  default: "",
});
