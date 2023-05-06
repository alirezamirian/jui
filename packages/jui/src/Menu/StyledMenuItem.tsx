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

  padding-right: 1.25rem;
  line-height: 1.5; // to make the item have the right height
  display: flex;
  align-items: center;
`;
