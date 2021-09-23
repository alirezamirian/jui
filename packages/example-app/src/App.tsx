import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindows,
  ToolWindowsState,
  toolWindowState,
} from "jui";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import { ProjectViewPane } from "./ProjectView/ProjectViewPane";

const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    component: ProjectViewPane,
    initialState: toolWindowState({ isVisible: true, weight: 0.22 }),
  },
];
const windowById = indexBy(({ id }) => id, windows);
export const App = () => {
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
      <div style={{ padding: 8 }}>{null}</div>
    </ToolWindows>
  );
};
