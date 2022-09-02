import {
  ActionButton,
  ActionTooltip,
  PlatformIcon,
  TooltipTrigger,
} from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import {
  currentProjectTreeState,
  expandedKeysState,
  expandToPathCallback,
  FileTreeDirNode,
  ProjectTreeNode,
  selectKeyAndFocusCallback,
} from "./ProjectView.state";
import { getExpandAllKeys } from "../TreeUtils/tree-utils";

export const ProjectViewActionButtons = (): React.ReactElement => {
  const setExpandedKeys = useSetRecoilState(expandedKeysState);
  const root = useRecoilValue(currentProjectTreeState);
  const activeTab = useRecoilValue(activeEditorTabState);

  const expandToOpenedFile = useRecoilCallback(expandToPathCallback, []);
  const selectKeyAndFocus = useRecoilCallback(selectKeyAndFocusCallback, []);
  const selectOpenedFile = () => {
    if (activeTab) {
      expandToOpenedFile(activeTab.filePath);
      selectKeyAndFocus(activeTab.filePath);
    }
  };

  const collapseAll = () => setExpandedKeys(new Set()); // in Intellij, it also changes selection sometimes.
  const expandAll = () => {
    setExpandedKeys(
      new Set(
        getExpandAllKeys<ProjectTreeNode>(
          (node) =>
            node === null ? [root] : (node as FileTreeDirNode)?.children,
          (node) => node.path
        )
      )
    );
  };
  return (
    <>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Select Opened File" />}
      >
        <ActionButton onPress={selectOpenedFile} isDisabled={!activeTab}>
          <PlatformIcon icon="general/locate" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Expand All" />}>
        <ActionButton onPress={expandAll}>
          <PlatformIcon icon="actions/expandall" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Collapse All" />}>
        <ActionButton onPress={collapseAll}>
          <PlatformIcon icon="actions/collapseall" />
        </ActionButton>
      </TooltipTrigger>
    </>
  );
};
