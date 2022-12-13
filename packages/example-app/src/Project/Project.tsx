import { ActionsProvider, DefaultToolWindows } from "@intellij-platform/core";
import React, { CSSProperties } from "react";
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

export const Project = ({ height }: { height: CSSProperties["height"] }) => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const isRollbackWindowOpen = useRecoilValue(rollbackViewState.isOpen);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();

  const allActions = {
    ...useChangesViewActions(),
  };

  return (
    <StyledWindowFrame style={{ height }}>
      <ActionsProvider actions={allActions}>
        {({ shortcutHandlerProps }) => (
          <DefaultToolWindows
            toolWindowsState={state}
            onToolWindowStateChange={(newState) => {
              setState(newState);
            }}
            windows={toolWindows}
            containerProps={shortcutHandlerProps}
            // To make it not annoying when the whole app is a part of a bigger page. It's fine to disable focus trap,
            // because the focusable element, the editor, fills the whole main content.
            disableFocusTrap
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
