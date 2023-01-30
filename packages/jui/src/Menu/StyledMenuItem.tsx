import { css } from "styled-components";
import { styled } from "../styled";
import { UnknownThemeProp } from "../Theme/Theme";

export const StyledMenuItem = styled.li<{
  isDisabled: boolean;
  isActive: boolean;
}>`
  position: relative; // for being able to position arrow icon absolutely
  outline: none;
  cursor: default;
  white-space: nowrap;
  color: ${({ isActive, isDisabled, theme }) => {
    if (isDisabled) {
      return theme.color("MenuItem.disabledForeground");
    }
    if (isActive) {
      return theme.color(
        "MenuItem.selectionForeground" as UnknownThemeProp<"MenuItem.selectionForeground">
      );
    }
    return theme.color(
      "MenuItem.foreground" as UnknownThemeProp<"MenuItem.foreground">
    );
  }};
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.asCurrentForeground(
        theme.color(
          "MenuItem.selectionBackground" as UnknownThemeProp<"MenuItem.selectionBackground">
        )
      )};
    `}
  // would be nice to have a visual clue for focus visible state, but it's not like that in intellij platform
  //border-left: 3px solid transparent;
  //&:focus-visible {
  //  border-left: 3px solid rgba(255, 255, 255, 0.1);
  //}
  padding: 0 20px 0 27px;
  line-height: 1.5; // to make the item have the right height
  display: flex;
  align-items: center;
`;
