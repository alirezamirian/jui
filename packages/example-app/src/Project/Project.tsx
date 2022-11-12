import { DefaultToolWindows } from "@intellij-platform/core";
import React from "react";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { toolWindows } from "./toolWindows";
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
      <DefaultToolWindows
        toolWindowsState={state}
        onToolWindowStateChange={(newState) => {
          setState(newState);
        }}
        windows={toolWindows}
      >
        <FileEditor />
      </DefaultToolWindows>
      <IdeStatusBar />
    </StyledWindowFrame>
  );
};
