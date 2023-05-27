import { useRecoilValue } from "recoil";
import { selectedKeysState } from "./ChangesView.state";
import { DividerItem, useAction } from "@intellij-platform/core";
import React from "react";
import { VcsActionIds } from "../../VcsActionIds";
import { ActionsMenu } from "@intellij-platform/core/ActionSystem/components";
import { notNull } from "@intellij-platform/core/utils/array-utils";

export const ChangesViewTreeContextMenu = () => {
  const selectedKeys = useRecoilValue(selectedKeysState);
  if ([...selectedKeys].length === 0) {
    return null;
  }
  return (
    <ActionsMenu
      aria-label="Context menu"
      actions={[
        useAction(VcsActionIds.CHECK_IN),
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
        useAction(VcsActionIds.REFRESH),
      ].filter(notNull)}
    />
  );
};
