import { Monaco } from "@monaco-editor/react";
import {
  ActionTooltip,
  ContextMenuContainer,
  EditorTabContent,
  EditorTabs,
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  styled,
  TabCloseButton,
  TabItem,
  TooltipTrigger,
  useLatest,
} from "@intellij-platform/core";
import { editor, languages } from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { getIconForFile } from "../file-utils";
import { LoadingGif } from "../LoadingGif";
import { Editor } from "./Editor";
import {
  activeEditorTabState,
  editorCursorPositionState,
  editorRefState,
  useEditorStateManager,
} from "./editor.state";
import { fileContent } from "../fs/fs.state";
import { useUpdateFileStatus } from "../VersionControl/file-status.state";
import * as path from "path";
import { FileStatusColor } from "../VersionControl/FileStatusColor";
import { useAction } from "@intellij-platform/core/ActionSystem";

/**
 * Used as main content in the main ToolWindows. Shows currently opened files tabs and the editor.
 *
 * TODO: preserve editor state when switching between tabs
 * TODO: support multiple editors in split view.
 */
export const FileEditor = () => {
  const editorStateManager = useEditorStateManager();
  const activeTab = useRecoilValue(activeEditorTabState);
  const editorRef = useRef<editor.IEditor>();
  const [active, setActive] = useState(false);
  const hideAllAction = useAction("HideAllWindows");
  const setCursorPositionState = useSetRecoilState(editorCursorPositionState);

  // For functions that are needed in tab action callbacks. Because items are cached and referencing anything
  // other than the collection item (tab) itself has a risk of working with stale data because of the caching
  // More info: https://react-spectrum.adobe.com/react-stately/collections.html#why-not-array-map
  // We can alternatively switch to mapping over tabs array, instead of using the Collection's dynamic api (items),
  // which is subject to this caching.
  const tabActionsRef = useLatest({
    closePath: editorStateManager.closePath,
    closeOthersTabs: editorStateManager.closeOthersTabs,
  });

  const setEditorRef = useSetRecoilState(editorRefState);

  const fileContentState = fileContent(activeTab?.filePath);
  const contentLoadable = useRecoilValueLoadable(fileContentState);
  const setContent = useSetRecoilState(fileContentState);
  const updateFileStatus = useUpdateFileStatus();

  const updateContent = (newContent: string = "") => {
    setActive(false);
    setContent(newContent);
    updateFileStatus(activeTab.filePath).catch((e) => {
      console.error("Could not update file status", e);
    });
  };

  // For now, when the first tab content is changed, we focus the editor.
  // FIXME when action system is implemented and there is an action like "open project file".
  // Note that it's event currently buggy
  useEffect(() => {
    editorRef.current?.focus();
    if (activeTab?.editorState.cursorPos) {
      editorRef.current?.setPosition(activeTab?.editorState.cursorPos);
    }
  }, [activeTab?.filePath]);

  const content = contentLoadable.valueMaybe();

  return (
    <StyledFileEditorContainer
      onFocus={() => {
        setActive(true);
        setEditorRef({
          focus: () => editorRef.current?.focus(),
        });
      }}
    >
      {editorStateManager.tabs.length > 0 && (
        <ContextMenuContainer
          renderMenu={() => (
            <Menu
              onAction={() => {
                // TODO: detect which tab was triggering context menu and handle the action accordingly
                //  One idea is to use use the data-key attribute, from the closes parent that has one. Maybe a
                //  CollectionContextMenuContainer component which implements that, while ContextMenuContainer is
                //  modified to pass the MouseEvent object, in renderMenu.
                alert("not implemented!");
              }}
            >
              <Item key="close">Close</Item>
              <Item key="closeOthers">Close Other tabs</Item>
              <Item key="closeAll">Close all tabs</Item>
              <Item key="closeLeft">Close tabs to the left</Item>
              <Item key="closeRight">Close tabs to the right</Item>
            </Menu>
          )}
        >
          <EditorTabs
            items={editorStateManager.tabs}
            active={active}
            selectedKey={activeTab?.filePath}
            onSelectionChange={(key) =>
              editorStateManager.select(
                editorStateManager.tabs.findIndex((tab) => tab.filePath === key)
              )
            }
            noBorders
          >
            {(tab) => {
              const filename = path.basename(tab.filePath);
              const icon = <PlatformIcon icon={getIconForFile(tab.filePath)} />;
              return (
                <TabItem
                  key={tab.filePath}
                  textValue={filename}
                  inOverflowMenu={
                    <MenuItemLayout content={filename} icon={icon} />
                  }
                >
                  <TooltipTrigger
                    tooltip={<ActionTooltip actionName={tab.filePath} />}
                  >
                    <EditorTabContent
                      icon={icon}
                      title={
                        <FileStatusColor filepath={tab.filePath}>
                          {filename}
                        </FileStatusColor>
                      }
                      closeButton={
                        <TooltipTrigger
                          tooltip={
                            <ActionTooltip actionName="Close. Alt-Click to Close Others" />
                          }
                        >
                          <TabCloseButton
                            onPress={(e) => {
                              if (e.altKey) {
                                tabActionsRef.current.closeOthersTabs(
                                  editorStateManager.tabs.indexOf(tab)
                                );
                              } else {
                                tabActionsRef.current.closePath(tab.filePath);
                              }
                            }}
                          />
                        </TooltipTrigger>
                      }
                      containerProps={{
                        onDoubleClick: () => {
                          hideAllAction?.actionPerformed();
                        },
                      }}
                    />
                  </TooltipTrigger>
                </TabItem>
              );
            }}
          </EditorTabs>
        </ContextMenuContainer>
      )}
      {activeTab &&
        (typeof content === "string" ? (
          <Editor
            height="100%"
            path={activeTab.filePath}
            onMount={(monacoEditor, monaco) => {
              monacoEditor.focus();
              enableJsx(monaco);
              editorRef.current = monacoEditor;
              monacoEditor.onDidChangeCursorPosition((e) => {
                setCursorPositionState(e.position);
              });
              monacoEditor.onDidChangeModel(() => {
                const position = editorRef.current?.getPosition();
                if (position) {
                  setCursorPositionState(position);
                }
              });
            }}
            onChange={updateContent}
            value={content}
          />
        ) : (
          content && "UNSUPPORTED CONTENT"
        ))}
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
