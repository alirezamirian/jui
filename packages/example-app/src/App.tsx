import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
} from "jui";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import { Editor } from "./Editor";
import { ProjectViewPane } from "./ProjectView/ProjectViewPane";

const sampleSource = require("raw-loader!./Editor/useEditorTheme");

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
    component: ProjectViewPane,
    initialState: toolWindowState({ anchor: "bottom" }),
  },
];

const windowById = indexBy(({ id }) => id, windows);
export const App = () => {
  const [editorContent, setEditorContent] = useState(sampleSource.default);
  const [state, setState] = useState(
    () =>
      new ToolWindowsState(map(({ initialState }) => initialState, windowById))
  );

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
      <Editor
        height="100%"
        options={{
          minimap: { enabled: false },
          lineHeight: 21,
          showFoldingControls: "always",
          renderIndentGuides: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            verticalSliderSize: 7,
          },
        }}
        defaultLanguage="typescript"
        language="javascript"
        value={editorContent}
      />
    </ToolWindows>
  );
};
