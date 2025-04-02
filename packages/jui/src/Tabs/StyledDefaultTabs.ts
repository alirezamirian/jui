import { HTMLProps } from "react";
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

export interface TabsComponentProps extends HTMLProps<HTMLElement> {
  $noBorders?: boolean;
}

export const StyledDefaultTabs = styled.div<TabsComponentProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-style: solid;
  border-width: ${({ $noBorders }) => ($noBorders ? "0" : "1px 0")};

  ${defaultTabsTheme};
`;
