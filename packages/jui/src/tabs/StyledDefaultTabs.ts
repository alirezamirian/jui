import { Theme, UnknownThemeProp } from "../Theme";
import { css, styled } from "../styled";
import { getTabsThemeStyles } from "./TabTheme";

const defaultTabsTheme = ({ theme }: { theme: Theme }) =>
  getTabsThemeStyles({
    borderColor: theme.color(
      "DefaultTabs.borderColor" as UnknownThemeProp,
      theme.commonColors.contrastBorder
    ),
    background: theme.color("DefaultTabs.background"),
  });

const scrollBarDisabledStyle = css`
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    /* for Chrome/Safari/Webkit */
    display: none;
  }
`;

export const StyledDefaultTabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px 0;

  ${scrollBarDisabledStyle};
  ${defaultTabsTheme};
`;
