import { styled } from "@intellij-platform/core/styled";
import { getTabsThemeStyles } from "@intellij-platform/core/tabs/TabTheme";
import { StyledDefaultTabs } from "@intellij-platform/core/tabs/StyledDefaultTabs";
import { toolWindowTabTheme } from "./StyledToolWindowTab";

export const StyledToolWindowTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(toolWindowTabTheme({ theme }))};
`;
