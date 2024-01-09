import { useRecoilState, useRecoilValue } from "recoil";
import React from "react";
import { SpeedSearchTree } from "@intellij-platform/core";

import { branchTreeNodeRenderers } from "./branchTreeNodeRenderers";
import {
  branchesTreeNodeState,
  branchesTreeRefState,
  expandedKeysState,
  selectedKeysState,
} from "./BranchesTree.state";

export function BranchesTree() {
  const branchesTreeNodes = useRecoilValue(branchesTreeNodeState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const treeRef = useRecoilValue(branchesTreeRefState);
  // FIXME: selectedKeys and expandedKeys can become invalid due to changes in nodes, which makes the tree view
  //  not react to the key events. Ideally, the tree view should be robust regarding invalid keys, and otherwise
  //  the keys should be validated everytime nodes change.
  return (
    <SpeedSearchTree
      ref={treeRef}
      items={branchesTreeNodes}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
    >
      {(node) => {
        // @ts-expect-error we need to somehow infer the type of `node.type`
        return branchTreeNodeRenderers[node.type](node);
      }}
    </SpeedSearchTree>
  );
}
