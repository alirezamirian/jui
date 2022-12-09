import { Key } from "react";

interface SetState<T> {
  items: Iterable<T>;

  toggle(key: T): void;

  add(...key: T[]): void;

  delete(...key: T[]): void;
}

export type SelectionState = "NotSelected" | "Selected" | "PartiallySelected";

export interface TreeModel<T, K = Key> {
  rootNodes: ReadonlyArray<T>;
  getChildren: (root: T) => ReadonlyArray<T> | /*for convenience*/ T | null;
  getKey: (item: T) => K;
}

export interface NestedSelectionState<T> {
  getSelectionState: (item: T) => SelectionState;
  toggle: (item: T) => void;
}

const collectSelectableItems = <T>(
  item: T,
  getChildren: (item: T) => null | ReadonlyArray<T>
) => {
  const collectedItems: T[] = [];
  collectSelectableItemsRecursive(item, getChildren, collectedItems);
  return collectedItems;
};
const collectSelectableItemsRecursive = <T>(
  item: T,
  getChildren: (item: T) => null | ReadonlyArray<T>,
  collectedItems: T[] = []
) => {
  const children = getChildren(item);
  if (children == null) {
    collectedItems.push(item);
  } else {
    children.forEach((child) =>
      collectSelectableItemsRecursive(child, getChildren, collectedItems)
    );
  }
};

// TODO: maybe change the interface to work with keys instead of items?
export class NestedSelection<T extends object, K = Key>
  implements NestedSelectionState<T>
{
  cache = new WeakMap<T, SelectionState>();
  constructor(private state: SetState<K>, private tree: TreeModel<T, K>) {
    this.tree = tree;
    this.state = state;
  }

  toggle(item: T) {
    const children = this.tree.getChildren(item);
    const key = this.tree.getKey(item);
    const isSelectableNode = children == null;
    if (isSelectableNode) {
      this.state.toggle(key);
    } else {
      const state = this.getSelectionState(item);
      const itemsInSubtree = collectSelectableItems(item, (item) =>
        normalizeChildren(this.tree.getChildren(item))
      ).map(this.tree.getKey);
      if (state === "Selected") {
        this.state.delete(...itemsInSubtree);
      } else {
        this.state.add(...itemsInSubtree);
      }
    }
  }

  getSelectionState(item: T): SelectionState {
    // caching can be refactored into a nice little decorator like WeakMapCached which would be applicable on a method
    // with a single object argument.
    const cachedState = this.cache.get(item);
    if (cachedState) {
      return cachedState;
    }
    const children = normalizeChildren(this.tree.getChildren(item));
    const key = this.tree.getKey(item);
    const isSelectableNode = children == null;
    let state: SelectionState;
    if (isSelectableNode) {
      state = [...this.state.items].includes(key) ? "Selected" : "NotSelected";
    } else {
      const allDescendantsStates = children.map((child) =>
        this.getSelectionState(child)
      );
      if (allDescendantsStates.every((state) => state === "NotSelected")) {
        state = "NotSelected";
      } else {
        state = allDescendantsStates.every((state) => state === "Selected")
          ? "Selected"
          : "PartiallySelected";
      }
    }
    this.cache.set(item, state);
    return state;
  }
}

function normalizeChildren<T>(children: T | ReadonlyArray<T> | null) {
  if (children) {
    return ([] as ReadonlyArray<T>).concat(children);
  }
  return null;
}
