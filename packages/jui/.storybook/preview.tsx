import React, { useEffect } from "react";
// @ts-expect-error missing type definition
import { withThemes } from "storybook-addon-themes/react";
import { Theme, ThemeProvider } from "../src/Theme";

const requireTheme = require.context("../themes", false, /\.theme\.json$/);

const themes = requireTheme.keys().map((themeFile: string) => {
  const themeJson = requireTheme(themeFile);
  return {
    name: themeJson.name,
    theme: new Theme(themeJson),
    color: themeJson.ui?.["*"]?.background,
  };
});

export const decorators = [withThemes];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    disable: true,
  },
  themes: {
    default: "Darcula",
    Decorator,
    clearable: false,
    list: themes,
  },
};

function Decorator(props: {
  children: React.ReactNode;
  theme: { theme: Theme };
}) {
  useEffect(() => {
    // maybe just black and white based on theme.theme.dark?
    document.body.style.background =
      props.theme.theme.color("*.background") ?? "";
  });
  return (
    <ThemeProvider theme={props.theme.theme}>{props.children}</ThemeProvider>
  );
}
