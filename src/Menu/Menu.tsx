import React from "react";
import { useMenu } from "@react-aria/menu";
import { AriaMenuProps } from "@react-types/menu";
import { ListDivider } from "../List/ListDivider";
import { styled } from "../styled";
import { StyledVerticalDivider } from "../StyledDivider";
import { UnknownThemeProp } from "../Theme/Theme";
import { useTreeState } from "../Tree/__tmp__useTreeState";
import { MenuItem } from "./MenuItem";

export interface MenuProps<T> extends AriaMenuProps<T> {}

const StyledMenu = styled.ul`
  padding: 5px 0;
  list-style: none;
  width: fit-content;
  min-width: 200px;
  border: 1px solid ${({ theme }) => theme.color("Menu.borderColor")};
  background: ${({ theme }) =>
    theme.color("PopupMenu.background" as UnknownThemeProp)};
  color: ${({ theme }) =>
    theme.color("PopupMenu.foreground" as UnknownThemeProp)};

  ${StyledVerticalDivider} {
    margin: 4px 0;
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
 */
export function Menu<T extends object>(props: MenuProps<T>) {
  // Create state based on the incoming props
  let state = useTreeState({ ...props });

  // Get props for the menu element
  let ref = React.useRef<HTMLUListElement>(null);
  let { menuProps } = useMenu(props, state, ref);

  return (
    <StyledMenu {...menuProps} ref={ref}>
      {[...state.collection].map((item) => {
        switch (item.type) {
          case "item":
            return (
              <MenuItem
                key={item.key}
                item={item}
                state={state}
                onAction={props.onAction}
              />
            );
          case "section":
            // Maybe something like "Branches" menu needs titled sections.
            throw new Error(
              "Section in menu is not supported yet. You can use Divider though."
            );
          case "divider":
            return <ListDivider />;
        }
      })}
    </StyledMenu>
  );
}
