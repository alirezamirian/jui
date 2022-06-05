import React, { useEffect, useMemo } from "react";
import { SSRProvider } from "@react-aria/ssr";
import darculaTheme from "../../../jui/themes/darcula.theme.json";
import highContrastTheme from "../../../jui/themes/HighContrast.theme.json";
import lightTheme from "../../../jui/themes/intellijlaf.theme.json";
import { Theme, ThemeProvider } from "../../../jui/src";

export type ExampleContextThemeName = "light" | "darcula" | "highContrast";

export const ExampleContext: React.FC<{
  themeName?: ExampleContextThemeName;
}> = ({ children, themeName = "darcula" }) => {
  const themeJson = ({
    light: lightTheme,
    highContrast: highContrastTheme,
    darcula: darculaTheme,
  } as const)[themeName];

  // IMPORTANT: passing a function that returns Theme is crucial in get it working. Otherwise, ThemeProvider will try
  // to "merge" themes, and the end result is an POJO, with prototype link lost.
  // @ts-expect-error ThemeJson type is not accurate ATM.
  const theme = useMemo(() => new Theme(themeJson), [themeJson]);

  useFixDocusaurusStyleBleeds();
  return (
    <SSRProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SSRProvider>
  );
};

/**
 * TODO: add a surrounding UI for examples, with tools for theme selection for example.
 */
export const Example: React.FC = ({ children }) => (
  <ExampleContext>
    <div
      // @ts-expect-error: css prop is not working for some reason
      css={`
        background: ${({ theme }) => theme.color("*.background")};
      `}
    >
      {children}
    </div>
  </ExampleContext>
);

export const withExampleContext = <P extends {}>(
  Component: React.ComponentType<P>
) => {
  function WithExampleContext(props: P) {
    return (
      <ExampleContext>
        <Component {...props} />
      </ExampleContext>
    );
  }

  return WithExampleContext;
};

const useFixDocusaurusStyleBleeds = () => {
  useEffect(() => {
    const FLAG_CLASSNAME = "example-context-patch";
    if (!document.body.classList.contains(FLAG_CLASSNAME)) {
      try {
        undoUseKeyboardNavigation();
        document.body.classList.add(FLAG_CLASSNAME);
      } catch (e) {
        console.error("Could not undo useKeyboardNavigation");
      }
    }
  }, []);
};

/**
 * Reverts the "improvement" [useKeyboardNavigation][1] does :|
 *
 * [1]: https://github.com/facebook/docusaurus/blob/f87a3ead4664b301901c12466cb2c82cd95d141b/packages/docusaurus-theme-common/src/hooks/useKeyboardNavigation.ts#L14
 */
function undoUseKeyboardNavigation() {
  document
    .querySelectorAll<HTMLLinkElement>("link[rel=stylesheet]")
    .forEach((linkEl) => {
      for (let i = 0; i < linkEl.sheet.cssRules.length; i++) {
        const rule = linkEl.sheet.cssRules.item(i);
        if (rule.cssText?.startsWith("body:not(.navigation-with-keyboard)")) {
          linkEl.sheet.deleteRule(i); // We can change the rule to only disable it within the boundary of example
        }
      }
    });
}
