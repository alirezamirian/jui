import { sortBy } from "ramda";
import { Key } from "react";
import { atom, Getter, Setter } from "jotai";
import { atomFamily, atomWithDefault } from "jotai/utils";
import { Selection } from "@react-types/shared";

import {
  ChangeListObj,
  changeListsAtom,
  unversionedChangesAtom,
} from "../change-lists.state";
import {
  defaultChangeGroupings,
  defaultChangeGroupingsAtom,
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
import { activePathsAtom } from "../../../Project/project.state";
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
import { allChangesAtom } from "../changes.state";
import { withAtomEffect } from "jotai-effect";

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

export const showIgnoredFilesAtom = atom(false);

export const showRelatedFilesAtom = atom(false);

// in a more extensible implementation, the id would be just string. but now that groupings are statically defined,
// why not have more type safety
export type GroupingIds = (typeof defaultChangeGroupings)[number]["id"];

export const changesGroupingActiveState = atomFamily(
  (name: string) => atom(true) // it's false in IntelliJ
);

/**
 * Selection state for the changes tree. Selection here means UI selection of tree nodes, not the checkboxes.
 */
export const selectedKeysAtom = atom<Selection>(new Set<Key>([]));

/**
 * Same as {@link selectedKeysAtom}, but always a set of key. i.e. "all" is resolved to keys.
 */
export const resolvedSelectedKeysAtom = atom<Set<Key>>((get) => {
  const selection = get(selectedKeysAtom);
  if (selection === "all") {
    const { rootNodes } = get(changesTreeNodesAtom);
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
});

/**
 * The List of currently selected nodes in Changes tree. Based on {@link selectedKeysAtom}
 */
const selectedNodesAtom = atom<ReadonlySet<ChangesViewTreeNode>>((get) => {
  const selectedKeys = get(resolvedSelectedKeysAtom);
  const { byKey } = get(changesTreeNodesAtom);
  return new Set(
    [...selectedKeys].map((key) => byKey.get(key)).filter(notNull)
  );
});

export const changesUnderSelectedKeysAtom = atom<ReadonlySet<AnyChange>>(
  (get) => {
    const selectedNodes = get(selectedNodesAtom);
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
  }
);

/**
 * The changelists from which at least one change is selected in the Changes tree view.
 */
export const changeListsUnderSelection = atom<ReadonlySet<ChangeListObj>>(
  (get) => {
    const selectedNodes = get(selectedNodesAtom);
    const allChangeLists = get(changeListsAtom);

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
  }
);

/**
 * The list of changes that are included for the commit (via checkboxes).
 * TODO: for both this and tree selection state, value should be updated to exclude removed keys, when the tree data
 *  is changed
 */
export const includedChangeKeysAtom = atom<Set<string>>(new Set<string>([]));

export const includedChangesAtom = atom<ReadonlyArray<AnyChange>>((get) => {
  const includedChangeKeys = get(includedChangeKeysAtom);
  const allChanges = get(allChangesAtom);
  return allChanges.filter((change) =>
    includedChangeKeys.has(getNodeKeyForChange(change))
  );
});

/**
 * A NestedSelection state, inferred based on selected changes. NestedSelection holds the checkmark state of all nodes
 * based on the selected leaf nodes.
 */
export const includedChangesNestedSelectionAtom = atom<
  NestedSelectionState<ChangesViewTreeNode>,
  [(currentValue: Set<string>) => Set<string>],
  void
>(
  (get, { setSelf }) => {
    const { rootNodes } = get(changesTreeNodesAtom);
    const includedChangeKeys = get(includedChangeKeysAtom);
    return new NestedSelection(
      {
        items: includedChangeKeys,
        ...createSetInterface<string>(setSelf),
      },
      {
        rootNodes,
        getChildren: (item: ChangesViewTreeNode) =>
          isGroupNode<ChangesViewTreeNode>(item) ? item.children : null,
        getKey: (item) => item.key,
      }
    );
  },
  (_get, set, updater: (currentValue: Set<string>) => Set<string>) => {
    set(includedChangeKeysAtom, updater);
  }
);

export const expandedKeysAtom = atomWithDefault(
  (get) =>
    new Set<Key>(
      get(changesTreeNodesAtom)
        .rootNodes.map((node) => [
          node.key,
          ...node.children.map((child) => child.key),
        ])
        .flat()
    )
);

export const changesViewGroupingsState = atom((get) =>
  get(defaultChangeGroupingsAtom).map((grouping) => ({
    ...grouping,
    isActive: get(changesGroupingActiveState(grouping.id)),
  }))
);

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

export const changesTreeNodesAtom = atom<{
  rootNodes: ReadonlyArray<ChangeListNode | UnversionedChangesNode>;
  fileCountsMap: Map<Key, number>;
  byKey: Map<Key, ChangesViewTreeNode>;
}>((get) => {
  const changeListNodes = sortBy(
    ({ active }) => !active,
    get(changeListsAtom)
  ).map(changeListNode);
  const prefixedGroupFn = getPrefixedChangesGroupFn({
    get,
    groupings: defaultChangeGroupings,
    isActive: changesGroupingActiveState,
  });
  const unversionedChanges = get(unversionedChangesAtom);
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
});

/**
 * Commit message split width, when the commit tool window is rendered in vertical layout
 */
export const commitMessageSizeState = atomFamily(
  (orientation: "horizontal" | "vertical") =>
    atom(orientation === "horizontal" ? 0.4 : 0.3)
);
/**
 * Whether --amend should be used for commit.
 */
// TODO: add a side effect to update message to the one from the last commit, when toggled to true.
// it should add a record to the commit message history and switch the message. When toggled to false,
// last entry in history should be back again. There is currently no history :D
export const amendCommitAtom = atom(false);
/**
 * commit message text bound to the editor.
 */
export const commitMessageAtom = atom("");

/**
 * Whether to show error message related to attempting to commit without selecting any change.
 */
export const commitErrorMessageAtom = atom("");

export const commitTaskIdAtom = atom<Task["id"] | null>(null);

export const changesFromActivePathsAtom = atom((get) => {
  const activePaths = get(activePathsAtom);
  return get(allChangesAtom).filter((change) =>
    activePaths.some((activePath) => Change.path(change).startsWith(activePath))
  );
});
/**
 * Atom callback for queuing and marking changes as included based on a list of paths.
 */
export const queueCheckInCallback = (
  get: Getter,
  set: Setter,
  /**
   * paths: paths to filter changes based on. If not provided, activePaths is used.
   */
  paths?: string[]
) => {
  const changes = paths
    ? get(allChangesAtom).filter((change) =>
        paths.some((activePath) => Change.path(change).startsWith(activePath))
      )
    : get(changesFromActivePathsAtom);

  const includedChangeKeys = changes.map(getNodeKeyForChange);
  set(includedChangeKeysAtom, new Set(includedChangeKeys));
  if (includedChangeKeys.length > 0) {
    const expandedKeys = getExpandedToNodesKeys<ChangesViewTreeNode>(
      (node) => (isGroupNode<ChangesViewTreeNode>(node) ? node.children : null),
      (node) => node.key,
      get(changesTreeNodesAtom).rootNodes,
      includedChangeKeys
    );
    set(expandedKeysAtom, (currentExpandedKeys) => {
      return new Set([
        ...(currentExpandedKeys ?? new Set<Key>()),
        ...expandedKeys,
      ]);
    });
    set(selectedKeysAtom, new Set([includedChangeKeys[0]]));
  }
};

/**
 * If contextual is true, changes related to {@link activePathsAtom} will be preselected.
 */
export const openRollbackWindowForSelectionCallback = (
  get: Getter,
  set: Setter,
  contextual = true
) => {
  const activePaths = get(activePathsAtom);
  const changesUnderSelection = get(changesUnderSelectedKeysAtom);
  const changesBasedOnActivePaths =
    contextual && activePaths.length > 0
      ? get(changesFromActivePathsAtom)
      : null;
  set(
    rollbackViewState.initiallyIncludedChangesAtom,
    changesBasedOnActivePaths ?? [...changesUnderSelection]
  );
  set(rollbackViewState.isOpenAtom, true);
};
