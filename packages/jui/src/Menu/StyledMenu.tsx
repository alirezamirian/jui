import { isMac } from "@react-aria/utils";
import { css } from "styled-components";
import { MAC_WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { StyledVerticalSeparator } from "../StyledSeparator";
import { Theme, UnknownThemeProp } from "../Theme/Theme";

export const MENU_VERTICAL_PADDING = 5;
export const MENU_BORDER_WIDTH = 1;

export const StyledMenu = styled.ul`
  font-size: 0.87rem;
  margin: 0;
  padding: ${MENU_VERTICAL_PADDING}px 0;
  outline: none;
  list-style: none;
  width: fit-content;
  min-width: 100px;
  border: ${MENU_BORDER_WIDTH}px solid
    ${({ theme }) => theme.color("Menu.borderColor")};
  ${isMac() &&
  css<{ theme: Theme }>`
    ${MAC_WINDOW_SHADOW};
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
    margin: 0 0.5rem;
  }
`;
