import React, { type ReactNode, useMemo } from "react";
import DocItem from "@theme-original/DocItem";
import type DocItemType from "@theme/DocItem";
import type { WrapperProps } from "@docusaurus/types";
import { Theme, ThemeProvider } from "@intellij-platform/core";
import darculaTheme from "@intellij-platform/core/themes/darcula.theme.json";
import lafLightTheme from "@intellij-platform/core/themes/intellijlaf.theme.json";

type Props = WrapperProps<typeof DocItemType>;

export default function DocItemWrapper(props: Props): ReactNode {
  const colorMode = "Dark"; // useColorMode(); // FIXME: currently it throws an error about not being called inside ...
  const theme = useMemo(
    () => new Theme(colorMode === "Dark" ? darculaTheme : lafLightTheme),
    [colorMode]
  );
  return (
    <>
      {/*TODO: keep theme in sync with docusaurus dark/light theme*/}
      <ThemeProvider theme={theme}>
        <DocItem {...props} />
      </ThemeProvider>
    </>
  );
}
