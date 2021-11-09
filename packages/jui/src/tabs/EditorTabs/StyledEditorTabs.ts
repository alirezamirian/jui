import { styled } from "jui/styled";
import { getTabsThemeStyles } from "jui/tabs/TabTheme";
import { StyledDefaultTabs } from "jui/tabs/StyledDefaultTabs";
import { editorTabTheme } from "./StyledEditorTab";

export const StyledEditorTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
