import React, { CSSProperties } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ActionDefinition,
  ActionsProvider,
  DefaultToolWindows,
  styled,
} from "@intellij-platform/core";
import { FileEditor } from "../Editor/FileEditor";
import { useInitializeVcs } from "../VersionControl/file-status.state";
import { toolWindows } from "./toolWindows";
import { useInitializeChanges } from "../VersionControl/Changes/change-lists.state";
import { IdeStatusBar } from "../StatusBar/IdeStatusBar";
import { usePersistenceFsNotification } from "../usePersistenceFsNotification";
import { useChangesViewActions } from "../VersionControl/Changes/useChangesViewActions";
import { RollbackWindow } from "../VersionControl/Changes/Rollback/RollbackWindow";
import { rollbackViewState } from "../VersionControl/Changes/Rollback/rollbackView.state";
import { toolWindowsState } from "./toolWindows.state";
import { SearchEverywherePopup } from "../SearchEverywhere/SearchEverywherePopup";
import { useProjectActions } from "./useProjectActions";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { useVcsActions } from "../VersionControl/useVcsActions";

const StyledWindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
`;

export const Project = ({ height }: { height: CSSProperties["height"] }) => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const isRollbackWindowOpen = useRecoilValue(rollbackViewState.isOpen);
  const isSearchEveryWhereOpen = useRecoilValue(searchEverywhereState.isOpen);

  useInitializeVcs();
  useInitializeChanges();
  usePersistenceFsNotification();

  const allActions: ActionDefinition[] = [
    ...useChangesViewActions(),
    ...useProjectActions(),
    ...useVcsActions(),
  ];

  return (
    <StyledWindowFrame style={{ height }}>
      <ActionsProvider
        actions={allActions}
        useCapture /* useCapture because of Monaco's aggressive event handling. Specifically, Cmd+Shift+O in .ts files  */
      >
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
            allowBlurOnInteractionOutside
          >
            <FileEditor />
          </DefaultToolWindows>
        )}
      </ActionsProvider>

      <IdeStatusBar />
      {isSearchEveryWhereOpen && <SearchEverywherePopup />}
      {isRollbackWindowOpen && <RollbackWindow />}
    </StyledWindowFrame>
  );
};
