import React from "react";
import {
  Divider,
  DividerItem,
  Item,
} from "@intellij-platform/core/Collections";
import { Menu, MenuItemLayout } from "@intellij-platform/core/Menu";
import { useToolWindowState } from "./ToolWindowsState/ToolWindowStateProvider";
import {
  Action,
  ActionDefinition,
  useAction,
  useActionGroup,
} from "@intellij-platform/core/ActionSystem";
import {
  MOVE_TO_ACTION_GROUP,
  VIEW_MODE_ACTION_GROUP,
  viewModeActionId,
} from "@intellij-platform/core/ToolWindow/useToolWindowActions";

type ActionGroup = Omit<ActionDefinition, "actionPerformed"> & {
  id: string;
  actions?: Action[];
};
type ActionItem = ActionGroup | Action;

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

  const viewModeActions: Action[] = useActionGroup(VIEW_MODE_ACTION_GROUP);
  const moveToActions: Action[] = useActionGroup(MOVE_TO_ACTION_GROUP);

  const resizeActions: Action[] = useActionGroup([
    "ResizeToolWindowLeft",
    "ResizeToolWindowRight",
    "ResizeToolWindowTop",
    "ResizeToolWindowBottom",
    "MaximizeToolWindow",
  ]);
  const removeFromSideBarAction = useAction("RemoveToolWindowFromSidebar")!;
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
  const allActions = [
    ...moveToActions,
    ...viewModeActions,
    ...resizeActions,
    removeFromSideBarAction,
  ];

  const disabledKeys = allActions
    .filter(({ isDisabled }) => isDisabled)
    .map(({ id }) => id);
  return (
    <Menu
      {...menuProps}
      onAction={(key) => {
        const action = allActions.find(({ id }) => id === key);
        action?.actionPerformed();
        close();
      }}
      selectedKeys={[viewModeActionId(state.viewMode)]} // FIXME: keep isSelected on actions (toggle action)?
      disabledKeys={disabledKeys}
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
              shortcut={"shortcut" in action ? action.shortcut : undefined}
            />
          </Item>
        );
      }}
    </Menu>
  );
}
