import { Meta } from "@storybook/react";
import { indexBy, map } from "ramda";
import React, { useState } from "react";
import { ActionButton } from "../../ActionButton/ActionButton";
import { PlatformIcon } from "../../Icon/PlatformIcon";
import { SpeedSearchTreeSample } from "../../story-components";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { DefaultToolWindow } from "../DefaultToolWindow";
import { ToolWindows, ToolWindowsProps } from "../ToolWindows";
import {
  ToolWindowsState,
  toolWindowState,
} from "../ToolWindowsState/ToolWindowsState";

export default {
  title: "Components/ToolWindow",
} as Meta;

const SampleToolWindowContent = () => <textarea />;
const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    component: SpeedSearchTreeSample,
    initialState: toolWindowState({ isVisible: true }),
  },
  {
    id: "structure",
    title: "Structure",
    icon: "toolwindows/toolWindowStructure",
    component: SampleToolWindowContent,
    initialState: toolWindowState(),
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: "toolwindows/toolWindowFavorites",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ isSplit: true }),
  },
  {
    id: "run",
    title: "Run",
    icon: "toolwindows/toolWindowRun",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom" }),
  },
  {
    id: "debugger",
    title: "Debug",
    icon: "toolwindows/toolWindowDebugger",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom", viewMode: "float" }),
  },
  {
    id: "messages",
    title: "Messages",
    icon: "toolwindows/toolWindowMessages",
    component: SampleToolWindowContent,
    initialState: toolWindowState({
      anchor: "bottom",
      viewMode: "undock",
      weight: 0.15,
    }),
  },
  {
    id: "events",
    title: "Events Log",
    icon: "toolwindows/errorEvents",
    component: SampleToolWindowContent,
    initialState: toolWindowState({ anchor: "bottom", isSplit: true }),
  },
  {
    id: "commit",
    title: "Commit",
    icon: "toolwindows/toolWindowCommit",
    component: SpeedSearchTreeSample,
    initialState: toolWindowState({ anchor: "right" }),
  },
];
const windowById = indexBy(({ id }) => id, windows);
export const Default = (
  props: Pick<ToolWindowsProps, "hideToolWindowBars" | "useWidescreenLayout">
) => {
  const [state, setState] = useState(
    () =>
      new ToolWindowsState(map(({ initialState }) => initialState, windowById))
  );
  return (
    <ToolWindows
      {...props}
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
          <DefaultToolWindow
            key={id} /*FIXME: this shouldn't be necessary */
            title={windowById[id].title}
            additionalActions={
              id === "project" && (
                <>
                  <ActionButton>
                    <PlatformIcon icon="actions/expandall" />
                  </ActionButton>
                </>
              )
            }
          >
            {<Component />}
          </DefaultToolWindow>
        );
      }}
    >
      <div style={{ padding: 8 }}>
        <textarea />
      </div>
    </ToolWindows>
  );
};

Default.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: Default,
};
