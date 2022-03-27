import { PlatformIcon, ToolWindows } from "@intellij-platform/core";
import React from "react";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { windowById } from "./toolWindows";
import { useRecoilState } from "recoil";
import { toolWindowsState } from "./toolWindows.state";
import { useInitializeChanges } from "../VersionControl/Changes/change-lists.state";
import styled from "styled-components";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = () => {
  const [state, setState] = useRecoilState(toolWindowsState);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();

  return (
    <StyledWindowFrame>
      <ToolWindows
        toolWindowsState={state}
        onToolWindowStateChange={setState}
        renderToolbarButton={(id) => (
          <>
            <PlatformIcon icon={windowById[id].icon} />
            &nbsp;
            {windowById[id].title}
          </>
        )}
        renderWindow={(id) => windowById[id].element}
      >
        <FileEditor />
      </ToolWindows>
      <IdeStatusBar />
    </StyledWindowFrame>
  );
};
