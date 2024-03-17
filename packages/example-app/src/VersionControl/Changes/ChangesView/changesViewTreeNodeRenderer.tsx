import { HighlightedTextValue, ItemLayout } from "@intellij-platform/core";
import React from "react";
import { ChangeListNode, ChangesViewTreeNode } from "./ChangesView.state";
import {
  createChangesTreeNodeRenderer,
  formatFileCount,
  NodeRenderer,
} from "../ChangesTree/changesTreeNodeRenderers";

const changeListNodeRenderer: NodeRenderer<ChangeListNode> = (
  node,
  { fileCount }
) => ({
  textValue: node.changeList.name,
  rendered: (
    <ItemLayout>
      <span style={{ fontWeight: node.changeList.active ? "bold" : undefined }}>
        <HighlightedTextValue />
      </span>
      <ItemLayout.Hint>
        {formatFileCount(fileCount)}{" "}
        {/*in IntelliJ it's not shown if it's empty, but why not!*/}
      </ItemLayout.Hint>
    </ItemLayout>
  ),
});

export const changesViewTreeNodeRenderer =
  createChangesTreeNodeRenderer<ChangesViewTreeNode>({
    changelist: changeListNodeRenderer,
  });
