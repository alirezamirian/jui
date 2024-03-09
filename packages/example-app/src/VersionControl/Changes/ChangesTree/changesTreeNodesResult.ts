import { Key } from "react";
import { dfsVisit } from "@intellij-platform/core/utils/tree-utils";

import { ChangesTreeNode, getChildren } from "./ChangeTreeNode";

export function changesTreeNodesResult<T extends ChangesTreeNode<any>>(
  rootNodes: ReadonlyArray<T>
): {
  rootNodes: ReadonlyArray<T>;
  byKey: Map<Key, T>;
  fileCountsMap: Map<Key, number>;
} {
  const fileCountsMap = new Map();
  const byKey = new Map();

  dfsVisit<ChangesTreeNode<any>, number>(
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
}
