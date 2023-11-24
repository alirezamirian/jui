import React, { CSSProperties, RefObject } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ActionDefinition,
  ActionsProvider,
  DefaultToolWindows,
  styled,
  ToolWindowRefValue,
  useBalloonManager,
} from "@intellij-platform/core";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { toolWindows } from "./toolWindows";
import { useInitializeChanges } from "../VersionControl/Changes/change-lists.state";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";
import { RollbackWindow } from "../VersionControl/Changes/Rollback/RollbackWindow";
import { rollbackViewState } from "../VersionControl/Changes/Rollback/rollbackView.state";
import { toolWindowsState } from "./toolWindows.state";
import { SearchEverywherePopup } from "../SearchEverywhere/SearchEverywherePopup";
import { useProjectActions } from "./useProjectActions";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { useVcsActions } from "../VersionControl/useVcsActions";
import { _balloonManagerRef } from "./notImplemented";
import { PersistentStateProvider } from "./persistence/PersistentStateProvider";
import { useTestActions } from "../testActions/useTestActions";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = ({
  height,
  toolWindowRef,
}: {
  height: CSSProperties["height"];
  toolWindowRef: RefObject<ToolWindowRefValue>;
}) => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const isRollbackWindowOpen = useRecoilValue(rollbackViewState.isOpen);
  const isSearchEveryWhereOpen = useRecoilValue(searchEverywhereState.isOpen);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();
  _balloonManagerRef.value = useBalloonManager();

  const allActions: ActionDefinition[] = [
    ...useProjectActions(),
    ...useVcsActions(),
    ...useTestActions(),
  ];

  return (
    <PersistentStateProvider>
      <StyledWindowFrame style={{ height }}>
        <ActionsProvider
          actions={allActions}
          useCapture /* useCapture because of Monaco's aggressive event handling. Specifically, Cmd+Shift+O in .ts files  */
        >
          {({ shortcutHandlerProps }) => (
            <>
              <DefaultToolWindows
                ref={toolWindowRef}
                toolWindowsState={state}
                onToolWindowStateChange={(newState) => {
                  setState(newState);
                }}
                windows={toolWindows}
                containerProps={shortcutHandlerProps}
              >
                <FileEditor />
              </DefaultToolWindows>
              <IdeStatusBar />
            </>
          )}
        </ActionsProvider>

        {isSearchEveryWhereOpen && <SearchEverywherePopup />}
        {isRollbackWindowOpen && <RollbackWindow />}
      </StyledWindowFrame>
    </PersistentStateProvider>
  );
};
