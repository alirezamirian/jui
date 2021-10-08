import { styled } from "jui";
import { editorTabTheme } from "jui/tabs/EditorTabs/StyledEditorTab";
import { StyledDefaultTabs } from "jui/tabs/StyledDefaultTabs";
import { getTabsThemeStyles } from "jui/tabs/TabTheme";

export const StyledEditorTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
