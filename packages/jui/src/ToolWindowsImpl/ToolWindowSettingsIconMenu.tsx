import React from "react";
import { DividerItem } from "@intellij-platform/core/Collections";
import { useToolWindowState } from "@intellij-platform/core/ToolWindows";
import {
  useAction,
  useActionGroup,
} from "@intellij-platform/core/ActionSystem";
import {
  ActionItem,
  ActionsMenu,
} from "@intellij-platform/core/ActionSystem/components";
import {
  MOVE_TO_ACTION_GROUP_ID,
  TOOL_WINDOW_RESIZE_ACTION_GROUP_ID,
  VIEW_MODE_ACTION_GROUP_ID,
  ViewModeToActionId,
} from "./useToolWindowActions";
import {
  MAXIMIZE_TOOL_WINDOW_ACTION_ID,
  REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID,
} from "./ToolWindowActionIds";

/**
 * Tool window gear icon menu, with a set of default actions and some extra ones.
 * TODO: add support for extra actions when action system is progressed a little.
 */
export function ToolWindowSettingsIconMenu({
  menuProps,
}: {
  menuProps: React.HTMLAttributes<HTMLElement>;
}) {
  const { state } = useToolWindowState();

  const viewModeActionGroup = useActionGroup(VIEW_MODE_ACTION_GROUP_ID);
  const moveToActionGroup = useActionGroup(MOVE_TO_ACTION_GROUP_ID);
  const resizeActions = useActionGroup(TOOL_WINDOW_RESIZE_ACTION_GROUP_ID);
  const maximizeAction = useAction(MAXIMIZE_TOOL_WINDOW_ACTION_ID);
  const removeFromSideBarAction = useAction(
    REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID
  );
  if (
    !viewModeActionGroup ||
    !moveToActionGroup ||
    !resizeActions ||
    !maximizeAction ||
    !removeFromSideBarAction
  ) {
    throw new Error(
      "[ToolWindowSettingsIconMenu]: can't find tool window actions."
    );
  }

  const gearIconActions: Array<ActionItem> = [
    viewModeActionGroup,
    moveToActionGroup,
    {
      id: "resize",
      title: "Resize",
      presentation: "popup",
      children: [...resizeActions.children, maximizeAction],
    },
    new DividerItem(),
    removeFromSideBarAction,
  ];
  return (
    <ActionsMenu
      actions={gearIconActions}
      menuProps={menuProps}
      selectedKeys={[ViewModeToActionId[state.viewMode]]}
    />
  );
}
