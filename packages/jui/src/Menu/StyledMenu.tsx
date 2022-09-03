import { WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { StyledVerticalSeparator } from "../StyledSeparator";
import { UnknownThemeProp } from "../Theme/Theme";

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

  ${StyledVerticalSeparator} {
    background-color: ${({ theme }) => theme.color("Menu.separatorColor")};
    height: ${({ theme }) =>
      `${theme.value("PopupMenuSeparator.height") ?? 3}px`};
    padding: ${({ theme }) =>
      `${theme.value("PopupMenuSeparator.stripeIndent") ?? 1}px 0`};
    margin: ${({ theme }) =>
      `0 ${theme.value("PopupMenuSeparator.withToEdge") ?? 1}px`};
  }
`;
