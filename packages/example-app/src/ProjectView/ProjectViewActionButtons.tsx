import { ActionButton, PlatformIcon } from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import { currentProjectFilesState } from "../Project/project.state";
import {
  expandedKeysState,
  expandToPathCallback,
  selectKeyAndFocusCallback,
} from "./ProjectView.state";

export const ProjectViewActionButtons = (): React.ReactElement => {
  const setExpandedKeys = useSetRecoilState(expandedKeysState);
  const { items } = useRecoilValue(currentProjectFilesState);
  const activeTab = useRecoilValue(activeEditorTabState);

  const expandToOpenedFile = useRecoilCallback(expandToPathCallback, []);
  const selectKeyAndFocus = useRecoilCallback(selectKeyAndFocusCallback, []);
  const selectOpenedFile = () => {
    if (activeTab) {
      expandToOpenedFile(activeTab.filePath);
      selectKeyAndFocus(activeTab.filePath);
    }
  };

  const collapseAll = () => setExpandedKeys(new Set()); // in Intellij, it also changes selection some times.
  const expandAll = () => {
    const allDirPaths = [""].concat(
      items.filter((item) => item.type === "dir").map(({ path }) => path)
    );
    if (allDirPaths.length > 100) {
      console.log(
        "virtual scrolling is not yet implemented for tree view. Only first 100 items are expanded."
      );
    }
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
