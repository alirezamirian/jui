import { getTabThemeStyles } from "./TabTheme";
import { styled } from "../styled";
import { Theme, UnknownThemeProp } from "../Theme";
import { HTMLProps } from "react";

export interface TabComponentProps extends HTMLProps<HTMLElement> {
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
}

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
      "DefaultTabs.underlinedTabInactiveForeground" as UnknownThemeProp<"DefaultTabs.underlinedTabInactiveForeground">
    ),
    underlinedTabForeground: theme.color("DefaultTabs.underlinedTabForeground"),

    background: theme.color(
      "DefaultTabs.background",
      theme.dark ? "#3C3F41" : "#ECECEC"
    ),
    underlinedTabInactiveBackground: theme.color(
      "DefaultTabs.underlinedTabInactiveBackground" as UnknownThemeProp<"DefaultTabs.underlinedTabInactiveBackground">
    ),
    underlinedTabBackground: theme.color(
      "DefaultTabs.underlinedTabBackground" as UnknownThemeProp<"DefaultTabs.underlinedTabBackground">
    ),
    hoverInactiveBackground: theme.color(
      "DefaultTabs.hoverInactiveBackground" as UnknownThemeProp<"DefaultTabs.hoverInactiveBackground">,
      theme.dark ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.1)"
    ),
    hoverBackground: theme.color(
      "DefaultTabs.hoverBackground",
      theme.dark ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.1)"
    ),
  });

export const StyledDefaultTab = styled.div<TabComponentProps>`
  box-sizing: border-box;
  display: inline-flex;
  letter-spacing: 0.015rem;
  font-size: 0.85rem;
  cursor: default;
  white-space: nowrap;

  // spacing
  padding: 0 0.5rem;
  line-height: 1.7rem; // vertical spacing handled by line-height

  // disabled state doesn't seem to be supported in Intellij Platform at all.
  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};
  color: ${({ theme }) =>
    theme.color(
      "DefaultTabs.foreground" as UnknownThemeProp<"DefaultTabs.foreground">
    )};

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
