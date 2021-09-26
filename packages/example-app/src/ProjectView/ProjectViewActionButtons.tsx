import { ActionButton, PlatformIcon } from "jui";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import { currentProjectFilesState } from "../Project/project.state";
import { expandedKeysState, selectedKeysState } from "./ProjectView.state";

export const ProjectViewActionButtons = (): React.ReactElement => {
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const setSelectedKeys = useSetRecoilState(selectedKeysState);
  const { items } = useRecoilValue(currentProjectFilesState);
  const activeTab = useRecoilValue(activeEditorTabState);
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
    setExpandedKeys(new Set(allDirPaths.slice(0, 100)));
  };
  const selectOpenedFile = () => {
    if (activeTab) {
      const keysToExpand = [""].concat(
        activeTab.filePath
          .split("/")
          .map((part, index, parts) => parts.slice(0, index + 1).join("/"))
      );
      setExpandedKeys(new Set([...expandedKeys, ...keysToExpand]));
      setSelectedKeys(new Set([activeTab.filePath]));
      // TODO: move focus to the project view tool window. Imperatively moving focus to some tool window is not
      //  currently supported, but it can be a feature exposed by ToolWindows :-?
      // TODO: selected file is not scrolled into view.
    }
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
