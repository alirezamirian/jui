import { styled } from "jui";
import { StyledDefaultTab } from "jui/tabs/StyledDefaultTab";
import { toolWindowTabTheme } from "jui/tabs/ToolWindowTabs/StyledToolWindowTab";

export const StyledToolWindowTabs = styled(StyledDefaultTab)`
  ${({ theme }) => getTabsThemeStyles(toolWindowTabTheme({ theme }))};
`;
