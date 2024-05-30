import { Monaco } from "@monaco-editor/react";
import {
  ActionTooltip,
  ContextMenuContainer,
  EditorTabContent,
  EditorTabs,
  HIDE_ALL_WINDOWS_ACTION_ID,
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  styled,
  TabCloseButton,
  TabItem,
  TooltipTrigger,
  useAction,
  useLatest,
} from "@intellij-platform/core";
import { editor, languages } from "monaco-editor";
import React, { useRef, useState } from "react";
import { selector, useSetRecoilState } from "recoil";
import { getIconForFile } from "../file-utils";
import { LoadingGif } from "../LoadingGif";
import { Editor } from "./Editor";
import {
  activeEditorTabState,
  editorCursorPositionState,
  editorRefState,
  useEditorState,
} from "./editor.state";
import { fileContentState } from "../fs/fs.state";
import { useRefreshFileStatus } from "../VersionControl/file-status.state";
import * as path from "path";
import { FileStatusColor } from "../VersionControl/FileStatusColor";
import { mergeProps } from "@react-aria/utils";
import { useActivePathsProvider } from "../Project/project.state";
import { notImplemented } from "../Project/notImplemented";
import { useExistingLatestRecoilValue } from "../recoil-utils";
import { EditorZeroState } from "./EditorZeroState";

const editorFullState = selector({
  key: "editorState",
  get: ({ get }) => {
    const activeEditorTab = get(activeEditorTabState);
    return {
      ...activeEditorTab,
      content: get(fileContentState(activeEditorTab?.filePath)),
    };
  },
});
/**
 * Used as main content in the main ToolWindows. Shows currently opened files tabs and the editor.
 *
 * TODO: preserve editor state when switching between tabs
 * TODO: support multiple editors in split view.
 */
export const FileEditor = () => {
  const [editorTabs, editorStateManager] = useEditorState();
  const editorRef = useRef<editor.ICodeEditor>();
  const [active, setActive] = useState(false);
  const hideAllAction = useAction(HIDE_ALL_WINDOWS_ACTION_ID);
  const setCursorPositionState = useSetRecoilState(editorCursorPositionState);

  const [{ content, filePath }, loadingState] =
    useExistingLatestRecoilValue(editorFullState);

  // For functions that are needed in tab action callbacks. Because items are cached and referencing anything
  // other than the collection item (tab) itself has a risk of working with stale data because of the caching
  // More info: https://react-spectrum.adobe.com/react-stately/collections.html#why-not-array-map
  // We can alternatively switch to mapping over tabs array, instead of using the Collection's dynamic api (items)
  // which is subject to this caching.
  const tabActionsRef = useLatest({
    closePath: editorStateManager.closePath,
    closeOthersTabs: editorStateManager.closeOtherTabs,
  });

  const setEditorRef = useSetRecoilState(editorRefState);

  const setContent = useSetRecoilState(fileContentState(filePath));
  const updateFileStatus = useRefreshFileStatus();

  const updateContent = (newContent: string = "") => {
    setActive(false);
    setContent(newContent);
    if (filePath) {
      updateFileStatus(filePath).catch((e) => {
        console.error("Could not update file status", e);
      });
    }
  };

  // For now, when the first tab content is changed, we focus the editor.
  // FIXME when action system is implemented and there is an action like "open project file".
  // Note that it's event currently buggy

  const activePathsProviderProps = useActivePathsProvider(
    filePath ? [filePath] : []
  );

  return (
    <StyledFileEditorContainer
      {...mergeProps(activePathsProviderProps, {
        onFocus: () => {
          setActive(true);
          setEditorRef({
            focus: () => editorRef.current?.focus(),
          });
        },
      })}
    >
      {editorTabs.length > 0 ? (
        <>
          <ContextMenuContainer
            renderMenu={() => (
              <Menu
                // TODO: detect which tab was triggering context menu and handle the action accordingly
                //  One idea is to use use the data-key attribute, from the closes parent that has one. Maybe a
                //  CollectionContextMenuContainer component which implements that, while ContextMenuContainer is
                //  modified to pass the MouseEvent object, in renderMenu.
                onAction={notImplemented}
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
              items={editorTabs}
              active={active}
              selectedKey={filePath}
              onSelectionChange={(key) => {
                editorStateManager.select(
                  editorTabs.findIndex((tab) => tab.filePath === key)
                );
              }}
              noBorders
            >
              {(tab) => {
                const filename = path.basename(tab.filePath);
                const icon = (
                  <PlatformIcon icon={getIconForFile(tab.filePath)} />
                );
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
                                    editorTabs.indexOf(tab)
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
                            hideAllAction?.perform();
                          },
                        }}
                      />
                    </TooltipTrigger>
                  </TabItem>
                );
              }}
            </EditorTabs>
          </ContextMenuContainer>
          {typeof content === "string" ? (
            /**
             * ## Note
             * TLDR: Keeping the editor mounted when filePath changes is intentional and does matter.
             *
             * Whether the editor component is kept mounted as tabs change or not has nuances that can lead to minor
             * focus issues. For example calling editorStateManager.focus() may do nothing if the editor is unmounted due
             * to filePath being changed. focusing editor in createFile action is an example of such case. It also affects
             * certain focus management code within the FileEditor. For example, focusing the editor on tab changes will
             * be necessary if the editor remounts with each file change. Or autofocus behavior of the editor can be
             * done on the onMount callback of the Editor component, if it's only mounted once. But the same code leads
             * to focus issues if the editor is mounted on active tab changes, when they are not done via the tab UI,
             * but as a side effect of another action like opening a file via Project tool window.
             *
             */
            <Editor
              height="100%"
              path={filePath}
              onMount={(monacoEditor, monaco) => {
                monacoEditor.focus();
                enableJsx(monaco);
                editorRef.current = monacoEditor;
                monacoEditor.onDidChangeCursorPosition((e) => {
                  setCursorPositionState(e.position);
                });
                monacoEditor.onDidChangeModel(() => {
                  // TODO: set the editor tab state, and add an atom effect to persist whole editor state across loads
                });
              }}
              onChange={updateContent}
              value={content ?? ""}
            />
          ) : (
            content && "UNSUPPORTED CONTENT"
          )}
        </>
      ) : (
        <EditorZeroState></EditorZeroState>
      )}
      {loadingState === "loading" && <FileEditorLoading />}
    </StyledFileEditorContainer>
  );
};

const StyledFileEditorContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
