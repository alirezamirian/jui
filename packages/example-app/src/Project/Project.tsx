import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindows,
} from "@intellij-platform/core";
import React from "react";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { windowById } from "./toolWindows";
import { useRecoilState } from "recoil";
import { toolWindowsState } from "./toolWindows.state";

export const Project = () => {
  const [state, setState] = useRecoilState(toolWindowsState);

  useInitializeVcs();

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
