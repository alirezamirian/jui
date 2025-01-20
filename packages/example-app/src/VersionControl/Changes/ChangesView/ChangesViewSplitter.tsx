import React, { useEffect, useRef } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  ActionsProvider,
  getAnchorOrientation,
  styled,
  ThreeViewSplitter,
  TreeRefValue,
  useToolWindowState,
  useTreeActions,
} from "@intellij-platform/core";

import { isAnyRepoStatusUpdatingAtom } from "../../file-status.state";
import { LoadingGif } from "../../../LoadingGif";
import { Delayed } from "../../../Delayed";
import { commitMessageSizeState } from "./ChangesView.state";
import { ChangeViewTree } from "./ChangeViewTree";
import { ChangesViewToolbar } from "./ChangesViewToolbar";
import { CommitView } from "./CommitView";
import { CommitActionsRow } from "./CommitActionsRow";
import { useChangesViewActions } from "./useChangesViewActions";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTreeViewWrapper = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const StyledLoadingWrapper = styled.div`
  position: absolute;
  right: 0.125rem;
  top: 0.125rem;
  z-index: 1;
`;

const _focusCommitMessageAtom = atom(false);
// Not-so-ideal solution to allow for focusing the commit message editor
// in a way that doesn't depend on the timing of the commit message editor
// being rendered, which can vary when the rendering suspends.
export const focusCommitMessageAtom = atom(null, (_get, set) => {
  set(_focusCommitMessageAtom, true);
});

export const ChangesViewSplitter = () => {
  const {
    state: { anchor },
  } = useToolWindowState();
  const treeRef = useRef<TreeRefValue>(null);
  const editorRef = useRef<{ focus: () => void }>(null);
  const orientation = getAnchorOrientation(anchor);
  const updating = useAtomValue(isAnyRepoStatusUpdatingAtom);
  const [commitMessageSize, setCommitMessageSize] = useAtom(
    commitMessageSizeState(orientation)
  );
  const [focusCommitMessage, setFocusCommitMessage] = useAtom(
    _focusCommitMessageAtom
  );
  const changesViewActions = useChangesViewActions();
  const treeActions = useTreeActions({ treeRef });
  // TODO(lib-candidate): ToolWindowAwareSplitter. A wrapper around ThreeViewSplitter which sets orientation based
  //  on anchor orientation from useToolWindowState.
  useEffect(() => {
    if (focusCommitMessage) {
      setTimeout(() => {
        editorRef.current?.focus();
      });
      setFocusCommitMessage(false);
    }
  }, [focusCommitMessage]);

  return (
    <ThreeViewSplitter
      orientation={orientation}
      innerView={
        <ActionsProvider actions={[...treeActions, ...changesViewActions]}>
          {({ shortcutHandlerProps }) => (
            <StyledContainer {...shortcutHandlerProps}>
              <ChangesViewToolbar />
              <StyledTreeViewWrapper>
                {updating && (
                  <Delayed>
                    <StyledLoadingWrapper>
                      <LoadingGif />
                    </StyledLoadingWrapper>
                  </Delayed>
                )}
                <ChangeViewTree treeRef={treeRef} />
              </StyledTreeViewWrapper>
              <CommitActionsRow />
            </StyledContainer>
          )}
        </ActionsProvider>
      }
      innerViewMinSize={50}
      lastView={<CommitView editorRef={editorRef} />}
      lastSize={commitMessageSize}
      onLastResize={setCommitMessageSize}
    />
  );
};
