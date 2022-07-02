import { useMenu } from "@react-aria/menu";
import { AriaMenuProps } from "@react-types/menu";
import { Node } from "@react-types/shared";
import React, { Key, useContext, useEffect } from "react";
import { ListDivider } from "../List/ListDivider";
import { useTreeState } from "../Tree/__tmp__useTreeState";
import { MenuItem } from "./MenuItem";
import { StyledMenu } from "./StyledMenu";
import { MenuSection } from "@intellij-platform/core/Menu/MenuSection";

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

/**
 * Can be provided by the overlay where the menu is rendered in. If provided, menu will call the provided close function
 * on actions. Note that there is no `closeOnSelect` option as of now, on this context, since no use case seems to exist
 * for keeping the menu overlay open after a menu item is selected.
 */
export const MenuOverlayContext = React.createContext({ close: () => {} });

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
 *  - [Least important] pass aria props to icon, keyboard shortcut, and content part of menu item. Maybe a context
 *    can be provided for it from menu item, which also exposes state like selected.
 */
export function Menu<T extends object>({
  expandOn = "hover",
  ...props
}: MenuProps<T>) {
  const { close } = useContext(MenuOverlayContext);
  const onAction: MenuProps<T>["onAction"] = (...args) => {
    close();
    return props.onAction?.(...args);
  };
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
                onAction={onAction}
              />
            );
          case "section":
            // Maybe something like "Branches" menu needs titled sections.
            return (
              <MenuSection
                key={item.key}
                item={item}
                state={state}
                expandOn={expandOn}
                onAction={onAction}
              />
            );
          case "divider":
            return <ListDivider key={item.key} />;
        }
      })}
    </StyledMenu>
  );
}
