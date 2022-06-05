import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";
import { ThemeProvider } from "styled-components";
import { Theme } from "@intellij-platform/core";

ReactDOM.render(
  <ThemeProvider theme={new Theme(darculaThemeJson)}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
