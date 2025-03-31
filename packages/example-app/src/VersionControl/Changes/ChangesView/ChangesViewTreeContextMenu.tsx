import { useAtomValue } from "jotai";
import { selectedKeysAtom } from "./ChangesView.state";
import {
  ActionsMenu,
  CommonActionId,
  DividerItem,
  useAction,
} from "@intellij-platform/core";
import React from "react";
import { VcsActionIds } from "../../VcsActionIds";

export const ChangesViewTreeContextMenu = () => {
  const selectedKeys = useAtomValue(selectedKeysAtom);
  if ([...selectedKeys].length === 0) {
    return null;
  }
  return (
    <ActionsMenu
      aria-label="Changes actions"
      actions={[
        useAction(VcsActionIds.CHECKIN_FILES),
        useAction(VcsActionIds.ROLLBACK),
        useAction(VcsActionIds.JUMP_TO_SOURCE),
        new DividerItem(),
        useAction(VcsActionIds.SHELVE),
        new DividerItem(),
        useAction(VcsActionIds.NEW_CHANGELIST),
        useAction(VcsActionIds.RENAME_CHANGELIST),
        useAction(VcsActionIds.REMOVE_CHANGELIST),
        useAction(VcsActionIds.SET_DEFAULT_CHANGELIST),
        useAction(VcsActionIds.MOVE_TO_ANOTHER_CHANGELIST),
        new DividerItem(),
        useAction(CommonActionId.REFRESH),
      ].filter((i) => i != null)}
    />
  );
};
