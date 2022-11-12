import React from "react";
import { zipObj } from "ramda";
import {
  Anchor,
  isHorizontalToolWindow,
  useToolWindowState,
  ViewMode,
} from "@intellij-platform/core/ToolWindow";
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

export const VIEW_MODE_ACTION_IDS = Object.values(ViewModeToActionId);

export const MOVE_TO_ACTION_GROUP = anchors.map(
  (anchor) => `TW.MoveTo.${anchor.id}`
);

export function useToolWindowActions(): { [key: string]: ActionDefinition } {
  const {
    stretchWidth,
    stretchHeight,
    changeViewMode,
    moveToSide,
    focusMainContent,
    hide,
    state,
  } = useToolWindowState();
  const actions: { [key: string]: ActionDefinition } = {
    [DOCK_PINNED_MODE_ACTION_ID]: {
      title: "Dock Pinned",
      actionPerformed: () => {
        changeViewMode("docked_pinned");
      },
    },
    [DOCK_UNPINNED_MODE_ACTION_ID]: {
      title: "Dock Unpinned",
      actionPerformed: () => {
        changeViewMode("docked_unpinned");
      },
    },
    [UNDOCK_MODE_ACTION_ID]: {
      title: "Undock",
      actionPerformed: () => {
        changeViewMode("undock");
      },
    },
    [FLOAT_MODE_ACTION_ID]: {
      title: "Float",
      actionPerformed: () => {
        changeViewMode("float");
      },
    },
    [WINDOW_MODE_ACTION_ID]: {
      title: "Window",
      actionPerformed: () => {
        changeViewMode("window");
      },
    },
    ...zipObj(
      MOVE_TO_ACTION_GROUP,
      anchors.map(
        (anchor): ActionDefinition => ({
          title: getAnchorName(anchor),
          icon: <PlatformIcon icon={`actions/${anchor.id}`} />,
          isDisabled:
            state.anchor === anchor.anchor && state.isSplit === anchor.isSplit,
          actionPerformed: () => {
            moveToSide(anchor);
          },
        })
      )
    ),
    [FOCUS_EDITOR_ACTION_ID]: {
      title: "Escape", // in intellij it says "Focus Editor" but it's not generic enough.
      actionPerformed: () => {
        focusMainContent();
      },
    },
    [HIDE_ACTIVE_WINDOW_ACTION_ID]: {
      title: "Hide",
      icon: <PlatformIcon icon="general/hideToolWindow" />,
      actionPerformed: () => {
        hide();
      },
    },
    [MAXIMIZE_TOOL_WINDOW_ACTION_ID]: {
      title: "Maximize Tool Window", // Should be "Restore Tool Window Size if the window is currently maximized
      actionPerformed: () => {
        // TODO(release): either remove the action or implement it
        alert("Not implemented");
      },
    },
    [REMOVE_TOOL_WINDOW_FROM_SIDEBAR_ACTION_ID]: {
      title: "Remove from Sidebar",
      actionPerformed: () => {
        // TODO(release): either remove the action or implement it
        alert("Not implemented");
      },
    },
  };
  if (state.viewMode === "float") {
    actions[DOCK_TOOL_WINDOW_ACTION_ID] = {
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
    };
  }
  if (state.viewMode !== "float" && state.viewMode !== "window") {
    if (isHorizontalToolWindow(state.anchor)) {
      actions[RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID] = {
        title: "Stretch to bottom",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "bottom" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      };
      actions[RESIZE_TOOL_WINDOW_TOP_ACTION_ID] = {
        title: "Stretch to top",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "top" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      };
    } else {
      actions[RESIZE_TOOL_WINDOW_LEFT_ACTION_ID] = {
        title: "Stretch to left",
        actionPerformed: () => {
          stretchWidth(
            state.anchor === "left" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
          );
        },
      };
      actions[RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID] = {
        title: "Stretch to right",
        actionPerformed: () => {
          stretchWidth(
            state.anchor === "right" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
          );
        },
      };
    }
  }
  return actions;
}
