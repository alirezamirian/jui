import { sortBy } from "ramda";
import { Key } from "react";
import { atom, atomFamily, CallbackInterface, selector } from "recoil";
import { Selection } from "@react-types/shared";

import {
  ChangeListObj,
  changeListsState,
  unversionedChangesState,
} from "../change-lists.state";
import {
  defaultChangeGroupings,
  defaultChangeGroupingsState,
  getPrefixedChangesGroupFn,
  GroupFn,
} from "../ChangesTree/changesGroupings";
import {
  bfsVisit,
  getExpandedToNodesKeys,
} from "@intellij-platform/core/utils/tree-utils";
import { notNull } from "@intellij-platform/core/utils/array-utils";
import {
  createSetInterface,
  NestedSelection,
  NestedSelectionState,
} from "@intellij-platform/core";
import { rollbackViewState } from "../Rollback/rollbackView.state";
import { activePathsState } from "../../../Project/project.state";
import {
  ChangeNode,
  changeNode,
  ChangesTreeGroupNode,
  ChangesTreeNode,
  changesTreeNodeKey,
  ExtendedChangesTreeNode,
  getNodeKeyForChange,
  GroupNodes,
  isGroupNode,
} from "../ChangesTree/ChangeTreeNode";
import { Task } from "../../../tasks";
import { AnyChange, Change } from "../Change";
import { changesTreeNodesResult } from "../ChangesTree/changesTreeNodesResult";
import { allChangesState } from "../changes.state";

export interface ChangeListNode<
  C extends ChangesTreeNode<any> = ChangesViewTreeNode
> extends ChangesTreeGroupNode<"changelist", C> {
  changeList: ChangeListObj;
}
export interface UnversionedChangesNode<
  C extends ChangesTreeNode<any> = ChangeNode
> extends ChangesTreeGroupNode<"unversioned", C> {}

export type ChangesViewTreeNode = ExtendedChangesTreeNode<
  ChangeListNode | UnversionedChangesNode
>;

export const changeListNode = (
  changeList: ChangeListObj
): ChangeListNode<ChangeNode> => ({
  type: "changelist",
  key: changesTreeNodeKey("changelist", changeList.id),
  changeList,
  children: changeList.changes.map((change) => changeNode(change)),
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
export type GroupingIds = typeof defaultChangeGroupings[number]["id"];

export const changesGroupingActiveState = atomFamily<boolean, string>({
  key: "changesView/isGroupingActive",
  default: true, // it's false in IntelliJ
});

/**
 * Selection state for the changes tree. Selection here means UI selection of tree nodes, not the checkboxes.
 */
export const selectedKeysState = atom<Selection>({
  key: "changesView.selectedKeys",
  default: new Set<Key>([]),
});

/**
 * Same as {@link selectedKeysState}, but always a set of key. i.e. "all" is resolved to keys.
 */
export const resolvedSelectedKeysState = selector<Set<Key>>({
  key: "changesView.resolvedSelectedKeys",
  get: ({ get }) => {
    const selection = get(selectedKeysState);
    if (selection === "all") {
      const { rootNodes } = get(changesTreeNodesState);
      return new Set(
        bfsVisit<ChangesViewTreeNode, ChangesViewTreeNode[]>(
          (node) => ("children" in node ? node.children : []),
          (node, parentValue) => {
            const nodes = parentValue ?? [];
            nodes.push(node);
            return nodes;
          },
          rootNodes
        )
          .flat()
          .map((node) => node.key)
      );
    }
    return selection;
  },
});

/**
 * The List of currently selected nodes in Changes tree. Based on {@link selectedKeysState}
 */
const selectedNodesState = selector<ReadonlySet<ChangesViewTreeNode>>({
  key: "changesView.selectedNodes",
  get: ({ get }) => {
    const selectedKeys = get(resolvedSelectedKeysState);
    const { byKey } = get(changesTreeNodesState);
    return new Set(
      [...selectedKeys].map((key) => byKey.get(key)).filter(notNull)
    );
  },
});

export const changesUnderSelectedKeys = selector<ReadonlySet<AnyChange>>({
  key: "changesView.selectedKeys.changes",
  get: ({ get }) => {
    const selectedNodes = get(selectedNodesState);
    const allChanges: Set<AnyChange> = new Set();
    const processNode = (node: ChangesViewTreeNode | undefined) => {
      if (!node) {
        return;
      }
      if (node.type === "change") {
        allChanges.add(node.change);
      }
      if (isGroupNode<ChangesViewTreeNode>(node)) {
        node.children.forEach(processNode);
      }
    };
    selectedNodes.forEach(processNode);
    return allChanges;
  },
});

/**
 * The changelists from which at least one change is selected in the Changes tree view.
 */
export const changeListsUnderSelection = selector<ReadonlySet<ChangeListObj>>({
  key: "changesView.selectedChangeLists",
  get: ({ get }) => {
    const selectedNodes = get(selectedNodesState);
    const allChangeLists = get(changeListsState);

    const selectedChangeLists: Set<ChangeListObj> = new Set();
    const processNode = (node: ChangesViewTreeNode | undefined) => {
      if (!node) {
        return;
      }
      if (node.type === "changelist") {
        selectedChangeLists.add(node.changeList);
      }
      if (node.type === "change") {
        const changeList = allChangeLists.find((changeList) =>
          changeList.changes.includes(node.change)
        );
        if (changeList) {
          selectedChangeLists.add(changeList);
        }
      }
      if (isGroupNode<ChangesViewTreeNode>(node)) {
        node.children.forEach(processNode);
      }
    };
    selectedNodes.forEach(processNode);
    return selectedChangeLists;
  },
});

/**
 * The list of changes that are included for the commit (via checkboxes).
 * TODO: for both this and tree selection state, value should be updated to exclude removed keys, when the tree data
 *  is changed
 */
export const includedChangeKeysState = atom<Set<string>>({
  key: "changesView.includedChangeKeys",
  default: new Set<string>([]),
});

export const includedChangesState = selector<ReadonlyArray<AnyChange>>({
  key: "changesView.includedChanges",
  get: ({ get }) => {
    const includedChangeKeys = get(includedChangeKeysState);
    const allChanges = get(allChangesState);
    return allChanges.filter((change) =>
      includedChangeKeys.has(getNodeKeyForChange(change))
    );
  },
});

/**
 * A NestedSelection state, inferred based on selected changes. NestedSelection holds the checkmark state of all nodes
 * based on the selected leaf nodes.
 */
export const includedChangesNestedSelection = selector<
  NestedSelectionState<ChangesViewTreeNode>
>({
  key: "changesView.selectedChanges.nestedSelectionState",
  get: ({ get, getCallback }) => {
    const { rootNodes } = get(changesTreeNodesState);
    const includedChangeKeys = get(includedChangeKeysState);
    const setSelectedKeys = getCallback(
      ({ set }) =>
        (setValue: (currentValue: Set<string>) => Set<string>) =>
          set(includedChangeKeysState, setValue)
    );
    return new NestedSelection(
      {
        items: includedChangeKeys,
        ...createSetInterface(setSelectedKeys),
      },
      {
        rootNodes,
        getChildren: (item: ChangesViewTreeNode) =>
          isGroupNode<ChangesViewTreeNode>(item) ? item.children : null,
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

export const changesViewGroupingsState = selector({
  key: "changes.groupings",
  get: ({ get, getCallback }) =>
    get(defaultChangeGroupingsState).map((grouping) => ({
      ...grouping,
      isActive: get(changesGroupingActiveState(grouping.id)),
    })),
});

const groupChildren = <
  T extends ChangesTreeGroupNode<any, ChangeNode>,
  G extends ChangesTreeNode<any>
>(
  node: T,
  groupFn: (
    nodes: ReadonlyArray<ChangeNode>
  ) => ReturnType<GroupFn<GroupNodes<G>>> | ReadonlyArray<ChangeNode>
) => ({
  ...node,
  children: groupFn(node.children),
});

export const changesTreeNodesState = selector<{
  rootNodes: ReadonlyArray<ChangeListNode | UnversionedChangesNode>;
  fileCountsMap: Map<Key, number>;
  byKey: Map<Key, ChangesViewTreeNode>;
}>({
  key: "changesView.treeNodes",
  get: ({ get }) => {
    const changeListNodes = sortBy(
      ({ active }) => !active,
      get(changeListsState)
    ).map(changeListNode);
    const prefixedGroupFn = getPrefixedChangesGroupFn({
      get,
      groupings: defaultChangeGroupings,
      isActive: changesGroupingActiveState,
    });
    const unversionedChanges = get(unversionedChangesState);
    const rootNodes: Array<ChangeListNode | UnversionedChangesNode> =
      changeListNodes.map((changeListNode) =>
        groupChildren(changeListNode, prefixedGroupFn(changeListNode.key))
      );
    if (unversionedChanges.length > 0) {
      const unversionedChangesNode: UnversionedChangesNode = {
        key: "unversioned",
        type: "unversioned",
        children: unversionedChanges.map((change) => changeNode(change)),
      };
      rootNodes.push(
        groupChildren(unversionedChangesNode, prefixedGroupFn("unversioned"))
      );
    }
    return changesTreeNodesResult(rootNodes);
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

/**
 * Whether to show error message related to attempting to commit without selecting any change.
 */
export const commitErrorMessageState = atom({
  key: "changesView/commitErrorMessage",
  default: "",
});

export const commitTaskIdState = atom<Task["id"] | null>({
  key: "changesView/commitTaskId",
  default: null,
});

export const changesFromActivePathsState = selector({
  key: "changesView/changesFromActivePaths",
  get: ({ get }) => {
    const activePaths = get(activePathsState);
    return get(allChangesState).filter((change) =>
      activePaths.some((activePath) =>
        Change.path(change).startsWith(activePath)
      )
    );
  },
});

/**
 * Recoil callback for queuing and marking changes as included based on a list of paths.
 */
export const queueCheckInCallback = ({ set, snapshot }: CallbackInterface) => {
  /**
   * @param paths: paths to filter changes based on. If not provided, activePaths is used.
   */
  return (paths?: string[]) => {
    const changes = paths
      ? snapshot
          .getLoadable(allChangesState)
          .getValue()
          .filter((change) =>
            paths.some((activePath) =>
              Change.path(change).startsWith(activePath)
            )
          )
      : snapshot.getLoadable(changesFromActivePathsState).getValue();

    const includedChangeKeys = changes.map(getNodeKeyForChange);
    set(includedChangeKeysState, new Set(includedChangeKeys));
    if (includedChangeKeys.length > 0) {
      const expandedKeys = getExpandedToNodesKeys<ChangesViewTreeNode>(
        (node) =>
          isGroupNode<ChangesViewTreeNode>(node) ? node.children : null,
        (node) => node.key,
        snapshot.getLoadable(changesTreeNodesState).getValue().rootNodes,
        includedChangeKeys
      );
      set(expandedKeysState, (currentExpandedKeys) => {
        return new Set([
          ...(currentExpandedKeys !== "all"
            ? currentExpandedKeys
            : new Set<Key>()),
          ...expandedKeys,
        ]);
      });
      set(selectedKeysState, new Set([includedChangeKeys[0]]));
    }
  };
};

export const openRollbackWindowForSelectionCallback = ({
  set,
  snapshot,
}: CallbackInterface) => {
  /**
   * If contextual is true, changes related to {@link activePathsState} will be preselected.
   */
  return (contextual = true) => {
    const activePaths = snapshot.getLoadable(activePathsState).getValue();
    const changesUnderSelection = snapshot
      .getLoadable(changesUnderSelectedKeys)
      .getValue();
    const changesBasedOnActivePaths =
      contextual && activePaths.length > 0
        ? snapshot.getLoadable(changesFromActivePathsState).getValue()
        : null;
    set(
      rollbackViewState.initiallyIncludedChanges,
      changesBasedOnActivePaths ?? [...changesUnderSelection]
    );
    set(rollbackViewState.isOpen, true);
  };
};
