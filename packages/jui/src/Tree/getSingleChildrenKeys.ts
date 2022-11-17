import { Node } from "@react-types/shared";
import { Key } from "react";

/**
 * given a node, returns keys of all consecutive single children
 */
export function getSingleChildrenKeys<T>(
  node: Node<T> | null | undefined
): Key[] {
  return getSingleChildrenKeysRecursive(node, []);
}

function getSingleChildrenKeysRecursive<T>(
  node: Node<T> | null | undefined,
  previousKeys: Key[]
): Key[] {
  if (!node) {
    return [];
  }
  const childNodesIterator: Iterator<
    Node<T>,
    Node<T> | undefined
  > = node.childNodes[Symbol.iterator]();
  const { value: firstChild, done } = childNodesIterator.next();
  const noMoreChildren = done || childNodesIterator.next().value == null;
  if (firstChild != null && noMoreChildren && isExpandable(firstChild)) {
    return getSingleChildrenKeysRecursive(
      firstChild,
      previousKeys.concat((firstChild as Node<T>).key)
    );
  }
  return previousKeys;
}

const isExpandable = <T>(node: Node<T>) =>
  node.hasChildNodes || !isEmptyIterable(node.childNodes);

function isEmptyIterable(iterable: Iterable<unknown> | undefined | null) {
  for (const _ of iterable || []) {
    // eslint-disable-line no-unused-vars, no-unreachable-loop
    return false;
  }
  return true;
}
