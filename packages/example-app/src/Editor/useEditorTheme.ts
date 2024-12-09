import { EditorProps, useMonaco } from "@monaco-editor/react";
import { Theme } from "@intellij-platform/core";
import { editor } from "monaco-editor";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "styled-components";

import vsCodeTheme from "../resources/dracula-color-theme.json"; // FIXME: don't read a fixed color scheme

const darculaColorSchemeTokenRules: editor.ITokenThemeRule[] =
  vsCodeTheme.tokenColors.flatMap(({ scope, settings }) =>
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
      const name = `jui-theme-${theme.name.replace(" ", "")}`;
      const bracketColor = theme.dark ? "#dcdcdc" : "#000";
      monaco.editor.defineTheme(name, {
        base: theme.dark ? "vs-dark" : "vs",
        inherit: true,
        // colors and rules should come from color scheme xml files.
        // see platform/platform-resources/src/DefaultColorSchemesManager.xml
        colors: theme.dark
          ? {
              // FIXME: read from color scheme files. List of available keys: https://github.com/microsoft/monaco-editor/issues/1631
              "editor.background": "#2B2B2B",
              "editor.lineHighlightBackground": "#323232",
              "editorLineNumber.foreground": "#606366", // LINE_NUMBERS_COLOR
              "editorActiveLineNumber.foreground": "#a4a3a3", // LINE_NUMBER_ON_CARET_ROW_COLOR
              "editorIndentGuide.background": "#373737", // INDENT_GUIDE
              "editorIndentGuide.activeBackground": "#505050", // SELECTED_INDENT_GUIDE
              "editorGutter.background": theme.dark ? "#313335" : "#f0f0f0",
              "editorBracketHighlight.foreground1": bracketColor,
              "editorBracketHighlight.foreground2": bracketColor,
              "editorBracketHighlight.foreground3": bracketColor,
              "editorBracketHighlight.foreground4": bracketColor,
              "editorBracketMatch.background": "#43454b", // in new UI
              "editorBracketMatch.border": "#00000000", // in new UI
            }
          : {},
        // token rules for syntax highlighting
        rules: darculaColorSchemeTokenRules,
      });
      setThemeName(name);
    }
  }, [monaco, theme]);

  return themeName;
};
