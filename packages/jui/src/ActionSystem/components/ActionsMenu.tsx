import React from "react";
import { flatten } from "ramda";
import { Menu, MenuItemLayout, MenuProps } from "@intellij-platform/core/Menu";
import { Divider, Item, Section } from "@intellij-platform/core/Collections";
import { DividerItem } from "@intellij-platform/core/Collections/Divider"; // Importing from /Collections breaks the build for some reason
import { type ActionGroup } from "@intellij-platform/core/ActionSystem/ActionGroup";
import { type Action } from "@intellij-platform/core/ActionSystem/Action";

type ActionGroupAsMenuItem = Pick<
  ActionGroup,
  "id" | "icon" | "title" | "isDisabled" | "children" | "presentation"
>;
export type ActionItem = ActionGroupAsMenuItem | Action | DividerItem;

function isAction(item: ActionItem): item is Action {
  return "perform" in item;
}

export type ActionMenuProps = {
  selectedKeys?: string[];
  menuProps?: React.HTMLAttributes<HTMLElement>;
  menuComponent?: React.ComponentType<
    Pick<
      MenuProps<ActionItem>,
      | "onAction"
      | "selectedKeys"
      | "disabledKeys"
      | "items"
      | "autoFocus"
      | "children"
    >
  >;
  actions: Array<ActionItem>;
};

/**
 * Given a nested list of resolved actions, renders a menu corresponding to them.
 */
export function ActionsMenu({
  actions,
  selectedKeys,
  menuProps,
  menuComponent: MenuComponent = Menu,
}: ActionMenuProps) {
  const allActions = getAllActions(actions);
  const disabledKeys = allActions
    .filter(({ isDisabled }) => isDisabled)
    .map(({ id }) => id);

  return (
    <MenuComponent
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
    >
      {(action) => {
        if (action instanceof DividerItem) {
          return <Divider />;
        }
        return renderActionAsMenuItem(action);
      }}
    </MenuComponent>
  );
}

type ActionAsMenuItem = Omit<Action, "perform" | "shortcuts">;

export function renderActionAsMenuItem(
  action: ActionAsMenuItem | ActionGroupAsMenuItem
) {
  const isGroup = "children" in action;
  if (isGroup && action.presentation !== "popup") {
    return (
      <Section
        key={action.id}
        // @ts-expect-error: hasDivider is not yet made a public API.
        hasDivider
        aria-label={
          action.presentation === "section" ? action.title : undefined
        }
        title={
          action.presentation === "titledSection" ? action.title : undefined
        }
        items={action.children}
      >
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
    items.map((item) => ("children" in item ? item.children : item))
  ).filter(isAction);
}
