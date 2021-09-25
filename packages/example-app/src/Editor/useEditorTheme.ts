import { EditorProps, useMonaco } from "@monaco-editor/react";
import { Theme } from "jui";
import { editor } from "monaco-editor";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "styled-components";

import vsCodeTheme from "../resources/dracula-color-theme.json"; // FIXME: don't read a fixed color scheme

const darculaColorSchemeTokenRules: editor.ITokenThemeRule[] = vsCodeTheme.tokenColors.flatMap(
  ({ scope, settings }) =>
    ([] as string[])
      .concat(scope)
      .flatMap((scope) => scope.split(" "))
      .map((token) => {
        const values: editor.ITokenThemeRule = {
          token,
        };
        Object.keys(settings).forEach((key) => {
          const value = settings[key as keyof typeof settings];
          if (value) {
            values[key as keyof typeof settings] = value;
          }
        });
        return values;
      })
);

export const useEditorTheme = () => {
  const monaco = useMonaco();
  const theme = useTheme() as Theme;
  const [themeName, setThemeName] = useState<EditorProps["theme"]>(
    theme.dark ? "vs-dark" : "light"
  );
  useLayoutEffect(() => {
    if (monaco) {
      const name = `jui-theme-${theme.name}`;
      monaco.editor.defineTheme(name, {
        base: "vs-dark",
        inherit: true,
        // colors and rules should come from color scheme xml files.
        // see platform/platform-resources/src/DefaultColorSchemesManager.xml
        colors: {
          "editor.background": "#2B2B2B",
          "editor.lineHighlightBackground": "#323232",
          "editor.lineHighlightBorder": "none",
          "editorLineNumber.foreground": "#606366", // LINE_NUMBERS_COLOR
          "editorActiveLineNumber.foreground": "#a4a3a3", // LINE_NUMBER_ON_CARET_ROW_COLOR
          "editorIndentGuide.background": "#373737", // INDENT_GUIDE
          "editorIndentGuide.activeBackground": "#505050", // SELECTED_INDENT_GUIDE
          "editorGutter.background": theme.dark ? "#313335" : "#f0f0f0",
        },
        // token rules for syntax highlighting
        rules: darculaColorSchemeTokenRules,
      });
      setThemeName(name);
    }
  }, [monaco, theme]);

  return themeName;
};
