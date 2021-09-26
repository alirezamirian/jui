import { Monaco } from "@monaco-editor/react";
import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
} from "jui";
import { editor, languages } from "monaco-editor";
import { indexBy, map } from "ramda";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { DefaultSuspense } from "../DefaultSuspense";
import { Editor } from "../Editor";
import { activeEditorTabState } from "../Editor/editor.state";
import { ProjectViewPane } from "../ProjectView/ProjectViewPane";
import { fileContent } from "./project.state";

const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    component: ProjectViewPane,
    initialState: toolWindowState({ isVisible: true, weight: 0.22 }),
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "toolwindows/toolWindowProject",
    component: () => <>TODO</>,
    initialState: toolWindowState({ anchor: "bottom" }),
  },
];

const windowById = indexBy(({ id }) => id, windows);
export const Project = () => {
  const activeTab = useRecoilValue(activeEditorTabState);
  const editorRef = useRef<editor.IEditor>();
  const [state, setState] = useState(
    () =>
      new ToolWindowsState(map(({ initialState }) => initialState, windowById))
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
    <ToolWindows
      height={"100vh"}
      toolWindowsState={state}
      onToolWindowStateChange={setState}
      renderToolbarButton={(id) => (
        <>
          <PlatformIcon icon={windowById[id].icon} />
          &nbsp;
          {windowById[id].title}
        </>
      )}
      renderWindow={(id) => {
        const Component = windowById[id].component;
        return (
          <DefaultToolWindow key={id} title={windowById[id].title}>
            {<Component />}
          </DefaultToolWindow>
        );
      }}
    >
      {activeTab && (
        <DefaultSuspense>
          <CurrentTabContent>
            {(content) => (
              <Editor
                height="100%"
                path={activeTab.filePath}
                onMount={(monacoEditor, monaco) => {
                  monacoEditor.focus();
                  enableJsx(monaco);
                  editorRef.current = monacoEditor;
                }}
                value={content}
              />
            )}
          </CurrentTabContent>
        </DefaultSuspense>
      )}
    </ToolWindows>
  );
};

/**
 * an extra component, just ot be able to catch loading state with a suspense, which would otherwise bubble up the
 * component tree.
 */
function CurrentTabContent({
  children,
}: {
  children: (content: string) => React.ReactNode;
}) {
  const activeTab = useRecoilValue(activeEditorTabState);
  const content = useRecoilValue(fileContent(activeTab.filePath));
  return <>{children(content)}</>;
}

function enableJsx(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: languages.typescript.JsxEmit.React,
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
}
