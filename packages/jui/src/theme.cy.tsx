import * as React from "react";
import { Theme as ThemeKitchenSinkExample } from "./theme.stories";
import darculaJson from "../themes/darcula.theme.json";
import lightThemeJson from "../themes/Light.theme.json";
import lafThemeJson from "../themes/intellijlaf.theme.json";
import highContrastThemeJson from "../themes/HighContrast.theme.json";
import { Theme, ThemeProvider } from "@intellij-platform/core/Theme";

describe("theme", () => {
  it(`matches the expected styles in ${darculaJson.name} theme`, () => {
    testTheme(new Theme(darculaJson as any));
  });
  it(`matches the expected styles in ${lightThemeJson.name} theme`, () => {
    testTheme(new Theme(lightThemeJson as any));
  });
  it(`matches the expected styles in ${lafThemeJson.name} theme`, () => {
    testTheme(new Theme(lafThemeJson as any));
  });
  it(`matches the expected styles in ${highContrastThemeJson.name} theme`, () => {
    testTheme(new Theme(highContrastThemeJson as any));
  });
});

function testTheme(theme: Theme) {
  cy.viewport("macbook-13");
  cy.mount(
    <ThemeProvider theme={theme}>
      <ThemeKitchenSinkExample />
    </ThemeProvider>
  );
  matchImageSnapshot(`theme-${theme.name}`);
}

function matchImageSnapshot(snapshotsName: string) {
  cy.get("[aria-busy=true]", { timeout: 10000 }).should("not.exist");
  cy.percySnapshot(snapshotsName);
}
