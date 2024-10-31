import React from "react";
import { flatten } from "ramda";
import { Menu, MenuItemLayout, MenuProps } from "@intellij-platform/core/Menu";
import { Divider, Item, Section } from "@intellij-platform/core/Collections";
import { DividerItem } from "@intellij-platform/core/Collections/Divider"; // Importing from /Collections breaks the build for some reason
import { type ActionGroup } from "@intellij-platform/core/ActionSystem/ActionGroup";
import {
  type Action,
  ActionContext,
} from "@intellij-platform/core/ActionSystem/Action";

type ActionGroupAsMenuItem = Pick<
  ActionGroup,
  "id" | "icon" | "title" | "isDisabled" | "children" | "menuPresentation"
>;
export type ActionItem = ActionGroupAsMenuItem | Action | DividerItem;

function isAction(item: ActionItem): item is Action {
  return "perform" in item;
}

type ControlledMenuProps = Pick<
  MenuProps<ActionItem>,
  "onAction" | "disabledKeys" | "items" | "children"
>;
type RenderMenu = (props: ControlledMenuProps) => React.ReactNode;
export type ActionMenuProps = {
  actions: Array<ActionItem>;

  /**
   * Context with which actions should be performed.
   * Usually the context by which the ActionsMenu itself is opened.
   * Pass a function for lazy evaluation when the action is selected from the menu.
   */
  actionContext?: ActionContext | (() => ActionContext);
  /**
   * Allows for rendering a custom menu component, e.g. {@link SpeedSearchMenu}.
   * If not provided, {@link Menu} is rendered, receiving additional props that
   * are passed to `ActionsMenu`.
   * If it is provided, additional {@link Menu} props are not allowed, and they
   * can be passed directly to the returned menu element.
   */
  children?: RenderMenu;
} & (
  | {
      children: RenderMenu;
    }
  | (Omit<MenuProps<ActionItem>, keyof ControlledMenuProps> & {
      children?: never;
    })
);
/**
 * Given a nested list of resolved actions, renders a menu corresponding to them.
 */
export function ActionsMenu({
  actions,
  actionContext,
  children = (actionMenuProps) => <Menu {...otherProps} {...actionMenuProps} />,
  ...otherProps
}: ActionMenuProps) {
  const allActions = getAllActions(actions);
  const disabledKeys = allActions
    .filter(({ isDisabled }) => isDisabled)
    .map(({ id }) => id);

  return (
    <>
      {children({
        onAction: (key) => {
          const action = allActions.find(({ id }) => id === key);
          if (action && isAction(action)) {
            action.perform(
              typeof actionContext === "function"
                ? actionContext?.()
                : actionContext
            );
          }
        },
        disabledKeys,
        // FIXME: keep isSelected on actions (toggle action) and control selectedKeys too?
        items: actions,
        children: (action) => {
          if (action instanceof DividerItem) {
            return <Divider />;
          }
          return renderActionAsMenuItem(action);
        },
      })}
    </>
  );
}

type ActionAsMenuItem = Omit<Action, "perform" | "shortcuts">;

export function renderActionAsMenuItem(
  action: ActionAsMenuItem | ActionGroupAsMenuItem | DividerItem
) {
  const isGroup = "children" in action;
  if (
    isGroup &&
    (action.menuPresentation === "section" ||
      action.menuPresentation === "titledSection")
  ) {
    return (
      <Section
        key={action.id}
        // @ts-expect-error: hasDivider is not yet made a public API.
        hasDivider
        aria-label={
          action.menuPresentation === "section" ? action.title : undefined
        }
        title={
          action.menuPresentation === "titledSection" ? action.title : undefined
        }
        items={action.children}
      >
        {renderActionAsMenuItem}
      </Section>
    );
  }
  if (action instanceof DividerItem) {
    return <Divider />;
  }
  return (
    <Item
      key={action.id}
      textValue={action.title}
      aria-label={action.title}
      childItems={
        isGroup && action.menuPresentation === "submenu"
          ? action.children
          : undefined
      }
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
    items.map((item) =>
      [item].concat("children" in item ? getAllActions(item.children) : [])
    )
  ).filter(isAction);
}
