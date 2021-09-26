/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
//@ts-nocheck

/**
 * IMPORTANT: this is coppied from react spectrum, temporarily until,
 * https://github.com/adobe/react-spectrum/issues/1525 is fixed. Any version above 3.1.3 should be
 * sufficient to remove this copy and use the one from @react-stately/tree
 */

import {
  Collection,
  CollectionBase,
  Expandable,
  MultipleSelection,
  Node,
} from "@react-types/shared";
import { Key, useEffect, useMemo } from "react";
import {
  SelectionManager,
  useMultipleSelectionState,
} from "@react-stately/selection";
import { useCollection } from "@react-stately/collections";
import { useControlledState } from "@react-stately/utils";

export class TreeCollection<T> implements Collection<Node<T>> {
  private keyMap: Map<Key, Node<T>> = new Map();
  private iterable: Iterable<Node<T>>;
  private firstKey: Key;
  private lastKey: Key;

  constructor(
    nodes: Iterable<Node<T>>,
    { expandedKeys }: { expandedKeys?: Set<Key> } = {}
  ) {
    this.iterable = nodes;
    expandedKeys = expandedKeys || new Set();

    let visit = (node: Node<T>) => {
      this.keyMap.set(node.key, node);

      if (
        node.childNodes &&
        (node.type === "section" || expandedKeys.has(node.key))
      ) {
        for (let child of node.childNodes) {
          visit(child);
        }
      }
    };

    for (let node of nodes) {
      visit(node);
    }

    let last: Node<T>;
    let index = 0;
    for (let [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = undefined;
      }

      if (node.type === "item") {
        node.index = index++;
      }

      last = node;

      // Set nextKey as undefined since this might be the last node
      // If it isn't the last node, last.nextKey will properly set at start of new loop
      last.nextKey = undefined;
    }

    this.lastKey = last?.key;
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  get size() {
    return this.keyMap.size;
  }

  getKeys() {
    return this.keyMap.keys();
  }

  getKeyBefore(key: Key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey : null;
  }

  getKeyAfter(key: Key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey : null;
  }

  getFirstKey() {
    return this.firstKey;
  }

  getLastKey() {
    return this.lastKey;
  }

  getItem(key: Key) {
    return this.keyMap.get(key);
  }
}

export interface TreeProps<T>
  extends CollectionBase<T>,
    Expandable,
    MultipleSelection {}
export interface TreeState<T> {
  /** A collection of items in the tree. */
  readonly collection: Collection<Node<T>>;

  /** A set of keys for items that are disabled. */
  readonly disabledKeys: Set<Key>;

  /** A set of keys for items that are expanded. */
  readonly expandedKeys: Set<Key>;

  /** Toggles the expanded state for an item by its key. */
  toggleKey(key: Key): void;

  /** A selection manager to read and update multiple selection state. */
  readonly selectionManager: SelectionManager;
}

/**
 * Provides state management for tree-like components. Handles building a collection
 * of items from props, item expanded state, and manages multiple selection state.
 */
export function useTreeState<T extends object>(
  props: TreeProps<T>
): TreeState<T> {
  let [expandedKeys, setExpandedKeys] = useControlledState(
    props.expandedKeys ? props.expandedKeys : undefined,
    props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : new Set(),
    props.onExpandedChange
  );

  let selectionState = useMultipleSelectionState(props);
  let disabledKeys = useMemo(
    () => (props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>()),
    [props.disabledKeys]
  );

  let tree = useCollection(
    props,
    (nodes) => new TreeCollection(nodes, { expandedKeys }),
    null,
    [expandedKeys]
  );

  // Reset focused key if that item is deleted from the collection.
  useEffect(() => {
    if (
      selectionState.focusedKey != null &&
      !tree.getItem(selectionState.focusedKey)
    ) {
      selectionState.setFocusedKey(null);
    }
  }, [tree, selectionState.focusedKey]);

  let onToggle = (key: Key) => {
    setExpandedKeys((expandedKeys) => toggleKey(expandedKeys, key));
  };

  return {
    collection: tree,
    expandedKeys,
    disabledKeys,
    toggleKey: onToggle,
    selectionManager: new SelectionManager(tree, selectionState),
  };
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
