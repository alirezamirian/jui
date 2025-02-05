import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";
import { Theme, ThemeJson, ThemeProvider } from "@intellij-platform/core";

createRoot(document.getElementById("app")!).render(
  <ThemeProvider theme={new Theme(darculaThemeJson as unknown as ThemeJson)}>
    <App />
  </ThemeProvider>
);
