import { Key } from "react";

type TreeNodeFn<T> = (root: T) => null | readonly T[];

export const getExpandAllKeys = <T>(
  /**
   * represents a tree as a function. Given a node, it should return the array of children or null, if the node is a
   * leaf. Note that even an empty array will make the node to be considered a non-leaf node and the key is included.
   * if null is passed, the root(s) node(s) should be returned.
   */
  getChildren: TreeNodeFn<T>,
  /**
   * a function that converts each node into a key
   */
  getKey: (t: T) => Key,
  roots: T[]
) => {
  const keys: Key[] = roots.map(getKey);
  const processItem = (node: T | null) => {
    const children = node ? getChildren(node) : null;
    if (node == null || !children) {
      return;
    }
    keys.push(getKey(node));
    children.forEach(processItem);
  };
  roots.map(getChildren).flat().forEach(processItem);
  return keys;
};

export const getExpandedToNodesKeys = <T>(
  /**
   * represents a tree as a function. Given a node, it should return the array of children or null, if the node is a
   * leaf. Note that even an empty array will make the node to be considered a non-leaf node and the key is included.
   * if null is passed, the root(s) node(s) should be returned.
   */
  getChildren: TreeNodeFn<T>,
  /**
   * a function that converts each node into a key
   */
  getKey: (t: T) => Key,
  roots: ReadonlyArray<T>,
  targetNodeKeys: Iterable<Key>
) => {
  const targetNodeKeySet = new Set(targetNodeKeys);
  const expandedKeys: Key[] = [];
  dfsVisit<T, boolean>(
    getChildren,
    (node, childValues) => {
      const key = getKey(node);
      const isExpanded: boolean =
        childValues?.some((childValue) => childValue) ||
        targetNodeKeySet.has(key);
      if (isExpanded) {
        expandedKeys.push(key);
      }
      return isExpanded;
    },
    roots
  );
  return expandedKeys;
};

export const dfsVisit = <T, R>(
  getChildren: TreeNodeFn<T>,
  visit: (node: T, childrenValues: null | R[]) => R,
  roots: ReadonlyArray<T>
) => {
  const dfs = (node: T): R => {
    const children = getChildren(node);
    const values = children?.map(dfs) ?? null;
    return visit(node, values);
  };
  roots.forEach(dfs);
};

export const bfsVisit = <T, R>(
  getChildren: TreeNodeFn<T>,
  visit: (node: T, parentValue: R | null) => R,
  roots: ReadonlyArray<T>
) => {
  const bfs: typeof visit = (node, parentValue) => {
    const result = visit(node, parentValue);
    const children = getChildren(node);
    children?.map((childNode) => bfs(childNode, result));
    return result;
  };
  return roots.map((root) => bfs(root, null));
};
