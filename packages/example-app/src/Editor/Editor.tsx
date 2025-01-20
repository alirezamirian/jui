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

    .scrollbar .slider {
      border-radius: 0.25rem;
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
export const Editor: React.FC<Omit<EditorProps, "theme">> = (
  props: Omit<EditorProps, "theme">
) => {
  const editorTheme = useEditorTheme();
  const fontSize = 13;
  return (
    <>
      {editorTheme && (
        <StyledEditor
          {...props}
          options={
            {
              minimap: { enabled: false },
              lineHeight: 22,
              showFoldingControls: "always",
              guides: {
                indentation: true,
              },
              overviewRulerBorder: false,
              fontFamily: "JetBrains Mono",
              fontSize,
              scrollbar: {
                verticalScrollbarSize: 14,
                horizontalScrollbarSize: 8,
                verticalSliderSize: 8,
                horizontalSliderSize: 8,
                horizontal: "auto",
                vertical: "visible",
                alwaysConsumeMouseWheel: false, // to let example-app be rendered as a part of a page.
              },
              ...props.options,
            } as EditorProps["options"]
          }
          theme={editorTheme as any} // FIXME
        />
      )}
    </>
  );
};
