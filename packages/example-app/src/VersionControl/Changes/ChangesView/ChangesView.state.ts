import { sortBy } from "ramda";
import { Key } from "react";
import {
  atom,
  atomFamily,
  CallbackInterface,
  isRecoilValue,
  RecoilValue,
  selector,
} from "recoil";
import { Selection } from "@react-types/shared";

import {
  allChangesState,
  Change,
  ChangeListObj,
  changeListsState,
} from "../change-lists.state";
import { groupings } from "./changesGroupings";
import {
  bfsVisit,
  dfsVisit,
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
  AnyGroupNode,
  AnyNode,
  ChangeBrowserNode,
  ChangeListNode,
  changeListNode,
  ChangeNode,
  getChildren,
  getNodeKeyForChange,
  GroupNode,
  isChangeNode,
  isGroupNode,
} from "./change-view-nodes";

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
        bfsVisit<AnyNode, AnyNode[]>(
          (node) => (isGroupNode(node) ? node.children : []),
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
const selectedNodesState = selector<ReadonlySet<AnyNode>>({
  key: "changesView.selectedNodes",
  get: ({ get }) => {
    const selectedKeys = get(resolvedSelectedKeysState);
    const { byKey } = get(changesTreeNodesState);
    return new Set(
      [...selectedKeys].map((key) => byKey.get(key)).filter(notNull)
    );
  },
});

export const changesUnderSelectedKeys = selector<ReadonlySet<Change>>({
  key: "changesView.selectedKeys.changes",
  get: ({ get }) => {
    const selectedNodes = get(selectedNodesState);
    const allChanges: Set<Change> = new Set();
    const processNode = (node: AnyNode | undefined) => {
      if (!node) {
        return;
      }
      if (node.type === "change") {
        allChanges.add(node.change);
      }
      if (isGroupNode(node)) {
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
    const processNode = (node: AnyNode | undefined) => {
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
      if (isGroupNode(node)) {
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

export const includedChangesState = selector<ReadonlyArray<Change>>({
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
  NestedSelectionState<AnyNode>
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
  return groups.filter((group) => group.children.length > 0);
};

export const changesTreeNodesState = selector<{
  rootNodes: ChangeListNode[];
  fileCountsMap: Map<Key, number>;
  byKey: Map<Key, AnyNode>;
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

    const rootNodes = sortBy(({ active }) => !active, changeLists).map(
      (changeList) => changeListNode(changeList, groupChanges)
    );
    const fileCountsMap = new Map();
    const byKey = new Map();
    const getFileCount = (node: GroupNode<any>): number => {
      return node.children.reduce(
        (totalSum, child) =>
          totalSum + (isGroupNode(child) ? getFileCount(child) : 1),
        0
      );
    };
    dfsVisit<AnyNode, number>(
      getChildren,
      (node, childrenFileCount) => {
        byKey.set(node.key, node);
        if (!childrenFileCount) {
          return 1;
        }
        const fileCount = childrenFileCount.reduce(
          (total, count) => total + count,
          0
        );
        fileCountsMap.set(node.key, fileCount);
        return fileCount;
      },
      rootNodes
    );
    return { rootNodes, fileCountsMap, byKey };
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

export const isCommitInProgressState = atom({
  key: "changesView/commitInProgress",
  default: false,
});

export const changesFromActivePaths = selector({
  key: "changesView/changesFromActivePaths",
  get: ({ get }) => {
    const activePaths = get(activePathsState);
    return get(allChangesState).filter((change) =>
      activePaths.some((activePath) => change.after.path.startsWith(activePath))
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
            paths.some((activePath) => change.after.path.startsWith(activePath))
          )
      : snapshot.getLoadable(changesFromActivePaths).getValue();

    const includedChangeKeys = changes.map(getNodeKeyForChange);
    set(includedChangeKeysState, new Set(includedChangeKeys));
    if (includedChangeKeys.length > 0) {
      const expandedKeys = getExpandedToNodesKeys<AnyNode>(
        (node) => (isGroupNode(node) ? node.children : null),
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
        ? snapshot.getLoadable(changesFromActivePaths).getValue()
        : null;
    set(
      rollbackViewState.initiallyIncludedChanges,
      changesBasedOnActivePaths ?? [...changesUnderSelection]
    );
    set(rollbackViewState.isOpen, true);
  };
};
