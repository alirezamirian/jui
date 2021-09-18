import { Meta } from "@storybook/react";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { styledComponentsControlsExclude } from "../story-helpers";
import { ToolWindows } from "../ToolWindow";
import { DefaultToolWindow } from "../ToolWindow/DefaultToolWindow";
import {
  ToolWindowsState,
  toolWindowState,
} from "../ToolWindow/ToolWindowsState/ToolWindowsState";
import { ProjectViewPane } from "./ProjectView/ProjectViewPane";

export default {
  title: "Demos",
} as Meta;

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
export const Default = () => {
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

Default.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: Default,
};
