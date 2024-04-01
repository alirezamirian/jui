import React from "react";
import { useRecoilValue } from "recoil";
import { HighlightedTextValue, ItemLayout } from "@intellij-platform/core";

import {
  createChangesTreeNodeRenderer,
  formatFileCount,
  NodeRenderer,
} from "../ChangesTree/changesTreeNodeRenderers";
import { repoStatusUpdatingState } from "../../file-status.state";
import { Delayed } from "../../../Delayed";
import { ChangeListNode, ChangesViewTreeNode } from "./ChangesView.state";

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
        {formatFileCount(fileCount)}
        {<LoadingText />}
        {/*in IntelliJ it's not shown if it's empty, but why not!*/}
      </ItemLayout.Hint>
    </ItemLayout>
  ),
});

function LoadingText() {
  const loading = useRecoilValue(repoStatusUpdatingState);
  return <>{loading && <Delayed>, updating...</Delayed>}</>;
}

export const changesViewTreeNodeRenderer =
  createChangesTreeNodeRenderer<ChangesViewTreeNode>({
    changelist: changeListNodeRenderer,
  });
