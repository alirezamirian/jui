import React from "react";
import { Node } from "@react-types/shared";
import { TreeNode } from "../TreeNode";
import { SpeedSearchItemHighlightsProvider } from "@intellij-platform/core/CollectionSpeedSearch";

export const SpeedSearchTreeNode = <T extends object>({
  item,
}: {
  item: Node<T>;
}) => {
  return (
    <SpeedSearchItemHighlightsProvider itemKey={item.key}>
      <TreeNode key={item.key} item={item} />
    </SpeedSearchItemHighlightsProvider>
  );
};
