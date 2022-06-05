import { createGlobalStyle, css, ThemeContext } from "styled-components";
import { Theme } from "./Theme";
import React, { CSSProperties, ReactNode } from "react";

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
  /**
   * Global style options. Those, in addition to a few de-facto standard style normalization rules will be applied to
   * the body, unless, `false` is passed for the value. In that case, you should render a custom wrapper that
   * implements the necessary styles:
   * ```ts
   * import { FontStyles } from '@intellij-platform/core';
   *
   * const MyWrapper = styled.div`
   *   ${FontStyles};
   * `;
   *
   * <ThemeProvider>
   *    <MyWrapper>
   *      <App />
   *    </MyWrapper>
   * </ThemeProvider>
   * ```
   * @default true
   */
  globalStyles?: false | FontStyleOptions;
}

type FontStyleOptions = Pick<CSSProperties, "fontFamily" | "fontSize">;

/**
 * Font styles to be applied on a wrapper for the whole app. All components rely on this to be used on either body
 * or a top level wrapper.
 * **You don't need to use this** unless {@link ThemeProviderProps#globalStyles} is set to false.
 */
export const FontStyles = css<FontStyleOptions>`
  font-family: ${({ fontFamily = "system-ui" }) => fontFamily};
  font-size: ${({ fontSize = "13px" }) => fontSize};
`;

const GlobalStyles = createGlobalStyle<FontStyleOptions>`
  body {
    ${FontStyles};
    margin: 0;
    text-rendering: optimizeLegibility;
  }
`;

/**
 * Similar to styled-component's [ThemeProvider][1], provides [ThemeContext][2]. With a few additions and nuances:
 *
 * - It also provides the default font styles (overridable via props), as well as a minimal normalization style on
 *   `body`. Global styles can be disabled via {@link ThemeProviderProps#globalStyles}, if needed.
 * - Unlike styled-component's `ThemeProvider`, it doesn't [merge][3] nested themes, into a plain object. That's
 *   important, because a theme must be an instance of {@link Theme} class.
 *
 * [1]: https://styled-components.com/docs/api#themeprovider
 * [2]: https://styled-components.com/docs/advanced#via-usecontext-react-hook
 * [3]: https://github.com/styled-components/styled-components/blob/86d40770d35cfa359748998628182af35aa8983b/packages/styled-components/src/models/ThemeProvider.tsx#L75
 */
export const ThemeProvider = ({
  theme,
  children,
  globalStyles = {},
}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>
      {globalStyles !== false && <GlobalStyles {...globalStyles} />}
      {children}
    </ThemeContext.Provider>
  );
};
