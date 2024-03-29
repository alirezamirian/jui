import { Theme } from "../Theme";
import { styled } from "@intellij-platform/core/styled";
import { getTabsThemeStyles } from "./TabTheme";

const defaultTabsTheme = ({ theme }: { theme: Theme }) =>
  getTabsThemeStyles({
    borderColor: theme.color(
      "DefaultTabs.borderColor",
      theme.commonColors.contrastBorder
    ),
    background: theme.color("DefaultTabs.background"),
  });

export const StyledDefaultTabs = styled.div<{ noBorders?: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-style: solid;
  border-width: ${({ noBorders }) => (noBorders ? "0" : "1px 0")};

  ${defaultTabsTheme};
`;
