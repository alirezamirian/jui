import { Key } from "react";
import { dfsVisit } from "@intellij-platform/core/utils/tree-utils";

import { ChangesTreeNode, getChildren } from "./ChangeTreeNode";

export function changesTreeNodesResult<
  T extends ReadonlyArray<ChangesTreeNode<any>>
>(
  rootNodes: T
): {
  rootNodes: ReadonlyArray<T[number]>;
  byKey: Map<Key, T[number]>;
  expandAllKeys: Set<Key>;
  fileCountsMap: Map<Key, number>;
} {
  const fileCountsMap = new Map();
  const byKey = new Map();
  const expandAllKeys = new Set<Key>();

  dfsVisit<ChangesTreeNode<any>, number>(
    getChildren,
    (node, childrenFileCount) => {
      byKey.set(node.key, node);
      if ("children" in node) {
        expandAllKeys.add(node.key);
      }
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
  return { rootNodes, fileCountsMap, byKey, expandAllKeys };
}
