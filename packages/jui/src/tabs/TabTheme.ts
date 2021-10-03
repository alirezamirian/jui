import { css } from "jui";
import { StyledTabProps } from "jui/tabs/StyledDefaultTab";

/**
 * Describes theme-able properties of a tab, which can then be passed to {@link getTabThemeStyles}
 */
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
}: TabTheme) => {
  return css<StyledTabProps>`
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
