import { Theme } from "@intellij-platform/core/Theme";
import { styled } from "@intellij-platform/core/styled";

import { StyledDefaultTab } from "@intellij-platform/core/tabs/StyledDefaultTab";
import {
  getTabThemeStyles,
  TabTheme,
} from "@intellij-platform/core/tabs/TabTheme";

export const debuggerTabTheme = ({ theme }: { theme: Theme }): TabTheme => ({
  underlineHeight: theme.value<number>("DebuggerTabs.underlineHeight") ?? 2,
  underlinedTabBackground: theme.color("DebuggerTabs.underlinedTabBackground"),
});
export const StyledDebuggerTab = styled(StyledDefaultTab)`
  ${({ theme }) => getTabThemeStyles(debuggerTabTheme({ theme }))};
`;
