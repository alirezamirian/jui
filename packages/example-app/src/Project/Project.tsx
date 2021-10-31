import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
} from "jui";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import { FileEditor } from "../Editor/FileEditor";
import { ProjectViewActionButtons } from "../ProjectView/ProjectViewActionButtons";
import { ProjectViewPane } from "../ProjectView/ProjectViewPane";
import { Terminal } from "../Terminal";

const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    content: <ProjectViewPane />,
    additionalActions: <ProjectViewActionButtons />,
    initialState: toolWindowState({ isVisible: true, weight: 0.22 }),
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "toolwindows/toolWindowProject",
    content: <Terminal />,
    additionalActions: null,
    initialState: toolWindowState({ anchor: "bottom" }),
  },
];

const windowById = indexBy(({ id }) => id, windows);
export const Project = () => {
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
        const { content, additionalActions } = windowById[id];
        return (
          <DefaultToolWindow
            key={id}
            headerContent={windowById[id].title}
            additionalActions={additionalActions}
          >
            {content}
          </DefaultToolWindow>
        );
      }}
    >
      <FileEditor />
    </ToolWindows>
  );
};
