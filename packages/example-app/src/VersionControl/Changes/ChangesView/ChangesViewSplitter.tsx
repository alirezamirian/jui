import styled from "styled-components";
import {
  ActionButton,
  ActionHelpTooltip,
  ActionsProvider,
  ActionTooltip,
  Button,
  Checkbox,
  getAnchorOrientation,
  PlatformIcon,
  ThreeViewSplitter,
  TooltipTrigger,
  TreeRefValue,
  useDefaultToolWindowContext,
  useToolWindowState,
  useTreeActions,
} from "@intellij-platform/core";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  amendCommitState,
  commitMessageSizeState,
  commitMessageState,
  includedChangesState,
} from "./ChangesView.state";
import React, { useContext, useImperativeHandle, useRef } from "react";
import { ChangeViewTree } from "./ChangeViewTree";
import { ChangesViewToolbar } from "./ChangesViewToolbar";
import { ChangesSummary } from "../ChangesSummary";
import { notImplemented } from "../../../Project/notImplemented";

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

// Not so ideal solution for allowing imperatively focusing commit message. Should be ok, since there will
// be at most only one instance of change view rendered.
export let focusCommitMessage = () => {};

export const ChangesViewSplitter = () => {
  const {
    state: { anchor },
  } = useToolWindowState();
  const treeRef = useRef<TreeRefValue>(null);
  const editorRef = useRef<{ focus: () => void }>(null);
  const orientation = getAnchorOrientation(anchor);
  const [commitMessageSize, setCommitMessageSize] = useRecoilState(
    commitMessageSizeState(orientation)
  );
  const treeActions = useTreeActions({ treeRef });
  // TODO(lib-candidate): ToolWindowAwareSplitter. A wrapper around ThreeViewSplitter which sets orientation based
  //  on anchor orientation from useToolWindowState.
  focusCommitMessage = () => {
    setTimeout(() => {
      editorRef.current?.focus();
    });
  };
  return (
    <ThreeViewSplitter
      orientation={orientation}
      innerView={
        <ActionsProvider actions={treeActions}>
          {({ shortcutHandlerProps }) => (
            <StyledContainer {...shortcutHandlerProps}>
              <ChangesViewToolbar />
              <StyledTreeViewWrapper>
                <ChangeViewTree treeRef={treeRef} />
              </StyledTreeViewWrapper>
              <CommitActionsRow />
            </StyledContainer>
          )}
        </ActionsProvider>
      }
      innerViewMinSize={50}
      lastView={<CommitMessageEditorAndButtons editorRef={editorRef} />}
      lastSize={commitMessageSize}
      onLastResize={setCommitMessageSize}
    />
  );
};

const ChangesViewChangesSummary = () => {
  const changes = useRecoilValue(includedChangesState);
  return <ChangesSummary changes={changes} />;
};

function CommitActionsRow() {
  const [amend, setAmend] = useRecoilState(amendCommitState);

  return (
    <StyledActionsRow>
      <TooltipTrigger
        tooltip={
          <ActionHelpTooltip
            actionName="Amend Commit"
            helpText="Modify the latest commit of the current branch"
          />
        }
      >
        {(props) => (
          <span {...props}>
            <StyledAmendCheckbox
              isSelected={amend}
              onChange={setAmend}
              preventFocus
            >
              Amend
            </StyledAmendCheckbox>
          </span>
        )}
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Show Commit Options" />}
      >
        <ActionButton onPress={notImplemented}>
          <PlatformIcon icon="general/gear.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Commit Message History" />}
      >
        <ActionButton isDisabled onPress={notImplemented}>
          <PlatformIcon icon="vcs/historyInline.svg" />
        </ActionButton>
      </TooltipTrigger>
      <StyledChangesSummaryContainer>
        <ChangesViewChangesSummary />
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
        <Button
          preventFocusOnPress
          variant={hasFocus ? "default" : undefined}
          onPress={notImplemented}
        >
          Commit
        </Button>
        <Button preventFocusOnPress onPress={notImplemented}>
          Commit and Push...
        </Button>
      </StyledCommitActionsRow>
    </StyledCommitMessageContainer>
  );
}
