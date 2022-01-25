import { Key } from "react";

type TreeFn<T> = (root: T | null) => null | readonly T[];

export const getExpandAllKeys = <T>(
  /**
   * represents a tree as a function. Given a node, it should return the array of children or null, if the node is a
   * leaf. Note that even an empty array will make the node to be considered a non-leaf node and the key is included.
   * if null is passed, the root(s) node(s) should be returned.
   */
  getChildren: TreeFn<T>,
  /**
   * a function that converts each node into a key
   */
  getKey: (t: T) => Key
) => {
  const roots = getChildren(null) || [];
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

export const dfsVisit = <T, R>(
  getChildren: TreeFn<T>,
  visit: (node: T, childrenValues: null | R[]) => R
) => {
  const nodes = getChildren(null) || [];
  const dfs = (node: T): R => {
    const children = getChildren(node);
    const values = children?.map(dfs) ?? null;
    return visit(node, values);
  };
  nodes.forEach(dfs);
};
