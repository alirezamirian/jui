import { styled, Theme } from "jui";
import {
  getTabThemeStyles,
  StyledDefaultTab,
  TabTheme,
} from "jui/tabs/StyledDefaultTab";

export const debuggerTabTheme = ({ theme }: { theme: Theme }): TabTheme => ({
  underlineHeight: theme.value<number>("DebuggerTabs.underlineHeight") ?? 2,
  underlinedTabBackground: theme.color("DebuggerTabs.underlinedTabBackground"),
});
export const StyledDebuggerTab = styled(StyledDefaultTab)`
  ${({ theme }) => getTabThemeStyles(debuggerTabTheme({ theme }))};
`;
