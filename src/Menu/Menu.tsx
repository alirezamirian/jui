import { useMenu } from "@react-aria/menu";
import { isMac } from "@react-aria/utils";
import { AriaMenuProps } from "@react-types/menu";
import { Node } from "@react-types/shared";
import React, { Key, useEffect } from "react";
import { css } from "styled-components";
import { ListDivider } from "../List/ListDivider";
import { styled } from "../styled";
import { StyledVerticalSeparator } from "../StyledSeparator";
import { Theme, UnknownThemeProp } from "../Theme/Theme";
import { useTreeState } from "../Tree/__tmp__useTreeState";
import { MenuItem } from "./MenuItem";

export interface MenuProps<T>
  extends Omit<
    AriaMenuProps<T>,
    // selection is not properly supported for nested menus. Plus, it's not even that meaningful for a nested menu
    // at least the way it's implemented now.
    "onSelectionChange" | "defaultSelection" | "selectionMode"
  > {
  /**
   * Indicates currently expanded menu item (controlled).
   */
  expandedKey?: Key;
  /**
   * Called when expanded menu item is changed by user interaction, which can be either hovering over the menu item
   * if `expandOn` is "focus", or clicking on the menu item (when `expandOn` is "press").
   */
  onExpandedKeyChange?: (expandedKey: Key) => void;
  defaultExpandedKey?: Key;
  expandOn?: "hover" | "press"; // hover delay doesn't seem to be needed as an option
}

export const StyledMenu = styled.ul`
  font-size: 0.92rem;
  margin: 0;
  padding: 5px 0;
  outline: none;
  list-style: none;
  width: fit-content;
  min-width: 100px;
  border: 1px solid ${({ theme }) => theme.color("Menu.borderColor")};
  ${isMac() &&
  css<{ theme: Theme }>`
    box-shadow: 0 5px 15px rgb(0 0 0 / 30%);
    border-color: ${({ theme }) =>
      theme.dark ? "rgba(0, 0, 0, 0.15)" : undefined};
  `}
  background: ${({ theme }) =>
    theme.color("PopupMenu.background" as UnknownThemeProp)};
  color: ${({ theme }) =>
    theme.color("PopupMenu.foreground" as UnknownThemeProp)};

  ${StyledVerticalSeparator} {
    background-color: ${({ theme }) =>
      theme.color("Menu.separatorColor" as UnknownThemeProp)};
    height: ${({ theme }) =>
      `${theme.value("PopupMenuSeparator.height" as UnknownThemeProp) ?? 3}px`};
    padding: ${({ theme }) =>
      `${
        theme.value("PopupMenuSeparator.stripeIndent" as UnknownThemeProp) ?? 1
      }px 0`};
  }
`;

/**
 * UI for menus which are normally shown in a popover. Being rendered as an overlay is not handled here.
 * Also there is no coupling with any higher level entity like "Action", since this is just for the UI layer.
 * Something like ActionMenu which creates a menu out of a list of actions can be implemented on top of this.
 *
 * @example
 *  <Menu>
 *    <Item>Item one</Item>
 *    <Item>
 *      <MenuItemLayout
 *        icon={<PlatformIcon icon={"actions/copy"} />}
 *        content="Copy"
 *        shortcut={"⌘C"} />
 *    </Item>
 *  </Menu>
 *
 *  Current issues and limitations:
 *  - Divider in sub-menu's is not supported. because of a constraint in @react-stately/collections, which results in
 *    this error: Unsupported type <Divider> in <Item>. Only <Item> is supported. Maybe supporting section would
 *    be a workaround for it.
 *  - when a parent menu item which has an open submenu is hovered, it gets focus.
 *
 *  TODO:
 *  - show selection
 *  - menu shown as an overlay with a trigger
 *  - [Least important] pass aria props to icon, keyboard shortcut, and content part of menu item. Maybe a context
 *    can be provided for it from menu item, which also exposes state like selected.
 */
export function Menu<T extends object>({
  expandOn = "hover",
  ...props
}: MenuProps<T>) {
  if (expandOn === "press") {
    // The only discovered use case so far is in "Branches" menu. Perhaps it's not even implemented as a Menu
    // in Intellij Platform, but it seems it very well can be, by supporting expand on press.
    throw new Error("expanding menu items only on press is not supported yet.");
  }
  // Create state based on the incoming props
  let state = useTreeState({
    ...props,
    expandedKeys: props.expandedKey ? [props.expandedKey] : undefined,
    onExpandedChange: ([firstKey]) => props?.onExpandedKeyChange?.(firstKey),
    defaultExpandedKeys: props.defaultExpandedKey
      ? [props.defaultExpandedKey]
      : undefined,
  });

  // Get props for the menu element
  let ref = React.useRef<HTMLUListElement>(null);
  let { menuProps } = useMenu(props, state, ref);

  useEffect(() => {
    if (props.autoFocus) {
      setTimeout(() => {
        // we need this hack until the nested menu is properly supported. That's because when the element is hovered
        // it sets the focus key, which will move focus to that item.
        ref.current?.focus();
      });
    }
  }, [props.autoFocus]);
  return (
    <StyledMenu {...menuProps} ref={ref}>
      {[...state.collection].map((item: Node<T>) => {
        switch (item.type) {
          case "item":
            return (
              <MenuItem
                key={item.key}
                item={item}
                state={state}
                expandOn={expandOn}
                onAction={props.onAction}
              />
            );
          case "section":
            // Maybe something like "Branches" menu needs titled sections.
            throw new Error(
              "Section in menu is not supported yet. You can use Divider though."
            );
          case "divider":
            return <ListDivider key={item.key} />;
        }
      })}
    </StyledMenu>
  );
}
