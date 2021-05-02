import { addDecorator } from "@storybook/react"; // <- or your storybook framework
// @ts-ignore
import { withThemes } from "storybook-addon-themes/react";
import React from "react";
import "./global-styles.css";
import { ThemeProvider } from "styled-components";
import { createTheme } from "../src/Theme/createTheme";

const requireTheme = require.context("../themes", false, /\.theme\.json$/);

addDecorator(withThemes);

const themes = requireTheme.keys().map((themeFile) => {
  const themeJson = requireTheme(themeFile);
  return {
    name: themeJson.name,
    theme: createTheme(themeJson),
    color: themeJson.ui?.["*"]?.background,
  };
});

console.log(themes);

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
