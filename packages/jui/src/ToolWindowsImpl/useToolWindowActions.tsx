import React from "react";
import {
  Anchor,
  isHorizontalToolWindow,
  useToolWindowState,
  ViewMode,
} from "@intellij-platform/core/ToolWindows";
import { ActionDefinition } from "@intellij-platform/core/ActionSystem";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import {
  DOCK_PINNED_MODE_ACTION_ID,
  DOCK_TOOL_WINDOW_ACTION_ID,
  DOCK_UNPINNED_MODE_ACTION_ID,
  FLOAT_MODE_ACTION_ID,
  FOCUS_EDITOR_ACTION_ID,
  HIDE_ACTIVE_WINDOW_ACTION_ID,
  MAXIMIZE_TOOL_WINDOW_ACTION_ID,
  REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID,
  RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID,
  RESIZE_TOOL_WINDOW_LEFT_ACTION_ID,
  RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID,
  RESIZE_TOOL_WINDOW_TOP_ACTION_ID,
  UNDOCK_MODE_ACTION_ID,
  WINDOW_MODE_ACTION_ID,
} from "./ToolWindowActionIds";
import { ActionGroupDefinition } from "@intellij-platform/core/ActionSystem";
import { useCreateDefaultActionGroup } from "@intellij-platform/core/ActionSystem";

// Resize steps in Intellij Platform is calculated based on the size of a "W" character and some
// configuration (ide.windowSystem.hScrollChars). Although it's technically feasible, it seems not necessary
const HEIGHT_RESIZE_STEP = 16 * 5;
const WIDTH_RESIZE_STEP = 13 * 5;

export const anchors: Array<{
  anchor: Anchor;
  isSplit: boolean;
  id: string;
}> = [
  { id: "moveToLeftTop", anchor: "left", isSplit: false },
  { id: "moveToLeftBottom", anchor: "left", isSplit: true },
  { id: "moveToBottomLeft", anchor: "bottom", isSplit: false },
  { id: "moveToBottomRight", anchor: "bottom", isSplit: true },
  { id: "moveToRightTop", anchor: "right", isSplit: true },
  { id: "moveToRightBottom", anchor: "right", isSplit: false },
  { id: "moveToTopRight", anchor: "top", isSplit: true },
  { id: "moveToTopLeft", anchor: "top", isSplit: false },
];

const getAnchorName = ({
  anchor,
  isSplit,
}: {
  anchor: Anchor;
  isSplit: boolean;
}) =>
  `${anchor[0].toUpperCase()}${anchor.slice(1)} ${
    isHorizontalToolWindow(anchor)
      ? isSplit
        ? "Right"
        : "Left"
      : isSplit
      ? "Bottom"
      : "Top"
  }`;

export const ViewModeToActionId: Record<ViewMode, string> = {
  docked_pinned: DOCK_PINNED_MODE_ACTION_ID,
  docked_unpinned: DOCK_UNPINNED_MODE_ACTION_ID,
  undock: UNDOCK_MODE_ACTION_ID,
  float: FLOAT_MODE_ACTION_ID,
  window: WINDOW_MODE_ACTION_ID,
};

export const VIEW_MODE_ACTION_GROUP_ID = "TW.ViewModeGroup";
export const MOVE_TO_ACTION_GROUP_ID = "TW.MoveToGroup";
export const TOOL_WINDOW_RESIZE_ACTION_GROUP_ID = "ResizeToolWindowGroup";

export function useToolWindowActions({
  mainContentTitle,
}: {
  mainContentTitle: string;
}): ActionGroupDefinition {
  const {
    stretchWidth,
    stretchHeight,
    changeViewMode,
    moveToSide,
    focusMainContent,
    hide,
    remove,
    state,
  } = useToolWindowState();
  const createDefaultActionGroup = useCreateDefaultActionGroup();

  const actions: ActionDefinition[] = [];
  const activeToolWindowActionGroup = createDefaultActionGroup({
    id: "ActiveToolwindowGroup",
    title: "Active Tool Window",
    children: actions,
  });
  if (!state) {
    // FIXME: when window is removed, a last render happens with the new ToolWindowsState, which doesn't have state
    //  for the removed tool window. Need to understand why that happens.
    return activeToolWindowActionGroup;
  }
  const viewModeActionGroup = createDefaultActionGroup({
    id: VIEW_MODE_ACTION_GROUP_ID,
    title: "View Mode",
    children: [
      {
        id: DOCK_PINNED_MODE_ACTION_ID,
        title: "Dock Pinned",
        actionPerformed: () => {
          changeViewMode("docked_pinned");
        },
      },
      {
        id: DOCK_UNPINNED_MODE_ACTION_ID,
        title: "Dock Unpinned",
        actionPerformed: () => {
          changeViewMode("docked_unpinned");
        },
      },
      {
        id: UNDOCK_MODE_ACTION_ID,
        title: "Undock",
        actionPerformed: () => {
          changeViewMode("undock");
        },
      },
      {
        id: FLOAT_MODE_ACTION_ID,
        title: "Float",
        actionPerformed: () => {
          changeViewMode("float");
        },
      },
      {
        id: WINDOW_MODE_ACTION_ID,
        title: "Window",
        actionPerformed: () => {
          changeViewMode("window");
        },
      },
    ],
  });
  const moveToActionGroup = createDefaultActionGroup({
    id: MOVE_TO_ACTION_GROUP_ID,
    title: "Move to",
    children: anchors.map(
      (anchor): ActionDefinition => ({
        id: `TW.MoveTo.${anchor.id}`,
        title: getAnchorName(anchor),
        icon: <PlatformIcon icon={`actions/${anchor.id}`} />,
        isDisabled:
          state.anchor === anchor.anchor && state.isSplit === anchor.isSplit,
        actionPerformed: () => {
          moveToSide(anchor);
        },
      })
    ),
  });
  actions.push(
    {
      id: FOCUS_EDITOR_ACTION_ID,
      title: `Focus ${mainContentTitle}`, // in intellij it says "Focus Editor" but it's not generic enough.
      actionPerformed: () => {
        focusMainContent();
      },
    },
    {
      id: HIDE_ACTIVE_WINDOW_ACTION_ID,
      title: "Hide",
      icon: <PlatformIcon icon="general/hideToolWindow" />,
      actionPerformed: () => {
        hide();
      },
    },
    {
      id: MAXIMIZE_TOOL_WINDOW_ACTION_ID,
      title: "Maximize Tool Window", // Should be "Restore Tool Window Size if the window is currently maximized
      actionPerformed: () => {
        // TODO(release): either remove the action or implement it
        alert("Not implemented");
      },
    },
    {
      id: REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID,
      title: "Remove from Sidebar",
      actionPerformed: () => {
        remove();
      },
    },
    viewModeActionGroup,
    moveToActionGroup
  );
  if (state.viewMode === "float") {
    actions.push({
      id: DOCK_TOOL_WINDOW_ACTION_ID,
      title: "Dock",
      icon: (
        <PlatformIcon
          icon={`actions/${
            anchors.find(
              ({ anchor, isSplit }) =>
                anchor === state.anchor && isSplit === state.isSplit
            )?.id
          }`}
        />
      ),
      actionPerformed: () => {
        changeViewMode("docked_pinned");
      },
    });
  }
  if (state.viewMode !== "float" && state.viewMode !== "window") {
    const resizeGroup = createDefaultActionGroup({
      id: TOOL_WINDOW_RESIZE_ACTION_GROUP_ID,
      title: "Resize",
      children: [],
    });
    if (isHorizontalToolWindow(state.anchor)) {
      resizeGroup.children.push({
        id: RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID,
        title: "Stretch to bottom",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "bottom" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      });
      resizeGroup.children.push({
        id: RESIZE_TOOL_WINDOW_TOP_ACTION_ID,
        title: "Stretch to top",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "top" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      });
    } else {
      resizeGroup.children.push({
        id: RESIZE_TOOL_WINDOW_LEFT_ACTION_ID,
        title: "Stretch to left",
        actionPerformed: () => {
          stretchWidth(
            state.anchor === "left" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
          );
        },
      });
      resizeGroup.children.push({
        id: RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID,
        title: "Stretch to right",
        actionPerformed: () => {
          stretchWidth(
            state.anchor === "right" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
          );
        },
      });
    }
    actions.push(resizeGroup);
  }
  return activeToolWindowActionGroup;
}
