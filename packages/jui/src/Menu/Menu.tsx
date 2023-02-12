import React, { Key, useContext } from "react";
import { useMenu } from "@react-aria/menu";
import { AriaMenuProps } from "@react-types/menu";
import { Node } from "@react-types/shared";
import { useTreeState } from "../Tree/useTreeState"; // shared dependency between tree and menu, that could be lifted up import {Submenu} from '@intellij-platform/core/Menu/Submenu'
import { renderMenuNode } from "./renderMenuNode";
import { StyledMenu } from "./StyledMenu";
import { patchCollectionProps } from "@intellij-platform/core/Collections/PatchedItem"; // internal export

export interface MenuProps<T>
  extends Omit<
    AriaMenuProps<T>,
    // selection is not properly supported for nested menus. Plus, it's not even that meaningful for a nested menu
    // at least the way it's implemented now.
    | "onSelectionChange"
    | "defaultSelectedKeys"
    | "selectionMode"
    | "disallowEmptySelection"
  > {
  /**
   * Indicates currently expanded menu item (controlled).
   */
  expandedKey?: Key; // FIXME: should be keys
  /**
   * Called when expanded menu item is changed by user interaction, which can be either hovering over the menu item
   */
  onExpandedKeyChange?: (expandedKey: Key) => void; // FIXME: should be keys
  defaultExpandedKey?: Key; // FIXME: should be keys
  /**
   * @deprecated
   */
  expandOn?: "hover" | "press"; // hover delay doesn't seem to be needed as an option

  /**
   * Defines the press behaviour (either by mouse or by pressing Enter when focused) on menu items with submenu.
   * By default (undefined), pressing or hovering over a menu item with submenu, opens the submenu.
   * When set to "toggle", pressing a menu item with submenu will toggle the submenu. Hovering over such items will
   * no longer open the submenu.
   * When set to "action", pressing a menu item with submenu will call onAction for that item, and closes the menu.
   * Hovering over such items will no longer open the submenu.
   *
   * In all cases, pressing the right arrow will always open the submenu.
   */
  submenuBehavior?: "default" | "toggleOnPress" | "actionOnPress";

  /**
   * fills the available horizontal or vertical space, when rendered in a flex container.
   */
  fillAvailableSpace?: boolean;
}

/**
 * Can be provided by the overlay where the menu is rendered in. If provided, menu will call the provided close function
 * on actions. Note that there is no `closeOnSelect` option as of now, on this context, since no use case seems to exist
 * for keeping the menu overlay open after a menu item is selected.
 * **Update**: there are use cases where the menu is not closed after an item is clicked. Most of the toggle-able
 * actions (the ones with a checkmark) seem to be like this.
 * TODO: Make "close on selection" more flexible. Some ideas:
 *  - instead of calling close, pass it to `onAction` handler. Then on each action, one would need to call close if
 *    needed.
 *  - Offer a `MenuItem` component to be used instead of generic `Item`, where it accepts `closeOnSelect` boolean, which
 *    is true by default.
 *  - pass a `keepOpen` function to `onAction`.
 *  - Allow signaling whether the menu should kept open, via the returned value of onAction. e.g. return false means keep open.
 *  Last two suggestions are based on the assumption that most of the menu items are not selectable.
 *  Note that MenuOverlayContext could be used directly in action handlers too, but baking it into the menu makes it
 *  much more convenient, which seems more important than breaking the nice separation between Menu and MenuTrigger.
 */
export const MenuOverlayContext = React.createContext({ close: () => {} });
export const MenuContext = React.createContext<
  Pick<MenuProps<unknown>, "onClose" | "onAction" | "submenuBehavior">
>({});

/**
 * UI for menus which are normally shown in a popover. Being rendered as an overlay is not handled here.
 * Also, there is no coupling with any higher level entity like "Action", since this is just for the UI layer.
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
 */
export function Menu<T extends object>({
  onAction: onActionProp,
  submenuBehavior = "default",
  fillAvailableSpace = false,
  ...props
}: MenuProps<T>) {
  props = patchCollectionProps(props);
  const { close } = useContext(MenuOverlayContext);
  const onClose = () => {
    props.onClose?.();
    close();
  };
  const onAction = (key: Key) => {
    if (
      // The following check should have been in useMenu, but it's not currently. Probably because they haven't yet
      // covered nested menus.
      !state.collection.getItem(key)?.hasChildNodes
    ) {
      return onActionProp?.(key);
    } else if (submenuBehavior === "actionOnPress") {
      onClose();
      return onActionProp?.(key);
    }
  };
  // Create state based on the incoming props
  let state = useTreeState({
    ...props,
    childExpansionBehaviour: "single",
    expandedKeys: props.expandedKey ? [props.expandedKey] : undefined,
    onExpandedChange: ([firstKey]) => props?.onExpandedKeyChange?.(firstKey),
    defaultExpandedKeys: props.defaultExpandedKey
      ? [props.defaultExpandedKey]
      : undefined,
  });

  // Get props for the menu element
  const ref = React.useRef<HTMLUListElement>(null);
  const { menuProps } = useMenu({ ...props, onAction, onClose }, state, ref);

  return (
    /**
     * MenuContext is used to pass onAction and onClose to be passed to useMenu in submenus.
     * That's needed because in useMenuItem onAction and onClose are read off a WeakMap which has the menu state
     * (TreeState) as key. So we have to pass onAction and onClose everytime we call useMenu in submenus, to let the
     * menu items in that submenu access the right value of onAction and onClose. To avoid drilling these props down,
     * we keep it in a context.
     */
    <MenuContext.Provider
      value={{
        submenuBehavior,
        onAction,
        onClose,
      }}
    >
      <StyledMenu
        {...menuProps}
        ref={ref}
        fillAvailableSpace={fillAvailableSpace}
      >
        {[...state.collection].map((node: Node<T>) =>
          renderMenuNode(state, node)
        )}
      </StyledMenu>
    </MenuContext.Provider>
  );
}
