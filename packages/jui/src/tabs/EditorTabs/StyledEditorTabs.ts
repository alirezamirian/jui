import { styled } from "jui/styled";
import { getTabsThemeStyles, StyledDefaultTabs } from "jui/tabs";
import { editorTabTheme } from "./StyledEditorTab";

export const StyledEditorTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
