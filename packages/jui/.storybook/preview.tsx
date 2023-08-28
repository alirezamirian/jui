import React, { useEffect } from "react";
import { Theme, ThemeProvider } from "../src/Theme";
import {
  withThemeProvider,
  ThemeConfigType,
} from "storybook-addon-theme-provider";

const requireTheme = require.context("../themes", false, /\.theme\.json$/);
const DEFAULT_THEME_NAME = "Darcula";

const themes = (requireTheme.keys() as Array<string>).map(
  (themeFile: string): ThemeConfigType => {
    const themeJson = requireTheme(themeFile);
    return {
      name: themeJson.name,
      themeObject: new Theme(themeJson) as any,
      color: themeJson.ui?.["*"]?.background,
    };
  }
);

export default {
  decorators: [withThemeProvider(StoryThemeProvider)],
  globals: {
    selectedTheme: DEFAULT_THEME_NAME,
    themes,
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      disable: true,
    },
  },
};

function StoryThemeProvider(props: {
  children?: React.ReactNode;
  theme?: unknown;
}) {
  const theme =
    (props.theme as Theme) ||
    themes.find(({ name }) => name === DEFAULT_THEME_NAME)?.themeObject;
  useEffect(() => {
    // maybe just black and white based on theme.theme.dark?
    document.body.style.background = theme.color("*.background") ?? "";
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
