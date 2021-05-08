import { addDecorator } from "@storybook/react"; // <- or your storybook framework
// @ts-expect-error missing type definition
import { withThemes } from "storybook-addon-themes/react";
import React from "react";
import "./global-styles.css";
import { ThemeProvider } from "styled-components";
import { Theme } from "../src/Theme/Theme";

const requireTheme = require.context("../themes", false, /\.theme\.json$/);

addDecorator(withThemes);

const themes = requireTheme.keys().map((themeFile) => {
  const themeJson = requireTheme(themeFile);
  return {
    name: themeJson.name,
    theme: new Theme(themeJson),
    color: themeJson.ui?.["*"]?.background,
  };
});

(window as any).themes = themes;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    disable: true,
  },
  themes: {
    default: "Darcula",
    Decorator: Decorator,
    clearable: false,
    list: themes,
  },
};
function Decorator(props: {
  children: React.ReactNode;
  theme: { theme: any };
}) {
  return (
    <ThemeProvider theme={props.theme.theme}>{props.children}</ThemeProvider>
  );
}
