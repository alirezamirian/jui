import React from "react";
import { DividerItem } from "@intellij-platform/core/Collections";
import {
  REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID,
  useToolWindowState,
} from "@intellij-platform/core/ToolWindow";
import {
  Action,
  useAction,
  useActionGroup,
} from "@intellij-platform/core/ActionSystem";
import {
  ActionItem,
  ActionsMenu,
} from "@intellij-platform/core/ActionSystem/components/ActionsMenu";
import {
  MOVE_TO_ACTION_GROUP,
  VIEW_MODE_ACTION_IDS,
  ViewModeToActionId,
} from "./useToolWindowActions";

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

  const viewModeActions: Action[] = useActionGroup(VIEW_MODE_ACTION_IDS);
  const moveToActions: Action[] = useActionGroup(MOVE_TO_ACTION_GROUP);

  const resizeActions: Action[] = useActionGroup([
    "ResizeToolWindowLeft",
    "ResizeToolWindowRight",
    "ResizeToolWindowTop",
    "ResizeToolWindowBottom",
    "MaximizeToolWindow",
  ]);
  const removeFromSideBarAction = useAction(
    REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID
  )!;
  const gearIconActions: Array<ActionItem> = [
    {
      id: "viewMode",
      title: "View Mode",
      actions: viewModeActions,
    },
    {
      id: "moveTo",
      title: "Move to",
      actions: moveToActions,
    },
    { id: "resize", title: "Resize", actions: resizeActions },
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
