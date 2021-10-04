import { ActionButton, PlatformIcon } from "jui";
import React, { Key } from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import { currentProjectFilesState } from "../Project/project.state";
import {
  expandedKeysState,
  projectViewTreeRefState,
} from "./ProjectView.state";

export const ProjectViewActionButtons = (): React.ReactElement => {
  const setExpandedKeys = useSetRecoilState(expandedKeysState);
  const { items } = useRecoilValue(currentProjectFilesState);
  const activeTab = useRecoilValue(activeEditorTabState);

  const expandToKey = useRecoilCallback(({ snapshot }) => (key: Key) => {
    const expandedKeys = snapshot.getLoadable(expandedKeysState).valueOrThrow();
    const keysToExpand = [""].concat(
      `${key}`
        .split("/")
        .map((part, index, parts) => parts.slice(0, index + 1).join("/"))
    );
    setExpandedKeys(new Set([...expandedKeys, ...keysToExpand]));
  });

  const selectKeyAndFocus = useRecoilCallback(
    ({ snapshot }) => (key: Key) => {
      const treeRef = snapshot
        .getLoadable(projectViewTreeRefState)
        .valueOrThrow()?.current;
      treeRef?.replaceSelection(key);
      treeRef?.focus(key);
    },
    []
  );
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
      expandToKey(activeTab.filePath);
      selectKeyAndFocus(activeTab.filePath);
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
