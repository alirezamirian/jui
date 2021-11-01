import { styled } from "jui/styled";
import { getTabsThemeStyles, StyledDefaultTabs } from "jui/tabs";
import { toolWindowTabTheme } from "./StyledToolWindowTab";

export const StyledToolWindowTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(toolWindowTabTheme({ theme }))};
`;
