import { ActionButton, PlatformIcon } from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import {
  currentProjectTreeState,
  expandedKeysState,
  expandToPathCallback,
  FileTreeDirNode,
  FileTreeNode,
  selectKeyAndFocusCallback,
} from "./ProjectView.state";

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
    const allDirPaths: string[] = [root.path];
    const processItem = (node: FileTreeNode) => {
      if (node.type === "dir") {
        allDirPaths.push(node.path);
        (node as FileTreeDirNode) /* why doesn't TS realize this?! */.children
          .forEach(processItem);
      }
    };
    root.children.forEach(processItem);
    setExpandedKeys(new Set(allDirPaths));
  };
  return (
    <>
      <ActionButton onPress={selectOpenedFile} isDisabled={!activeTab}>
        <PlatformIcon icon="general/locate" />
      </ActionButton>
      <ActionButton onPress={expandAll}>
        <PlatformIcon icon="actions/expandall" />
      </ActionButton>
      <ActionButton onPress={collapseAll}>
        <PlatformIcon icon="actions/collapseall" />
      </ActionButton>
    </>
  );
};
