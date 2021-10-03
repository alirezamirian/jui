import { styled } from "jui";
import { editorTabTheme } from "jui/tabs/EditorTabs/StyledEditorTab";
import { StyledDefaultTab } from "jui/tabs/StyledDefaultTab";
import { getTabsThemeStyles } from "jui/tabs/TabTheme";

export const StyledEditorTabs = styled(StyledDefaultTab)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
