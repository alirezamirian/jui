import { styled } from "jui";
import { getTabsThemeStyles } from "jui/tabs";
import { StyledDefaultTabs } from "jui/tabs/StyledDefaultTabs";
import { toolWindowTabTheme } from "jui/tabs/ToolWindowTabs/StyledToolWindowTab";

export const StyledToolWindowTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(toolWindowTabTheme({ theme }))};
`;
