import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changesUnderSelectedKeys,
  getNodeKeyForChange,
  selectedChangesState,
  selectedKeysState,
} from "./ChangesView.state";
import {
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  useBalloons,
} from "@intellij-platform/core";
import React from "react";

import { useChangeViewContext } from "./ChangesViewSplitter";
import { useChangeListManager } from "../change-lists.state";
import { useEditorStateManager } from "../../../Editor/editor.state";

export const ChangesViewTreeContextMenu = () => {
  const selectedChanges = useRecoilValue(changesUnderSelectedKeys);
  const setSelectedChanges = useSetRecoilState(selectedChangesState);
  const selectedKeys = useRecoilValue(selectedKeysState);
  const disabledKeys = ["moveToChangelist"];
  const { focusCommitMessage } = useChangeViewContext();
  const editorStateManager = useEditorStateManager();
  const { rollback } = useChangeListManager();
  const { show } = useBalloons();
  if (selectedChanges.length === 0) {
    disabledKeys.push("commit");
  }

  if ([...selectedKeys].length === 0) {
    return null;
  }
  return (
    <Menu
      disabledKeys={disabledKeys}
      aria-label="Context menu"
      onAction={(key) => {
        switch (key) {
          case "commit":
            setSelectedChanges(
              new Set(selectedChanges.map(getNodeKeyForChange))
            );
            focusCommitMessage();
            break;
          case "rollback":
            rollback(selectedChanges).catch((e) => {
              show({
                title: "Reverting changes failed",
                icon: "Error",
                body:
                  "Could not revert selected changes. See console for more info",
              });
              console.error("Git revert error:", e);
            });
            break;
          case "jumpToSource":
            selectedChanges.forEach((change, index, arr) => {
              if (!change.after.isDir) {
                editorStateManager.openPath(
                  change.after.path,
                  index === arr.length - 1
                );
              }
            });
            break;
        }
      }}
    >
      <Item key="commit" textValue="Commit">
        Commit file{selectedChanges.length > 1 ? "s" : ""}...
      </Item>
      <Item key="rollback" textValue="Rollback">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/rollback.svg"} />}
          content="Rollback..."
        />
      </Item>
      <Item key="moveToChangelist">Move to another Changelist...</Item>
      <Item key="jumpToSource" textValue="Jump to source">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/editSource.svg"} />}
          content="Jump to source"
        />
      </Item>
    </Menu>
  );
};
