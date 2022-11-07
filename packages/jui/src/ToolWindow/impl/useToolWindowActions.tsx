import {
  isHorizontalToolWindow,
  PlatformIcon,
  useToolWindowState,
  ViewMode,
} from "@intellij-platform/core";
import { ActionDefinition } from "@intellij-platform/core/ActionSystem";
import React from "react";
import { Anchor } from "@intellij-platform/core/ToolWindow";
import { zipObj } from "ramda";

// Resize steps in Intellij Platform is calculated based on the size of a "W" character and some
// configuration (ide.windowSystem.hScrollChars). Although it's technically feasible, it seems not necessary
const HEIGHT_RESIZE_STEP = 16 * 5;
const WIDTH_RESIZE_STEP = 13 * 5;

const viewModes: ViewMode[] = [
  "docked_pinned",
  "docked_unpinned",
  "undock",
  "float",
];

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
const viewModeToString: Record<ViewMode, string> = {
  undock: "Undock",
  docked_pinned: "Dock Pinned",
  docked_unpinned: "Dock Unpinned",
  float: "Float",
  window: "Window",
};

export const viewModeActionId = (viewMode: ViewMode) =>
  `TW.ViewMode.${viewMode}`;
export const VIEW_MODE_ACTION_GROUP = viewModes.map(viewModeActionId);

export const MOVE_TO_ACTION_GROUP = anchors.map((anchor) => `TW.${anchor.id}`);

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
    ...zipObj(
      VIEW_MODE_ACTION_GROUP,
      viewModes.map((viewMode) => ({
        title: viewModeToString[viewMode],
        actionPerformed: () => {
          changeViewMode(viewMode);
        },
      }))
    ),
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
    "TW.focusMainContent": {
      title: "Escape", // in intellij it says "Focus Editor" but it's not generic enough.
      actionPerformed: () => {
        focusMainContent();
      },
    },
    HideActiveWindow: {
      title: "Hide",
      icon: <PlatformIcon icon="general/hideToolWindow" />,
      actionPerformed: () => {
        hide();
      },
    },
    MaximizeToolWindow: {
      title: "Maximize Tool Window", // Should be "Restore Tool Window Size if the window is currently maximized
      actionPerformed: () => {
        // TODO(release): either remove the action or implement it
        alert("Not implemented");
      },
    },
    RemoveToolWindowFromSidebar: {
      title: "Remove from Sidebar",
      actionPerformed: () => {
        // TODO(release): either remove the action or implement it
        alert("Not implemented");
      },
    },
  };
  if (state.viewMode === "float") {
    actions.DockToolWindow = {
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
      actions.ResizeToolWindowBottom = {
        title: "Stretch to bottom",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "bottom" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      };
      actions.ResizeToolWindowTop = {
        title: "Stretch to top",
        actionPerformed: () => {
          stretchHeight(
            state.anchor === "top" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
          );
        },
      };
    } else {
      actions.ResizeToolWindowLeft = {
        title: "Stretch to left",
        actionPerformed: () => {
          stretchWidth(
            state.anchor === "left" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
          );
        },
      };
      actions.ResizeToolWindowRight = {
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
