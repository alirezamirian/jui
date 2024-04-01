import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ActionsProvider,
  getAnchorOrientation,
  styled,
  ThreeViewSplitter,
  TreeRefValue,
  useToolWindowState,
  useTreeActions,
} from "@intellij-platform/core";

import { repoStatusUpdatingState } from "../../file-status.state";
import { LoadingGif } from "../../../LoadingGif";
import { Delayed } from "../../../Delayed";
import { commitMessageSizeState } from "./ChangesView.state";
import { ChangeViewTree } from "./ChangeViewTree";
import { ChangesViewToolbar } from "./ChangesViewToolbar";
import { CommitView } from "./CommitView";
import { CommitActionsRow } from "./CommitActionsRow";

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

// Not so ideal solution for allowing imperatively focusing commit message. Should be ok, since there will
// be at most only one instance of change view rendered.
let editor: { focus: () => void } | null = null;

export let focusCommitMessage = () => {
  setTimeout(() => {
    editor?.focus();
  });
};

export const ChangesViewSplitter = () => {
  const {
    state: { anchor },
  } = useToolWindowState();
  const treeRef = useRef<TreeRefValue>(null);
  const editorRef = useRef<{ focus: () => void }>(null);
  const orientation = getAnchorOrientation(anchor);
  const updating = useRecoilValue(repoStatusUpdatingState);
  const [commitMessageSize, setCommitMessageSize] = useRecoilState(
    commitMessageSizeState(orientation)
  );
  const treeActions = useTreeActions({ treeRef });
  // TODO(lib-candidate): ToolWindowAwareSplitter. A wrapper around ThreeViewSplitter which sets orientation based
  //  on anchor orientation from useToolWindowState.
  editor = editorRef.current;

  return (
    <ThreeViewSplitter
      orientation={orientation}
      innerView={
        <ActionsProvider actions={treeActions}>
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
