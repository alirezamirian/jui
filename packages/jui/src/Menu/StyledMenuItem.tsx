import { css, styled } from "@intellij-platform/core/styled";

import { UnknownThemeProp } from "../Theme/Theme";
import { StyledMenu } from "./StyledMenu";

const ICON_MARGIN = "0.3125rem"; // 5px
const ICON_WIDTH = "1rem"; // 16px
const LIST_ITEM_PADDING = "0.75rem"; // 12px
export const StyledMenuItemIcon = styled.span`
  display: inline-flex; // prevents unwanted increased height
  min-width: ${ICON_WIDTH};
  margin-right: ${ICON_MARGIN};
`;

export const StyledNestedArrow = styled.span`
  display: inline-flex; // to make it not take more height than the icon
  margin-right: -0.75rem;
  margin-left: 0.75rem;
`;

const highlightedStyle = css`
  color: ${({ theme }) =>
    theme.asCurrentForeground(
      theme.color(
        "MenuItem.selectionForeground" as UnknownThemeProp<"MenuItem.selectionForeground">
      )
    )};
  background: ${({ theme }) =>
    theme.color(
      "MenuItem.selectionBackground" as UnknownThemeProp<"MenuItem.selectionBackground">
    )};
`;
const defaultStyle = css`
  color: ${({ theme }) =>
    theme.color(
      "MenuItem.foreground" as UnknownThemeProp<"MenuItem.foreground">
    )};
  background: unset;
`;
const disabledStyle = css`
  color: ${({ theme }) =>
    theme.color("MenuItem.disabledForeground") + "!important"};
  background: unset !important;
`;
export const StyledMenuItem = styled.li<{
  isDisabled: boolean;
  isActive: boolean;
}>`
  position: relative; // for being able to position arrow icon absolutely
  outline: none;
  cursor: default;
  white-space: nowrap;

  // bg/fg style for different states. Order is based on how they should override each other
  ${defaultStyle};
  ${({ isActive }) => isActive && highlightedStyle};
  ${({ isDisabled }) => isDisabled && disabledStyle};

  // With default submenu behavior, items get focused on hover, and highlighting the active (focused) item is fine.
  // With other submenu behaviors, in the reference implementation, the hover item takes precedence over focused key.
  // i.e., submenus can be open while mouse is on sibling of submenu's parent item. In that case, the hovered item
  // will be highlighted even though the focus is kept within the opened submenu. This behavior (which may be even a
  // little questionable UX-wise), seemed better implemented by css, because otherwise, we would need MenuItem to know
  // if it's parent menu is hovered or not.
  // TODO: cover this with tests

  ul[role="menu"]:not(:focus-within):hover & {
    ${defaultStyle};
  }
  ul[role="menu"]:not(:focus-within):hover &:hover {
    ${highlightedStyle};
  }

  // would be nice to have a visual clue for focus visible state, but it's not like that in intellij platform
  //border-left: 3px solid transparent;
  //&:focus-visible {
  //  border-left: 3px solid rgba(255, 255, 255, 0.1);
  //}

  // NOTE: The left margin seems not to be consistent in all menus.
  padding: 0 1.25rem 0 ${LIST_ITEM_PADDING};
  // CSS-only solution to conditionally add left margin to menu items without icon, if there is at least one menu item
  // with icon, in the current menu. To have text in all menu items aligned. The extra margin is avoided if there is no
  // menu item with icon. It relies on :has() css pseudo-class which is not supported in FF at the moment.
  ${StyledMenu}:has(${StyledMenuItemIcon}) &:not(:has(${StyledMenuItemIcon})) {
    padding-left: calc(${LIST_ITEM_PADDING} + ${ICON_WIDTH} + ${ICON_MARGIN});
  }
  line-height: 1.5; // to make the item have the right height
  display: flex;
  align-items: center;
`;
