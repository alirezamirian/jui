import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { SSRProvider } from "@react-aria/ssr";
import darculaTheme from "../../../jui/themes/darcula.theme.json";
import highContrastTheme from "../../../jui/themes/HighContrast.theme.json";
import lightTheme from "../../../jui/themes/intellijlaf.theme.json";
import { Theme } from "../../../jui/src";
import styles from "./example-container-styles.module.css";

export type ExampleContextThemeName = "light" | "darcula" | "highContrast";

export const ExampleContext: React.FC<{
  themeName?: ExampleContextThemeName;
}> = ({ children, themeName = "darcula" }) => {
  const themeJson = ({
    light: lightTheme,
    highContrast: highContrastTheme,
    darcula: darculaTheme,
  } as const)[themeName];

  // @ts-expect-error ThemeJson type is not accurate ATM
  const theme = useMemo(() => new Theme(themeJson), [themeJson]);
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
      className={styles.exampleContainer}
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
