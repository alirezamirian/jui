import { styled } from "@intellij-platform/core/styled";
import { getTabsThemeStyles } from "@intellij-platform/core/tabs/TabTheme";
import { StyledDefaultTabs } from "@intellij-platform/core/tabs/StyledDefaultTabs";
import { editorTabTheme } from "./StyledEditorTab";

export const StyledEditorTabs = styled(StyledDefaultTabs)`
  ${({ theme }) => getTabsThemeStyles(editorTabTheme({ theme }))};
`;
