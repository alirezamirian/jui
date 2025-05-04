import { css } from "styled-components";

import { WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { StyledVerticalSeparator } from "../StyledSeparator";
import { UnknownThemeProp } from "../Theme/Theme";

import { StyledMenuItem, StyledMenuItemIcon } from "./StyledMenuItem";

export const MENU_VERTICAL_PADDING = 5;
export const MENU_BORDER_WIDTH = 1;

// noinspection CssInvalidPropertyValue
export const StyledMenu = styled.ul<{ $fillAvailableSpace?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin: 0;
  padding: ${MENU_VERTICAL_PADDING}px 0;
  outline: none;
  list-style: none;
  width: fit-content;
  min-width: 120px;
  overflow: auto;
  // Border doesn't seem to be painted in the original impl. IdeaPopupMenuUI.isUnderPopup(c) seemed to return false
  // in all cases. More info: https://github.com/JetBrains/intellij-community/blob/c5ece483811a3ab546fc3880225efb02cc8b94dd/platform/platform-impl/src/com/intellij/ide/ui/laf/darcula/ui/DarculaPopupMenuBorder.java#L24
  /*  border: ${MENU_BORDER_WIDTH}px solid
    ${({ theme }) =>
    theme.color("Menu.borderColor", !theme.dark ? "#CDCDCD" : "#515151")};*/
  ${WINDOW_SHADOW};
  background: ${({ theme }) =>
    theme.color(
      "PopupMenu.background" as UnknownThemeProp<"PopupMenu.background">
    )};
  color: ${({ theme }) =>
    theme.color(
      "PopupMenu.foreground" as UnknownThemeProp<"PopupMenu.foreground">
    )};

  ${StyledVerticalSeparator}:first-child,
  ${StyledVerticalSeparator}:last-child, 
  ${StyledVerticalSeparator} + ${StyledVerticalSeparator} {
    display: none;
  }
  ${StyledVerticalSeparator} {
    background-color: ${({ theme }) => theme.color("Menu.separatorColor")};
    height: ${({ theme }) =>
      `${theme.value("PopupMenuSeparator.height") ?? 3}px`};
    padding: ${({ theme }) =>
      `${theme.value("PopupMenuSeparator.stripeIndent") ?? 1}px 0`};
    margin: ${({ theme }) =>
      `0 ${theme.value("PopupMenuSeparator.withToEdge") ?? 1}px`};
  }
  ${({ $fillAvailableSpace }) =>
    $fillAvailableSpace &&
    css`
      flex: 1;
      width: fill-available; // will be converted to --webkit-fill-available and --moz-available, but doesn't work in FF
      height: fill-available;
    `}

  --jui-menu-item-padding: 1rem;
  --jui-menu-item-icon-width: 1rem;
  --jui-menu-item-icon-spacing: 0.3125rem;

  ${StyledMenuItem} {
    // NOTE: The left margin seems not to be consistent in all menus.
    padding-left: var(--jui-menu-item-padding);
  }
  &:has(${StyledMenuItemIcon}) {
    // Adjusting item padding for menus with icon to be slightly smaller. Based on observations on the reference impl.
    // Could be handled by a negative margin on icons as well.
    --jui-menu-item-padding: 0.75rem;

    // CSS-only solution to conditionally add left margin to menu items without icon, if there is at least one menu item
    // with icon, in the current menu. To have text in all menu items aligned. The extra margin is avoided if there is no
    // menu item with icon. It relies on :has() css pseudo-class which is not supported in FF at the moment.
    ${StyledMenuItem}:not(:has(${StyledMenuItemIcon})) {
      padding-left: calc(
        var(--jui-menu-item-padding) + var(--jui-menu-item-icon-width) +
          var(--jui-menu-item-icon-spacing)
      );
    }
  }
  ${StyledMenuItemIcon} {
    width: var(--jui-menu-item-icon-width);
    margin-right: var(--jui-menu-item-icon-spacing);
  }
`;
