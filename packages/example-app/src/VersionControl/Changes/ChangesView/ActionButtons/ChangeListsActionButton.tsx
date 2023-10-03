import React from "react";
import {
  IconButtonWithMenu,
  PlatformIcon,
  useAction,
} from "@intellij-platform/core";
import { VcsActionIds } from "../../../VcsActionIds";
import { ActionsMenu } from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";

export const ChangeListsActionButton = (): React.ReactElement => {
  const actions = [
    useAction(VcsActionIds.NEW_CHANGELIST),
    useAction(VcsActionIds.RENAME_CHANGELIST),
    useAction(VcsActionIds.REMOVE_CHANGELIST),
    useAction(VcsActionIds.SET_DEFAULT_CHANGELIST),
    useAction(VcsActionIds.MOVE_TO_ANOTHER_CHANGELIST),
  ].filter(notNull);

  return (
    <IconButtonWithMenu
      renderMenu={({ menuProps }) => (
        <ActionsMenu menuProps={menuProps} actions={actions} />
      )}
    >
      <PlatformIcon icon="vcs/changelist.svg" />
    </IconButtonWithMenu>
  );
};
