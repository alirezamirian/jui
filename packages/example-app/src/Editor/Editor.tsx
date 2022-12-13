import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { styled } from "@intellij-platform/core";
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
/**
 * Monaco Editor styled to look like Intellij Platform's editor.
 * TODO:
 *  - folding controls appearance is different and should be changed
 *  - highlighting pairs of parens, brackets, etc. is different.
 *  - context menu look different.
 *  - selection look different.
 *  - BUG: height is more than necessary. Needs investigation first.
 */
export const Editor = (props: Omit<EditorProps, "theme">) => {
  const editorTheme = useEditorTheme();
  return (
    <StyledEditor
      {...props}
      options={{
        minimap: { enabled: false },
        lineHeight: 20,
        showFoldingControls: "always",
        renderIndentGuides: true,
        scrollbar: {
          verticalScrollbarSize: 10,
          verticalSliderSize: 7,
          alwaysConsumeMouseWheel: false, // to let example-app be rendered as a part of a page.
        },
        ...props.options,
      }}
      theme={editorTheme as any} // FIXME
    />
  );
};
