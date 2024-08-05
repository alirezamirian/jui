import {
  MultipleSelectionState,
  SelectionManager,
  SelectionManagerOptions,
} from "@react-stately/selection";
import { Collection, Node } from "@react-types/shared";
import React, { Key } from "react";

export class TreeSelectionManager extends SelectionManager {
  private readonly collection: Collection<Node<unknown>>;

  constructor(
    collection: Collection<Node<unknown>>,
    state: MultipleSelectionState,
    options?: SelectionManagerOptions
  ) {
    super(collection, state, options);
    this.collection = collection;
  }

  expandSelection() {
    if (this.focusedKey) {
      const node = this.collection.getItem(this.focusedKey);
      if (node) {
        const { expandKeys } = this.getExpandAndShrinkKeys(node);
        if (expandKeys.length > 0) {
          this.setSelectedKeys([...this.selectedKeys, ...expandKeys]);
        }
      }
    }
  }
  shrinkSelection() {
    if (this.focusedKey) {
      const node = this.collection.getItem(this.focusedKey);
      if (node) {
        const { shrinkKeys } = this.getExpandAndShrinkKeys(node);
        if (shrinkKeys.length > 0) {
          this.setSelectedKeys(
            [...this.selectedKeys].filter((key) => !shrinkKeys.includes(key))
          );
        }
      }
    }
  }

  private getExpandAndShrinkKeys(node: Node<unknown>) {
    return this.recursivelyGetExpandAndShrinkKeys(
      node,
      [...this.collection.getKeys()],
      null
    );
  }
  /**
   * Starting from a node, traverses the tree up, until it reaches the root of the fully selected subtree that includes
   * the starting node. The root itself may or may not be selected. Returns:
   * - keys to be added to selection, when expanding selection
   * - keys to be removed from selection, when shrinking selection
   */
  private recursivelyGetExpandAndShrinkKeys(
    node: Node<unknown>,
    keys: Array<Key>,
    previousChild: Key | null
  ): { expandKeys: Key[]; shrinkKeys: Key[] } {
    const parent =
      node && node.parentKey ? this.collection.getItem(node.parentKey) : null;
    const newKeys = keys.filter((key) => key !== previousChild);
    const parentDescendants = parent
      ? getAllDescendants(parent, newKeys).map(({ key }) => key)
      : this.getAllRoots().flatMap((key) => {
          const item = this.collection.getItem(key);
          return key !== node.key && item
            ? getAllDescendants(item, newKeys)
                .map(({ key }) => key)
                .concat(key)
            : [];
        });
    if (parent && parentDescendants.every((key) => this.isSelected(key))) {
      return this.recursivelyGetExpandAndShrinkKeys(parent, keys, node.key);
    }
    const descendants = getAllDescendants(
      node,
      keys.filter((key) => key !== previousChild)
    ).map(({ key }) => key);

    return {
      expandKeys: descendants.some((key) => !this.isSelected(key))
        ? descendants
        : !this.isSelected(node.key)
        ? [node.key]
        : parentDescendants,
      shrinkKeys:
        parentDescendants.length > 0 &&
        parentDescendants.every((key) => this.isSelected(key))
          ? parentDescendants
          : this.isSelected(node.key) && previousChild
          ? [node.key]
          : descendants.filter((key) => this.isSelected(key)),
    };
  }

  private getAllRoots() {
    return [...this.collection.getKeys()].filter(
      (key) => this.collection.getItem(key)?.parentKey == null
    );
  }
}

function getAllDescendants<T>(
  node: Node<T>,
  stopKeys: Array<React.Key>
): Node<T>[] {
  const childNodes = (node.hasChildNodes ? [...node.childNodes] : []).filter(
    (node) => stopKeys.includes(node.key)
  );
  return node.hasChildNodes
    ? childNodes.concat(
        childNodes.map((node) => getAllDescendants(node, stopKeys)).flat()
      )
    : [];
}
