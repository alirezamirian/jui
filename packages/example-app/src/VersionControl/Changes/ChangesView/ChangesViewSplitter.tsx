import styled from "styled-components";
import {
  ActionButton,
  Button,
  Checkbox,
  getAnchorOrientation,
  PlatformIcon,
  ThreeViewSplitter,
  useDefaultToolWindowContext,
  useToolWindowState,
} from "@intellij-platform/core";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  amendCommitState,
  commitMessageSizeState,
  commitMessageState,
  selectedChangesState,
} from "./ChangesView.state";
import { StatusColor } from "../../FileStatusColor";
import React, { useContext, useImperativeHandle, useRef } from "react";
import { ChangeViewTree } from "./ChangeViewTree";
import { ChangesViewToolbar } from "./ChangesViewToolbar";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTreeViewWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledActionsRow = styled.div`
  display: flex;
  padding: 0.125rem;
  position: relative;
`;

const StyledAmendCheckbox = styled(Checkbox)`
  padding-right: 0.625rem;
`;

const StyledCommitMessageContainer = styled.div`
  background: ${({ theme }) =>
    theme.dark
      ? "#2b2b2b" /*FIXME: should come from color scheme. attributes.TEXT.BACKGROUND*/
      : "#fff"};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCommitMessageTextArea = styled.textarea`
  flex: 1;
  background: none;
  padding: 0.25rem 0.375rem;
  color: ${({ theme }) =>
    theme.dark
      ? "#a9b7c6" /*FIXME: should come from color scheme. attributes.TEXT.BACKGROUND*/
      : "#000"};
  font-family: inherit;
  border: none;
  resize: none;
  outline: none;
`;

const StyledCommitActionsRow = styled.div`
  display: flex;
  gap: 0.3rem;
  padding: 0.4rem;
`;

const StyledChangesSummaryContainer = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.25rem;
  background: ${({ theme }) => theme.color("Panel.background")};
  z-index: 1;
`;

const ChangeViewContext = React.createContext({
  focusCommitMessage: () => {},
});

export const useChangeViewContext = () => useContext(ChangeViewContext);

export const ChangesViewSplitter = () => {
  const {
    state: { anchor },
  } = useToolWindowState();
  const editorRef = useRef<{ focus: () => void }>(null);
  const orientation = getAnchorOrientation(anchor);
  const [commitMessageSize, setCommitMessageSize] = useRecoilState(
    commitMessageSizeState(orientation)
  );
  // TODO(lib-candidate): ToolWindowAwareSplitter. A wrapper around ThreeViewSplitter which sets orientation based
  //  on anchor orientation from useToolWindowState.
  return (
    <ChangeViewContext.Provider
      value={{
        focusCommitMessage: () => {
          setTimeout(() => {
            editorRef.current?.focus();
          });
        },
      }}
    >
      <ThreeViewSplitter
        orientation={orientation}
        innerView={
          <StyledContainer>
            <ChangesViewToolbar />
            <StyledTreeViewWrapper>
              <ChangeViewTree />
            </StyledTreeViewWrapper>
            <CommitActionsRow />
          </StyledContainer>
        }
        innerViewMinSize={50}
        lastView={<CommitMessageEditorAndButtons editorRef={editorRef} />}
        lastSize={commitMessageSize}
        onLastResize={setCommitMessageSize}
      />
    </ChangeViewContext.Provider>
  );
};

const ChangesSummary = () => {
  const selectedChanges = useRecoilValue(selectedChangesState);
  // FIXME: handle different types of changes.
  const modifiedCount = selectedChanges.size;
  const addedCount = 0;
  const deletedCount = 0;
  return (
    <>
      {addedCount > 0 && (
        <StatusColor status="ADDED">{addedCount} added</StatusColor>
      )}
      {modifiedCount > 0 && (
        <StatusColor status="MODIFIED">{modifiedCount} modified</StatusColor>
      )}
      {deletedCount > 0 && (
        <StatusColor status="DELETED">{deletedCount} deleted</StatusColor>
      )}
    </>
  );
};

function CommitActionsRow() {
  const [amend, setAmend] = useRecoilState(amendCommitState);

  return (
    <StyledActionsRow>
      <StyledAmendCheckbox isSelected={amend} onChange={setAmend} preventFocus>
        Amend
      </StyledAmendCheckbox>
      <ActionButton onPress={() => alert("Not implemented")}>
        <PlatformIcon icon="general/gear.svg" />
      </ActionButton>
      <ActionButton isDisabled onPress={() => alert("Not implemented")}>
        <PlatformIcon icon="vcs/historyInline.svg" />
      </ActionButton>
      <StyledChangesSummaryContainer>
        <ChangesSummary />
      </StyledChangesSummaryContainer>
    </StyledActionsRow>
  );
}

function CommitMessageEditorAndButtons({
  editorRef,
}: {
  editorRef: React.RefObject<{ focus: () => void }>;
}) {
  const commitMessageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commitMessage, setCommitMessage] = useRecoilState(commitMessageState);

  const { hasFocus } = useDefaultToolWindowContext();

  useImperativeHandle(
    editorRef,
    () => ({
      focus: () => {
        commitMessageTextAreaRef.current?.focus();
      },
    }),
    []
  );

  return (
    <StyledCommitMessageContainer>
      <StyledCommitMessageTextArea
        ref={commitMessageTextAreaRef}
        value={commitMessage}
        onChange={(event) => {
          setCommitMessage(event.target.value);
        }}
        placeholder="Commit Message"
        data-gramm="false"
      />
      <StyledCommitActionsRow>
        <Button preventFocusOnPress isDefault={hasFocus} onPress={() => {}}>
          Commit
        </Button>
        <Button preventFocusOnPress onPress={() => alert("Not implemented")}>
          Commit and Push...
        </Button>
      </StyledCommitActionsRow>
    </StyledCommitMessageContainer>
  );
}
