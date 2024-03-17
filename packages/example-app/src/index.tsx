import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";
import { Theme, ThemeJson, ThemeProvider } from "@intellij-platform/core";

ReactDOM.render(
  <ThemeProvider theme={new Theme(darculaThemeJson as unknown as ThemeJson)}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
