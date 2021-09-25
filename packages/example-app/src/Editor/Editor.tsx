import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { styled } from "jui";
import React from "react";
import { useEditorTheme } from "./useEditorTheme";

export const StyledEditor = styled(MonacoEditor)`
  .monaco-editor {
    .margin-view-overlays .line-numbers {
      text-align: left;
      padding-left: 7px;
    }
  }
`;
export const Editor = (props: Omit<EditorProps, "theme">) => {
  const editorTheme = useEditorTheme();
  return (
    <StyledEditor
      {...props}
      theme={editorTheme as any} // FIXME
    />
  );
};
