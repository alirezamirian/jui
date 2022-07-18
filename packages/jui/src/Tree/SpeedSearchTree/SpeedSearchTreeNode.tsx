import React from "react";
import { Node } from "@react-types/shared";
import { TreeNode } from "../TreeNode";
import { SpeedSearchItemHighlightsProvider } from "@intellij-platform/core/CollectionSpeedSearch";

export const SpeedSearchTreeNode = <T extends object>({
  item,
  alwaysShowAsFocused,
}: {
  item: Node<T>;
  alwaysShowAsFocused?: boolean;
}) => (
  <SpeedSearchItemHighlightsProvider itemKey={item.key}>
    <TreeNode
      key={item.key}
      item={item}
      alwaysShowAsFocused={alwaysShowAsFocused}
    />
  </SpeedSearchItemHighlightsProvider>
);
