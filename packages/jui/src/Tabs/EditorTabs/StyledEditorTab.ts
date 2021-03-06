import { styled } from "@intellij-platform/core/styled";
import { Theme, UnknownThemeProp } from "@intellij-platform/core/Theme";
import { StyledDefaultTab } from "@intellij-platform/core/Tabs/StyledDefaultTab";
import {
  getTabThemeStyles,
  TabTheme,
} from "@intellij-platform/core/Tabs/TabTheme";

export const editorTabTheme = ({ theme }: { theme: Theme }): TabTheme => ({
  borderColor: theme.color("EditorTabs.borderColor"),
  underlineHeight: theme.value<number>("EditorTabs.underlineHeight"),
  background: theme.color("EditorTabs.background" as UnknownThemeProp),
  underlinedTabInactiveBackground: theme.color(
    "EditorTabs.underlinedTabBackground" as UnknownThemeProp // that's correctly not underlinedTabInactiveBackground!
  ), // TODO: use EditorColorsScheme when available
  underlinedTabBackground: theme.color("EditorTabs.underlinedTabBackground"), // TODO: use EditorColorsScheme when available
  hoverInactiveBackground: theme.color(
    "EditorTabs.hoverInactiveBackground" as UnknownThemeProp
  ),
  hoverBackground: theme.color(
    "EditorTabs.hoverBackground" as UnknownThemeProp
  ),
  inactiveUnderlineColor: theme.color(
    "EditorTabs.inactiveUnderlineColor" as UnknownThemeProp
  ), // TODO: use EditorColorsScheme when available
  underlineColor: theme.color("EditorTabs.underlineColor"), // TODO: use EditorColorsScheme when available

  underlinedTabInactiveForeground: theme.color(
    "EditorTabs.underlinedTabForeground" as UnknownThemeProp // that's correctly not underlinedTabInactiveForeground!
  ), // TODO: use EditorColorsScheme when available
  underlinedTabForeground: theme.color(
    "EditorTabs.underlinedTabForeground" as UnknownThemeProp
  ), // TODO: use EditorColorsScheme when available
});
export const StyledEditorTab = styled(StyledDefaultTab)`
  font-size: 0.7rem;
  ${({ theme }) => getTabThemeStyles(editorTabTheme({ theme }))};
`;
