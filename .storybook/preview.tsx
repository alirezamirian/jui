import { addDecorator } from "@storybook/react"; // <- or your storybook framework
// @ts-ignore
import { withThemes } from "storybook-addon-themes/react";
import React from "react";
import darculaTheme from "../themes/darcula.theme.json";
import "./global-styles.css";
import { ThemeProvider } from "styled-components";

addDecorator(withThemes);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    disable: true,
  },
  themes: {
    default: "Darcula",
    Decorator: Decorator,
    clearable: false,
    list: [{ name: "Darcula", theme: darculaTheme, color: "#666" }],
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
