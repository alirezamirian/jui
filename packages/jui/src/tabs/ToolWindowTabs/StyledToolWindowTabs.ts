import { styled } from "jui/styled";
import { getTabsThemeStyles } from "jui/tabs/TabTheme";
import { StyledDefaultTabs } from "jui/tabs/StyledDefaultTabs";
import { toolWindowTabTheme } from "./StyledToolWindowTab";

export const StyledToolWindowTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(toolWindowTabTheme({ theme }))};
`;
