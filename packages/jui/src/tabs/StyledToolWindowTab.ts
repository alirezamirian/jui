import { styled, Theme } from "jui";
import {
  getTabThemeStyles,
  StyledDefaultTab,
  TabTheme,
} from "jui/tabs/StyledDefaultTab";

export const toolWindowTabTheme = ({ theme }: { theme: Theme }): TabTheme => ({
  underlineHeight: theme.value<number>("ToolWindow.HeaderTab.underlineHeight"),
  background: "transparent",
  underlinedTabInactiveBackground: theme.color(
    "ToolWindow.HeaderTab.underlinedTabInactiveBackground"
  ),
  underlinedTabBackground: theme.color(
    "ToolWindow.HeaderTab.underlinedTabBackground"
  ),
  hoverInactiveBackground:
    theme.color("ToolWindow.HeaderTab.hoverInactiveBackground") ??
    theme.color("ToolWindow.HeaderTab.hoverBackground"),
  hoverBackground: theme.color("ToolWindow.HeaderTab.hoverBackground"),
  inactiveUnderlineColor: theme.color(
    "ToolWindow.HeaderTab.inactiveUnderlineColor"
  ),
  underlineColor: theme.color("ToolWindow.HeaderTab.underlineColor"),

  underlinedTabInactiveForeground:
    theme.color("ToolWindow.HeaderTab.underlinedTabInactiveForeground") ??
    theme.color("ToolWindow.HeaderTab.underlinedTabForeground"),
  underlinedTabForeground: theme.color(
    "ToolWindow.HeaderTab.underlinedTabForeground"
  ),
});
export const StyledToolWindowTab = styled(StyledDefaultTab)`
  ${({ theme }) => getTabThemeStyles(toolWindowTabTheme({ theme }))};
`;
