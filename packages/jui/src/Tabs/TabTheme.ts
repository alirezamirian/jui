import { css } from "@intellij-platform/core/styled";
import { TabComponentProps } from "./StyledDefaultTab";

/**
 * Describes theme-able properties of a tab, which can then be passed to {@link getTabThemeStyles}
 */
export interface TabTheme {
  underlineHeight?: number;

  borderColor?: string;

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

export const getTabsThemeStyles = ({
  background,
  borderColor,
}: Pick<TabTheme, "background" | "borderColor">) => css`
  border-color: ${borderColor};
  background: ${background};
`;

/**
 * Converts tab theme properties to a chunk of style that can be dropped in a styled version of StyledDefaultTab
 *
 * @example
 * ```ts
 * const StyledCustomTab = styled(StyledDefaultTab)`
 *   ${getTabThemeStyles({background: 'red'})}
 * `
 * ```
 */
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
}: TabTheme) =>
  css<TabComponentProps>`
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
        &:hover,
        &.hover /* for testing purposes */ {
          background: ${hoverInactiveBackground};
          background: ${active && hoverBackground};
        }
      `}
  `;
