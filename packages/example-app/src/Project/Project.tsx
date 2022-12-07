import { ActionsProvider, DefaultToolWindows } from "@intellij-platform/core";
import React from "react";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { toolWindows } from "./toolWindows";
import { useRecoilState, useRecoilValue } from "recoil";
import { toolWindowsState } from "./toolWindows.state";
import { useInitializeChanges } from "../VersionControl/Changes/change-lists.state";
import styled from "styled-components";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";
import { useChangesViewActions } from "../VersionControl/Changes/useChangesViewActions";
import { RollbackWindow } from "../VersionControl/Changes/Rollback/RollbackWindow";
import { rollbackViewState } from "../VersionControl/Changes/Rollback/rollbackView.state";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = () => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const isRollbackWindowOpen = useRecoilValue(rollbackViewState.isOpen);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();

  const allActions = {
    ...useChangesViewActions(),
  };

  return (
    <StyledWindowFrame>
      <ActionsProvider actions={allActions}>
        {({ shortcutHandlerProps }) => (
          <DefaultToolWindows
            toolWindowsState={state}
            onToolWindowStateChange={(newState) => {
              setState(newState);
            }}
            windows={toolWindows}
            containerProps={shortcutHandlerProps}
          >
            <FileEditor />
          </DefaultToolWindows>
        )}
      </ActionsProvider>

      <IdeStatusBar />
      {isRollbackWindowOpen && <RollbackWindow />}
    </StyledWindowFrame>
  );
};
