import DocPage from "@theme-original/DocPage";
// import { useColorMode } from "@docusaurus/theme-common";
import React, { useMemo } from "react";
import { Theme, ThemeProvider } from "../../../../jui/src/Theme";
import darculaTheme from "../../../../jui/themes/darcula.theme.json";
import lafLightTheme from "../../../../jui/themes/intellijlaf.theme.json";

export default function DocPageWrapper(props) {
  const colorMode = "Dark"; // useColorMode(); // FIXME: currently it throws an error about not being called inside ...
  const theme = useMemo(
    () => new Theme(colorMode === "Dark" ? darculaTheme : lafLightTheme),
    [colorMode]
  );
  return (
    <>
      {/*TODO: keep theme in sync with docusaurus dark/light theme*/}
      <ThemeProvider theme={theme}>
        <DocPage {...props} />
      </ThemeProvider>
    </>
  );
}
