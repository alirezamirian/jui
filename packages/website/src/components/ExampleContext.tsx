import React from "react";
import { ThemeProvider } from "styled-components";
import { SSRProvider } from "@react-aria/ssr";
import themeJson from "../../../jui/themes/darcula.theme.json";
import { Theme } from "../../../jui/src";

export const ExampleContext: React.FC = ({ children }) => (
  <SSRProvider>
    <ThemeProvider theme={new Theme(themeJson)}>{children}</ThemeProvider>
  </SSRProvider>
);

/**
 * TODO: add a surrounding UI for examples, with tools for theme selection for example.
 */
export const Example: React.FC = ({ children }) => (
  <ExampleContext>
    <div
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
