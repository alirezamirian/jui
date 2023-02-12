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

import "@percy/cypress";
import "cypress-real-events/support";
import "./commands";

import React, { useEffect } from "react";
import { setGlobalConfig } from "@storybook/testing-react";
import { mount, MountOptions } from "cypress/react";
import { Theme, ThemeProvider } from "@intellij-platform/core";
import * as sbPreview from "../../.storybook/preview";
const requireTheme = require.context("../../themes", false, /\.theme\.json$/);
const themes = requireTheme.keys().map((themeFile: string) => {
  const themeJson = requireTheme(themeFile);
  return new Theme(themeJson);
});

setGlobalConfig(sbPreview);

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

const originalDispatchEvent = window.dispatchEvent;

Cypress.Screenshot.defaults({
  onBeforeScreenshot: () => {
    window.dispatchEvent = (e) => {
      console.log(
        "Ignored event dispatched during snapshot testing. That's to prevent overlays from getting closed on scroll event",
        e
      );
      return false;
    };
  },
  onAfterScreenshot: () => {
    window.dispatchEvent = originalDispatchEvent;
  },
});

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
    );
  }
);
