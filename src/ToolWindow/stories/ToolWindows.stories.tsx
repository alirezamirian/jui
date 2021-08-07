import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { ToolWindows, ToolWindowsProps } from "../ToolWindows";
import {
  ToolWindowsState,
  toolWindowState,
} from "../ToolWindowsState/ToolWindowsState";

export default {
  title: "ToolWindow",
} as Meta;

export const Default = (
  props: Pick<ToolWindowsProps, "hideToolWindowBars" | "useWidescreenLayout">
) => {
  const [state, setState] = useState(
    () =>
      new ToolWindowsState({
        Project: toolWindowState({ isVisible: true }),
        Structure: toolWindowState(),
        npm: toolWindowState({ isSplit: true }),
        Favourites: toolWindowState({ isSplit: true }),
        Run: toolWindowState({ anchor: "bottom" }),
        Git: toolWindowState({ anchor: "bottom" }),
        Terminal: toolWindowState({ anchor: "bottom" }),
        Learn: toolWindowState({ anchor: "right" }),
        "Pull Requests": toolWindowState({ anchor: "top" }),
        "Events Log": toolWindowState({ anchor: "bottom", isSplit: true }),
      })
  );
  return (
    <ToolWindows
      {...props}
      height={"100vh"}
      toolWindowsState={state}
      onToolWindowStateChange={setState}
      renderToolbarButton={(id) => id}
      renderWindow={(id) => (
        <div style={{ borderBottom: "1px solid rgba(0,0,0,.3)", padding: 4 }}>
          {id}
        </div>
      )}
    >
      <div style={{ padding: 8 }}>Main</div>
    </ToolWindows>
  );
};

Default.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: Default,
};
