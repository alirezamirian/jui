import { styled } from "@intellij-platform/core/styled";
import { Theme } from "@intellij-platform/core/Theme";
import { StyledDefaultTab } from "@intellij-platform/core/Tabs/StyledDefaultTab";
import {
  getTabThemeStyles,
  TabTheme,
} from "@intellij-platform/core/Tabs/TabTheme";

export const toolWindowTabTheme = ({ theme }: { theme: Theme }): TabTheme => ({
  borderColor: theme.color("ToolWindow.HeaderTab.borderColor"),
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
  padding: 0 0.7rem;
  ${({ theme }) => getTabThemeStyles(toolWindowTabTheme({ theme }))};
`;
