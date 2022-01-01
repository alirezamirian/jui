import { styled } from "@intellij-platform/core/styled";
import { getTabsThemeStyles } from "@intellij-platform/core/Tabs/TabTheme";
import { StyledDefaultTabs } from "@intellij-platform/core/Tabs/StyledDefaultTabs";
import { editorTabTheme } from "./StyledEditorTab";

export const StyledEditorTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
