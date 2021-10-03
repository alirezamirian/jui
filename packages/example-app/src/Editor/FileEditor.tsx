import { Monaco } from "@monaco-editor/react";
import { styled } from "jui";
import { editor, languages } from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { LoadingGif } from "../LoadingGif";
import { fileContent } from "../Project/project.state";
import { Editor } from "./Editor";
import { activeEditorTabState } from "./editor.state";

/**
 * Used as main content in the main ToolWindows. Shows currently opened files tabs and the editor.
 */
export const FileEditor = () => {
  const activeTab = useRecoilValue(activeEditorTabState);
  const editorRef = useRef<editor.IEditor>();

  const contentLoadable = useRecoilValueLoadable(
    fileContent(activeTab?.filePath)
  );

  // For now, when the first tab content is changed, we focus the editor.
  // FIXME when action system is implemented and there is an action like "open project file".
  // Note that it's event currently buggy
  useEffect(() => {
    editorRef.current?.focus();
    if (activeTab?.cursorPos) {
      editorRef.current?.setPosition(activeTab?.cursorPos);
    }
  }, [activeTab?.filePath]);

  return (
    <StyledFileEditorContainer>
      {activeTab && (
        <Editor
          height="100%"
          path={activeTab.filePath}
          onMount={(monacoEditor, monaco) => {
            monacoEditor.focus();
            enableJsx(monaco);
            editorRef.current = monacoEditor;
          }}
          value={contentLoadable.valueMaybe()}
        />
      )}
      {contentLoadable.state === "loading" && <FileEditorLoading />}
    </StyledFileEditorContainer>
  );
};

const StyledFileEditorContainer = styled.div`
  position: relative;
  height: 100%;
`;

const FileEditorLoading = styled(LoadingGif)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function enableJsx(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: languages.typescript.JsxEmit.React,
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
}
