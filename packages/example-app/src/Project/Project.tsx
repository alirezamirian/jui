import React, { CSSProperties, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  ActionDefinition,
  ActionsProvider,
  ActionsProviderProps,
  BalloonManager,
  DefaultToolWindows,
  styled,
  ToolWindowRefValue,
  useAlertDialog,
  useBalloonManager,
  usePopupManager,
  useWindowManager,
} from "@intellij-platform/core";
import { FileEditor } from "../Editor/FileEditor";
import { toolWindows } from "./toolWindows";
import { SyncChangeListsState } from "../VersionControl/Changes/change-lists.state";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";
import { RollbackWindow } from "../VersionControl/Changes/Rollback/RollbackWindow";
import { rollbackViewState } from "../VersionControl/Changes/Rollback/rollbackView.state";
import { toolWindowsStateAtom } from "./toolWindows.state";
import { SearchEverywherePopup } from "../SearchEverywhere/SearchEverywherePopup";
import { useProjectActions } from "./useProjectActions";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { useVcsActions } from "../VersionControl/useVcsActions";
import { _balloonManagerRef } from "./notImplemented";
import { useTestActions } from "../testActions/useTestActions";
import { ToolWindowsRefContext } from "./useToolWindowManager";
import {
  alertDialogRefAtom,
  projectPopupManagerRefAtom,
  windowManagerRefAtom,
} from "./project.state";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = ({ height }: { height: CSSProperties["height"] }) => {
  const toolWindowRef = useRef<ToolWindowRefValue>(null);
  const [state, setState] = useAtom(toolWindowsStateAtom);
  const isRollbackWindowOpen = useAtomValue(rollbackViewState.isOpenAtom);
  const isSearchEveryWhereOpen = useAtomValue(searchEverywhereState.isOpen);

  useAtomValue(projectPopupManagerRefAtom).current = usePopupManager();
  useAtomValue(windowManagerRefAtom).current = useWindowManager();
  useAtomValue(alertDialogRefAtom).current = useAlertDialog();

  return (
    <>
      <SyncChangeListsState />
      <BalloonManager disablePortal>
        <SetBalloonManagerRef />
        <UsePersistentFsNotification />
        {/* disablePortal to make example app more portable*/}
        <ToolWindowsRefContext.Provider value={toolWindowRef}>
          <StyledWindowFrame style={{ height }}>
            <ProjectActionProvider>
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
            </ProjectActionProvider>
            {isSearchEveryWhereOpen && <SearchEverywherePopup />}
            {isRollbackWindowOpen && <RollbackWindow />}
          </StyledWindowFrame>
        </ToolWindowsRefContext.Provider>
      </BalloonManager>
    </>
  );
};

function ProjectActionProvider(
  props: Omit<ActionsProviderProps, "actions" | "useCapture">
) {
  const allActions: ActionDefinition[] = [
    ...useProjectActions(),
    ...useVcsActions(),
    ...useTestActions(),
  ];
  return (
    <ActionsProvider
      {...props}
      actions={allActions}
      useCapture /* useCapture because of Monaco's aggressive event handling. Specifically, Cmd+Shift+O in .ts files  */
    />
  );
}

function SetBalloonManagerRef() {
  _balloonManagerRef.value = useBalloonManager();
  return null;
}

function UsePersistentFsNotification() {
  usePersistenceFsNotification();
  return null;
}
