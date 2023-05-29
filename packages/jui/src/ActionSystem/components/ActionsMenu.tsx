import React from "react";
import { flatten } from "ramda";
import { Menu, MenuItemLayout } from "@intellij-platform/core/Menu";
import {
  Divider,
  DividerItem,
  Item,
} from "@intellij-platform/core/Collections";
import {
  Action,
  ActionGroup,
  isActionGroup,
} from "@intellij-platform/core/ActionSystem";
import { Section } from "@react-stately/collections";

type ActionGroupAsMenuItem = Pick<
  ActionGroup,
  "id" | "icon" | "title" | "isDisabled" | "children" | "isPopup"
>;
export type ActionItem = ActionGroupAsMenuItem | Action | DividerItem;

function isAction(item: ActionItem): item is Action {
  return "actionPerformed" in item;
}

export type ActionMenuProps = {
  selectedKeys?: string[];
  menuProps?: React.HTMLAttributes<HTMLElement>;
  actions: Array<ActionItem>;
};

/**
 * Given a nested list of resolved actions, renders a menu corresponding to them.
 */
export function ActionsMenu({
  actions,
  selectedKeys,
  menuProps,
}: ActionMenuProps) {
  const allActions = getAllActions(actions);
  const disabledKeys = allActions
    .filter(({ isDisabled }) => isDisabled)
    .map(({ id }) => id);

  return (
    <Menu
      {...menuProps}
      onAction={(key) => {
        const action = allActions.find(({ id }) => id === key);
        if (action && isAction(action)) {
          action.perform(); // TODO: pass context, containing the menu item as `element`
        }
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
        return renderActionAsMenuItem(action);
      }}
    </Menu>
  );
}

type ActionAsMenuItem = Omit<Action, "perform" | "shortcuts">;

export function renderActionAsMenuItem(
  action: ActionAsMenuItem | ActionGroupAsMenuItem
) {
  const isGroup = "children" in action;
  if (isGroup && !action.isPopup) {
    return (
      <Section key={action.id} title={action.title} items={action.children}>
        {renderActionAsMenuItem}
      </Section>
    );
  }
  return (
    <Item
      key={action.id}
      textValue={action.title}
      childItems={isGroup ? action.children : undefined}
    >
      <MenuItemLayout
        content={action.title}
        icon={action.icon}
        shortcut={"shortcut" in action ? action.shortcut : undefined}
      />
    </Item>
  );
}

function getAllActions(items: ActionItem[]): Action[] {
  return flatten(
    items
      .filter(isAction)
      .map((item) => (isActionGroup(item) ? item.children : item))
  );
}
