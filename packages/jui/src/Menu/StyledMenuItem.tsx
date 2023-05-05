import { css, styled } from "@intellij-platform/core/styled";

import { UnknownThemeProp } from "@intellij-platform/core/Theme";
export const StyledMenuItemIcon = styled.span`
  display: inline-flex; // prevents unwanted increased height
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

  padding-right: 1.25rem;
  line-height: 1.5; // to make the item have the right height
  display: flex;
  align-items: center;
`;
