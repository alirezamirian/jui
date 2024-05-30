/// <reference types="@types/webpack-env" />
// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./shared";

import React, { useEffect } from "react";
import { setProjectAnnotations } from "@storybook/react";
import { mount, MountOptions } from "cypress/react";
import { Theme, ThemeProvider } from "@intellij-platform/core";
import sbPreview from "../../.storybook/preview";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

const requireTheme = require.context("../../themes", false, /\.theme\.json$/);
const themes: Theme[] = requireTheme.keys().map((themeFile: string) => {
  const themeJson = requireTheme(themeFile);
  return new Theme(themeJson);
});

setProjectAnnotations(sbPreview);

const TestThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    // maybe just black and white based on theme.theme.dark?
    document.body.style.background = theme.color("*.background") ?? "";
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Cypress.Commands.add(
  "mount",
  (
    jsx: React.ReactNode,
    options?: MountOptions & { theme?: "Darcula" | "IntelliJ" },
    rerenderKey?: string
  ) => {
    const themeName = options?.theme || "Darcula";
    const theme = themes.find((theme) => theme.name === themeName);
    if (!theme) {
      throw new Error(`Theme ${themeName} not found!`);
    }
    return mount(
      <TestThemeProvider theme={theme}>{jsx}</TestThemeProvider>,
      options,
      rerenderKey
    ).then((result) => ({
      ...result,
      rerender: (jsx: React.ReactNode) =>
        result.rerender(
          <TestThemeProvider theme={theme}>{jsx}</TestThemeProvider>
        ),
    }));
  }
);
