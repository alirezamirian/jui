import {
  Divider,
  DividerItem,
  Item,
  Menu,
  MenuItemLayout,
} from "@intellij-platform/core";
import React from "react";
import { Action, ActionDefinition } from "@intellij-platform/core/ActionSystem";
import { flatten } from "ramda";

interface ActionGroup
  extends Pick<ActionDefinition, "icon" | "title" | "isDisabled"> {
  id: string;
  actions: Action[];
}
export type ActionItem = ActionGroup | Action | DividerItem;

function isAction(item: ActionItem): item is Action {
  return "actionPerformed" in item;
}
function isGroup(item: ActionItem): item is ActionGroup {
  return "actions" in item;
}
function isActionOrGroup(item: ActionItem): item is Action | ActionGroup {
  return isAction(item) || isGroup(item);
}

/**
 * Given a nested list of resolved actions, renders a menu corresponding to them.
 */
export function ActionsMenu({
  actions,
  selectedKeys,
  menuProps,
}: {
  actions: Array<ActionItem>;
  selectedKeys: string[];
  menuProps: React.HTMLAttributes<HTMLElement>;
}) {
  const allActions = getAllActionsRecursive(actions);
  const disabledKeys = allActions
    .filter(({ isDisabled }) => isDisabled)
    .map(({ id }) => id);

  return (
    <Menu
      {...menuProps}
      onAction={(key) => {
        const action = allActions.find(({ id }) => id === key);
        if (action && isAction(action)) {
          action.actionPerformed();
        }
        close();
      }}
      selectedKeys={selectedKeys} // FIXME: keep isSelected on actions (toggle action)?
      disabledKeys={disabledKeys}
      items={actions}
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
            childItems={isGroup(action) ? action.actions : undefined}
          >
            <MenuItemLayout
              content={action.title}
              icon={action.icon}
              shortcut={isAction(action) ? action.shortcut : undefined}
            />
          </Item>
        );
      }}
    </Menu>
  );
}

function getAllActionsRecursive(items: ActionItem[]): Action[] {
  return flatten(
    items
      .filter(isActionOrGroup)
      .map((item) => (isGroup(item) ? item.actions : item))
  );
}
