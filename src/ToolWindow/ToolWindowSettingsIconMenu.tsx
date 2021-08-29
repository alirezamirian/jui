import React, { ReactNode } from "react";
import { Divider, DividerItem } from "../Collections/Divider";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { Item, Menu, MenuItemLayout } from "../Menu";
import { useToolWindowState } from "./ToolWindowsState/ToolWindowStateProvider";
import { ViewMode } from "./ToolWindowsState/ToolWindowsState";
import { Anchor, isHorizontal } from "./utils";

const viewModes: ViewMode[] = [
  "docked_pinned",
  "docked_unpinned",
  "undock",
  "float",
  "window",
];
const anchors: Array<{ anchor: Anchor; isSplit: boolean; id: string }> = [
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
    isHorizontal(anchor)
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

// TODO: replace these temporary action types with the real ones when action system is implemented.
//  action would be an entity with association to:
//  - some presentation (title and icon)
//  - a set of shortcuts
//  right now those pieces of information are just mixed in one simple object
type ActionBase = {
  id: string;
  title: string;
  shortcut?: string;
  icon?: ReactNode;
};
type Action = ActionBase & {
  perform: () => void;
};
type ActionGroup = ActionBase & {
  actions?: Action[];
};
type ActionItem = ActionGroup | Action;

// Resize steps in Intellij Platform is calculated based on the size of a "W" character and some
// configuration (ide.windowSystem.hScrollChars). Although it's technically feasible, it seems not necessary
const HEIGHT_RESIZE_STEP = 16 * 5;
const WIDTH_RESIZE_STEP = 13 * 5;

/**
 * Tool window gear icon menu, with a set of default actions and some extra ones.
 * TODO: add support for extra actions when action system is progressed a little.
 */
export function ToolWindowSettingsIconMenu({
  close,
  menuProps,
}: {
  close: () => void;
  menuProps: React.HTMLAttributes<HTMLElement>;
}) {
  const {
    state,
    changeViewMode,
    moveToSide,
    stretchWidth,
    stretchHeight,
  } = useToolWindowState();

  const viewModeActions: Action[] = viewModes.map((viewMode) => ({
    id: `viewMode ${viewModeToString[viewMode]}`,
    title: viewModeToString[viewMode],
    perform: () => {
      changeViewMode(viewMode);
    },
  }));
  const moveToActions: Action[] = anchors.map((anchor) => ({
    id: `anchor ${getAnchorName(anchor)}`,
    title: getAnchorName(anchor),
    icon: <PlatformIcon icon={`actions/${anchor.id}`} />,
    perform: () => {
      moveToSide(anchor);
    },
  }));

  const resizeActions: Action[] = isHorizontal(state.anchor)
    ? [
        {
          id: "ResizeToolWindowTop",
          title: "Stretch to top",
          shortcut: "⇧⌘↑",
          perform: () => {
            stretchHeight(
              state.anchor === "top" ? -HEIGHT_RESIZE_STEP : HEIGHT_RESIZE_STEP
            );
          },
        },
        {
          id: "ResizeToolWindowBottom",
          title: "Stretch to bottom",
          shortcut: "⇧⌘↓",
          perform: () => {
            stretchHeight(
              state.anchor === "bottom"
                ? -HEIGHT_RESIZE_STEP
                : HEIGHT_RESIZE_STEP
            );
          },
        },
      ]
    : [
        {
          id: "ResizeToolWindowLeft",
          title: "Stretch to left",
          shortcut: "⇧⌘←",
          perform: () => {
            console.log("stretch to left");
            stretchWidth(
              state.anchor === "left" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
            );
          },
        },
        {
          id: "ResizeToolWindowRight",
          title: "Stretch to right",
          shortcut: "⇧⌘→",
          perform: () => {
            console.log("stretch to right");
            stretchWidth(
              state.anchor === "right" ? -WIDTH_RESIZE_STEP : WIDTH_RESIZE_STEP
            );
          },
        },
      ];
  resizeActions.push({
    id: "MaximizeToolWindow",
    title: "Maximize Tool Window",
    shortcut: "⇧⌘'",
    perform: () => {},
  });
  const removeFromSideBarAction: ActionItem = {
    id: "removeFromSidebar",
    title: "Remove from Sidebar",
    perform: () => {
      alert("Not implemented");
    },
  };
  const gearIconActions: Array<ActionItem | DividerItem> = [
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
    <Menu
      {...menuProps}
      onAction={(key) => {
        const allActions = [
          ...moveToActions,
          ...viewModeActions,
          ...resizeActions,
          removeFromSideBarAction,
        ];
        const action = allActions.find(({ id }) => id === key);
        console.log("action", action);
        action?.perform();
        close();
      }}
      selectedKeys={[`viewMode ${viewModeToString[state.viewMode]}`]}
      disabledKeys={[`anchor ${getAnchorName(state)}`]}
      items={gearIconActions}
      autoFocus
    >
      {(action) => {
        if (action instanceof DividerItem) {
          return <Divider />;
        }
        return (
          <Item
            key={action.id}
            textValue={action.title}
            childItems={"actions" in action ? action.actions : undefined}
          >
            <MenuItemLayout
              content={action.title}
              icon={action.icon}
              shortcut={action.shortcut}
            />
          </Item>
        );
      }}
    </Menu>
  );
}
