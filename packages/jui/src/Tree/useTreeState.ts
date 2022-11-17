import { Collection, Node } from "@react-types/shared";
import { TreeProps as _TreeProps, TreeState } from "@react-stately/tree";
import {
  TreeRefValue,
  useTreeRef,
} from "@intellij-platform/core/Tree/useTreeRef";
import { ForwardedRef, Key, useEffect, useMemo } from "react";
import { useMultipleSelectionState } from "@react-stately/selection";
import { useCollection } from "@react-stately/collections";
import { useControlledState } from "@react-stately/utils";
import {
  CollectionCacheInvalidationProps,
  useCollectionCacheInvalidation,
} from "@intellij-platform/core/Collections/useCollectionCacheInvalidation";
import { TreeCollection } from "./__copied__TreeCollection";
import { getSingleChildrenKeys } from "./getSingleChildrenKeys";
import { TreeSelectionManager } from "@intellij-platform/core/Tree/TreeSelectionManager";

export interface TreeProps<T>
  extends _TreeProps<T>,
    CollectionCacheInvalidationProps {}
/**
 * Provides state management for tree-like components. Handles building a collection
 * of items from props, item expanded state, and manages multiple selection state.
 *
 * Similar to (and initially copied from) useTreeState from @react-stately/tree, but with the following changes:
 * - Supports exposing some imperative API via ref.
 *   Could be done via a wrapper too.
 * - Different onToggle implementation with two adjustments to match Intellij Platform:
 *   - Collapsing a key collapses all descendants as well.
 *   - Expanding a single-child node will recursively expand all single-child descendants.
 *   Couldn't be done with a wrapper in a clean and optimal way. Access to setExpandedKey is not provided. We would need
 *   to either maintain a new state for expanded keys and ignore the one returned from the wrapped hook, or
 *   inefficiently call the returned `toggleKey` function many times.
 * - Supports collection invalidation via CollectionCacheInvalidationProps
 *   Perhaps not the most important addition, but not possible to be done via a wrapper.
 * - Uses TreeSelectionManager instead of the default SelectionManager, which implements expand/shrink selection.
 *   Could be done in a wrapper, with a little hack. Would need to replace selection manager.
 */
export function useTreeState<T extends object>(
  props: TreeProps<T>,
  treeRef?: ForwardedRef<TreeRefValue>
): TreeState<T> {
  let [expandedKeys, setExpandedKeys] = useControlledState(
    props.expandedKeys ? new Set(props.expandedKeys) : undefined!,
    props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : new Set(),
    props.onExpandedChange!
  );

  let selectionState = useMultipleSelectionState({
    ...props,
    selectionBehavior: "replace",
  });
  let disabledKeys = useMemo(
    () => (props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>()),
    [props.disabledKeys]
  );

  const context = useCollectionCacheInvalidation(props);

  let tree = useCollection(
    props,
    // @ts-expect-error imprecise typing in @react-stately/selection
    (nodes) => new TreeCollection(nodes, { expandedKeys }),
    context,
    [expandedKeys]
  );

  const selectionManager = new TreeSelectionManager(tree, selectionState);

  useTreeRef({ selectionManager }, treeRef);

  // Reset focused key if that item is deleted from the collection.
  useEffect(() => {
    if (
      selectionState.focusedKey != null &&
      !tree.getItem(selectionState.focusedKey)
    ) {
      // @ts-expect-error imprecise typing in @react-stately/selection
      selectionState.setFocusedKey(null);
    }
  }, [tree, selectionState.focusedKey]);

  const onToggle = (key: Key) => {
    setExpandedKeys(toggleTreeNode(tree, expandedKeys, key));
  };

  return {
    collection: tree,
    expandedKeys,
    disabledKeys,
    toggleKey: onToggle,
    selectionManager,
  };
}
function toggleTreeNode(
  tree: Collection<Node<unknown>>,
  expandedKeys: Set<Key>,
  key: Key
): Set<Key> {
  const newKeys = toggleKey(expandedKeys, key);
  // In Intellij impl, when a node is collapsed, all descendants are also collapsed. In other words, keys that are
  // not a part of the list of visible nodes, will be excluded from the expanded keys, with the toggle action.
  for (const aKey of newKeys) {
    if (tree.getItem(aKey) == null) {
      newKeys.delete(aKey);
    }
  }

  // If we are toggling it open, expand all expandable single-child items
  if (newKeys.has(key)) {
    for (const aKey of getSingleChildrenKeys(tree.getItem(key))) {
      newKeys.add(aKey);
    }
  }
  return newKeys;
}

function toggleKey(set: Set<Key>, key: Key): Set<Key> {
  let res = new Set(set);
  if (res.has(key)) {
    res.delete(key);
  } else {
    res.add(key);
  }

  return res;
}
