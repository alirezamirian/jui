import { Monaco } from "@monaco-editor/react";
import { MenuItemLayout, PlatformIcon, styled } from "jui";
import { EditorTabs, TabItem } from "jui/tabs";
import { EditorTabContent } from "jui/tabs/EditorTabs";
import { useLatest } from "jui/utils/useLatest";
import { editor, languages } from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { getFilename, getIconForFile } from "../file-utils";
import { LoadingGif } from "../LoadingGif";
import { fileContent } from "../Project/project.state";
import { Editor } from "./Editor";
import {
  activeEditorTabState,
  editorRefState,
  useEditorStateManager,
} from "./editor.state";

/**
 * Used as main content in the main ToolWindows. Shows currently opened files tabs and the editor.
 *
 * TODO: preserve editor state when switching between tabs
 * TODO: support multiple editors in split view.
 */
export const FileEditor = () => {
  const { tabs, closePath, select: selectTab } = useEditorStateManager();
  const activeTab = useRecoilValue(activeEditorTabState);
  const editorRef = useRef<editor.IEditor>();
  const [active, setActive] = useState(false);

  // For functions that are needed in tab action callbacks. Because items are cached and referencing anything
  // other than the collection item (tab) itself has a risk of working with stale data because of the caching
  // More info: https://react-spectrum.adobe.com/react-stately/collections.html#why-not-array-map
  // We can alternatively switch to mapping over tabs array, instead of using the Collection's dynamic api (items),
  // which is subject to this caching.
  const tabActionsRef = useLatest({ closePath });

  const setEditorRef = useSetRecoilState(editorRefState);

  const contentLoadable = useRecoilValueLoadable(
    fileContent(activeTab?.filePath)
  );

  // For now, when the first tab content is changed, we focus the editor.
  // FIXME when action system is implemented and there is an action like "open project file".
  // Note that it's event currently buggy
  useEffect(() => {
    editorRef.current?.focus();
    if (activeTab?.editorState.cursorPos) {
      editorRef.current?.setPosition(activeTab?.editorState.cursorPos);
    }
  }, [activeTab?.filePath]);

  return (
    <StyledFileEditorContainer
      onFocus={() => {
        setActive(true);
        setEditorRef({
          focus: () => editorRef.current?.focus(),
        });
      }}
      onBlur={() => {
        setActive(false);
      }}
    >
      {tabs.length > 0 && (
        <EditorTabs
          items={tabs}
          active={active}
          selectedKey={activeTab?.filePath}
          onSelectionChange={(key) =>
            selectTab(tabs.findIndex((tab) => tab.filePath === key))
          }
          noBorders
        >
          {(tab) => {
            const filename = getFilename(tab.filePath);
            const icon = <PlatformIcon icon={getIconForFile(tab.filePath)} />;
            return (
              <TabItem
                key={tab.filePath}
                textValue={filename}
                inOverflowMenu={
                  <MenuItemLayout content={filename} icon={icon} />
                }
              >
                <EditorTabContent
                  icon={icon}
                  title={filename}
                  onClose={() => {
                    tabActionsRef.current.closePath(tab.filePath);
                  }}
                />
              </TabItem>
            );
          }}
        </EditorTabs>
      )}
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
  background: ${({ theme }) =>
    theme.color(
      "Editor.background",
      theme.isUnderDarcula()
        ? "rgb(40,40,40)"
        : theme.commonColors.panelBackground // FIXME: ColorUtil.darker(theme.commonColors.panelBackground, 3)
    )};
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
