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
