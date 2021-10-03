import { Theme, UnknownThemeProp } from "../Theme";
import { styled } from "../styled";
import { getTabsThemeStyles } from "./TabTheme";

const defaultTabsTheme = ({ theme }: { theme: Theme }) =>
  getTabsThemeStyles({
    borderColor: theme.color(
      "DefaultTabs.borderColor" as UnknownThemeProp,
      theme.commonColors.contrastBorder
    ),
    background: theme.color("DefaultTabs.background"),
  });

export const StyledDefaultTabs = styled.div`
  display: flex;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px 0;

  ${defaultTabsTheme}
`;
