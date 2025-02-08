import {
  Collection,
  CollectionStateBase,
  Expandable,
  MultipleSelection,
  Node,
} from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import {
  TreeRefValue,
  useTreeRef,
} from "@intellij-platform/core/Tree/useTreeRef";
import { ForwardedRef, Key, useCallback, useEffect, useMemo } from "react";
import { useMultipleSelectionState } from "@react-stately/selection";
import { useCollection } from "@react-stately/collections";
import { useControlledState } from "@react-stately/utils";
import {
  CollectionCacheInvalidationProps,
  useCollectionCacheInvalidation,
} from "@intellij-platform/core/Collections/useCollectionCacheInvalidation";
import { TreeCollection as _TreeCollection } from "./__copied__TreeCollection";
import { getSingleChildrenKeys } from "./getSingleChildrenKeys";
import { TreeSelectionManager } from "@intellij-platform/core/Tree/TreeSelectionManager";

export class TreeCollection<T> extends _TreeCollection<T> {
  public readonly rootKeys: Key[];
  constructor(
    nodes: Iterable<Node<T>>,
    { expandedKeys }: { expandedKeys: Set<Key> }
  ) {
    super(nodes, { expandedKeys });
    this.rootKeys = Array.from(nodes).map(({ key }) => key);
  }

  getAllExpandableKeys(): Set<Key> {
    const rootNodes = this.rootKeys
      .map((key) => this.getItem(key))
      .filter((i) => i != null);
    return this.recursivelyAddExpandableKeys(rootNodes, new Set<Key>());
  }

  private recursivelyAddExpandableKeys(
    nodes: Iterable<Node<T>>,
    result: Set<Key>
  ) {
    for (const node of nodes) {
      if (node?.hasChildNodes) {
        result.add(node.key);
        this.recursivelyAddExpandableKeys(node.childNodes, result);
      }
    }
    return result;
  }
}
export interface TreeProps<T>
  extends CollectionStateBase<T, TreeCollection<T>>,
    Expandable,
    MultipleSelection,
    CollectionCacheInvalidationProps {
  childExpansionBehaviour?: "multi" | "single";
}
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
 * - returned `collection` is of type `TreeCollection` (which is an improved version of react-stately `TreeCollection`),
 *   instead of the more generic `Collection`.
 */
export function useTreeState<T extends object>(
  { childExpansionBehaviour = "multi", ...props }: TreeProps<T>,
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

  let tree = useCollection<T, TreeCollection<T>>(
    props,
    useCallback(
      (nodes) => new TreeCollection(nodes, { expandedKeys }),
      [expandedKeys]
    ),
    context
  );

  const selectionManager = new TreeSelectionManager(
    tree as Collection<Node<T>>,
    selectionState
  );

  useTreeRef({ selectionManager, setExpandedKeys, tree }, treeRef);

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

  const toggleKey = (key: Key) => {
    let newExpandedKeys = toggleTreeNode(
      tree as Collection<Node<T>>,
      expandedKeys,
      key
    );
    if (childExpansionBehaviour === "single") {
      const expandedSiblings = getSiblings(tree, key).filter(
        (aKey) => aKey !== key && expandedKeys.has(aKey)
      );
      newExpandedKeys = expandedSiblings.reduce((expandedKeys, expandedKey) => {
        return toggleTreeNode(
          tree as Collection<Node<T>>,
          expandedKeys,
          expandedKey
        );
      }, newExpandedKeys);
    }
    setExpandedKeys(newExpandedKeys);
  };

  return {
    collection: tree as Collection<Node<T>>,
    expandedKeys,
    disabledKeys,
    toggleKey,
    selectionManager,
    setExpandedKeys,
  };
}

function getChildItems<T>(node: Node<T>): Node<T>[] {
  const childNodes = [...(node.childNodes || [])];
  const childItems = childNodes.filter(({ type }) => type === "item");
  const sectionItems = childNodes.filter(({ type }) => type === "section");

  return childItems.concat(sectionItems.flatMap(getChildItems));
}

function getRootItemKeys(tree: TreeCollection<unknown>) {
  return tree.rootKeys
    .map((key) => tree.getItem(key))
    .filter((i) => i != null)
    .flatMap(getChildItems)
    .map(({ key }) => key);
}
/**
 * Returns the siblings of an item in tree, ignoring sections.
 * Disclaimer: The code is done quick and dirty and in a rush. Unpleasant code, good candidate for refactoring :D
 */
function getSiblings(tree: TreeCollection<unknown>, key: Key): Key[] {
  const parentKey = tree.getItem(key)?.parentKey;
  if (!parentKey) {
    return [...tree.rootKeys].concat(getRootItemKeys(tree));
  }
  let parent = parentKey ? tree.getItem(parentKey) : null;
  if (parent?.type === "item") {
    return getChildItems(parent).map(({ key }) => key);
  }
  const siblings: Key[] = [];
  while (parent) {
    siblings.push(...getChildItems(parent).map(({ key }) => key));
    if (parent.type === "section") {
      if (parent.parentKey) {
        parent = tree.getItem(parent.parentKey);
      } else {
        siblings.push(...getRootItemKeys(tree));
        parent = null;
      }
    } else {
      parent = null;
    }
  }
  return Array.from(new Set(siblings));
}
function toggleTreeNode(
  tree: Collection<Node<unknown>>,
  expandedKeys: Set<Key>,
  key: Key
): Set<Key> {
  // toggling a non-expandable node should be no-op
  if (!expandedKeys.has(key) && !tree.getItem(key)?.hasChildNodes) {
    return expandedKeys;
  }
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
