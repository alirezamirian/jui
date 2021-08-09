import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { ActionButton } from "../../ActionButton/ActionButton";
import { PlatformIcon } from "../../Icon/PlatformIcon";
import { styledComponentsControlsExclude } from "../../story-helpers";
import { DefaultToolWindow } from "../DefaultToolWindow";
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
        <DefaultToolWindow
          title={id}
          additionalActions={
            <>
              <ActionButton>
                <PlatformIcon icon="actions/expandall" />
              </ActionButton>
            </>
          }
        >
          {/*<Static />*/}
        </DefaultToolWindow>
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
