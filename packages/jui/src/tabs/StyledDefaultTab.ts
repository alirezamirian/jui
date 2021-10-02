import { css, styled } from "../styled";
import { Theme, UnknownThemeProp } from "../Theme";

export interface TabTheme {
  underlineHeight?: number;

  inactiveUnderlineColor?: string;
  underlineColor?: string;

  underlinedTabInactiveForeground?: string;
  underlinedTabForeground?: string;

  background?: string;
  underlinedTabBackground?: string;
  underlinedTabInactiveBackground?: string;
  hoverInactiveBackground?: string;
  hoverBackground?: string;
  inactiveColoredTabBackground?: string; // not used for now
}

type Props = {
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
};

export const getTabThemeStyles = ({
  underlineHeight,

  background,
  underlinedTabBackground,
  underlinedTabInactiveBackground,
  hoverInactiveBackground,
  hoverBackground,

  underlinedTabForeground,
  underlinedTabInactiveForeground,

  inactiveUnderlineColor,
  underlineColor,
}: TabTheme) => {
  return css<Props>`
    // active indicator
    &::after {
      height: ${underlineHeight != null ? `${underlineHeight}px` : undefined};
      background-color: ${({ selected }) => selected && inactiveUnderlineColor};
      background-color: ${({ selected, active }) =>
        selected && active && underlineColor};
    }

    // foreground rules
    color: ${({ selected }) => selected && underlinedTabInactiveForeground};
    color: ${({ selected, active }) =>
      selected && active && underlinedTabForeground};

    //  background rules
    background: ${background};
    background: ${({ selected }) =>
      selected && underlinedTabInactiveBackground};
    background: ${({ selected, active }) =>
      selected && active && underlinedTabBackground};

    ${({ disabled, active }) =>
      !disabled &&
      css`
      &:hover {
        background: ${hoverInactiveBackground};
        background: ${active && hoverBackground}
    `}
  `;
};

const defaultTabTheme = ({ theme }: { theme: Theme }) =>
  getTabThemeStyles({
    underlineHeight: theme.value<number>("DefaultTabs.underlineHeight") ?? 3,
    inactiveUnderlineColor: theme.color(
      "DefaultTabs.inactiveUnderlineColor",
      theme.dark ? "#747a80" : "#9ca7b8"
    ),
    underlineColor: theme.color(
      "DefaultTabs.underlineColor",
      theme.dark ? "#4A88C7" : "#4083C9"
    ),

    underlinedTabInactiveForeground: theme.color(
      "DefaultTabs.underlinedTabInactiveForeground" as UnknownThemeProp
    ),
    underlinedTabForeground: theme.color(
      "DefaultTabs.underlinedTabForeground" as UnknownThemeProp
    ),

    background: theme.color(
      "DefaultTabs.background",
      theme.dark ? "#3C3F41" : "#ECECEC"
    ),
    underlinedTabInactiveBackground: theme.color(
      "DefaultTabs.underlinedTabInactiveBackground" as UnknownThemeProp
    ),
    underlinedTabBackground: theme.color(
      "DefaultTabs.underlinedTabBackground" as UnknownThemeProp
    ),
    hoverInactiveBackground: theme.color(
      "DefaultTabs.hoverInactiveBackground" as UnknownThemeProp,
      theme.dark ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.1)"
    ),
    hoverBackground: theme.color(
      "DefaultTabs.hoverBackground",
      theme.dark ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.1)"
    ),
  });

export const StyledDefaultTab = styled.div<Props>`
  box-sizing: border-box;
  font-size: 0.73rem;
  cursor: default;

  // spacing
  padding: 0 0.5rem;
  line-height: 1.7rem; // vertical spacing handled by line-height

  // disabled state doesn't seem to be supported in Intellij Platform at all.
  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};
  color: ${({ theme }) =>
    theme.color("DefaultTabs.foreground" as UnknownThemeProp)};

  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  ${defaultTabTheme};
`;
