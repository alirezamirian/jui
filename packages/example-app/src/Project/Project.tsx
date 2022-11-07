import {
  ActionTooltip,
  PlatformIcon,
  TooltipTrigger,
  ToolWindowRefValue,
  ToolWindows,
} from "@intellij-platform/core";
import React, { useRef } from "react";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { windowById } from "./toolWindows";
import { useRecoilState } from "recoil";
import { toolWindowsState } from "./toolWindows.state";
import { useInitializeChanges } from "../VersionControl/Changes/change-lists.state";
import styled from "styled-components";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";
import { DefaultToolWindowActions } from "@intellij-platform/core/ToolWindow";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = () => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const ref = useRef<ToolWindowRefValue>(null);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();

  return (
    <DefaultToolWindowActions toolWindowState={state} toolWindowRef={ref}>
      <StyledWindowFrame>
        <ToolWindows
          ref={ref}
          toolWindowsState={state}
          onToolWindowStateChange={(newState) => {
            setState(newState);
          }}
          renderToolbarButton={(id) => (
            <TooltipTrigger
              tooltip={<ActionTooltip actionName={windowById[id].title} />}
            >
              <span>
                <PlatformIcon icon={windowById[id].icon} />
                &nbsp;
                {windowById[id].title}
              </span>
            </TooltipTrigger>
          )}
          renderWindow={(id) => windowById[id].element}
        >
          <FileEditor />
        </ToolWindows>
        <IdeStatusBar />
      </StyledWindowFrame>
    </DefaultToolWindowActions>
  );
};
