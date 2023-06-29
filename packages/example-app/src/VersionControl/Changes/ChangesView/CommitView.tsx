import { IntlMessageFormat } from "intl-messageformat";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  PlatformIcon,
  styled,
  useBalloonManager,
  useDefaultToolWindowContext,
} from "@intellij-platform/core";

import { notImplemented } from "../../../Project/notImplemented";
import {
  amendCommitState,
  commitErrorMessageState,
  commitMessageState,
  includedChangesState,
  isCommitInProgressState,
} from "./ChangesView.state";
import { useCommit } from "./useCommit";

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
const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  gap: 0.25rem;
  position: sticky; // prevents commit message scroll jump when message is toggled on and off
  color: ${({ theme }) => theme.commonColors.red};
`;
const commitSuccessfulMessage = new IntlMessageFormat(
  `{count, plural,
    =1 {1 file committed}
    other {# files committed}
  }`,
  "en-US"
);

/**
 * Commit message and commit buttons shown in the bottom/right split view of the commit toolwindow
 */
export function CommitView({
  editorRef,
}: {
  editorRef: React.RefObject<{ focus: () => void }>;
}) {
  const commitMessageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commitMessage, setCommitMessage] = useRecoilState(commitMessageState);
  const commit = useCommit();
  const balloonManager = useBalloonManager();
  const [errorMessage, setErrorMessage] = useRecoilState(
    commitErrorMessageState
  );
  const isCommitInProgress = useRecoilValue(isCommitInProgressState);

  useEffect(() => {
    if (commitMessage) {
      setErrorMessage("");
    }
  }, [commitMessage]);

  const commitSelectedChanges = useRecoilCallback(({ snapshot, set }) => {
    const includedChanges = snapshot
      .getLoadable(includedChangesState)
      .getValue();
    const commitMessage = snapshot.getLoadable(commitMessageState).getValue();
    return () => {
      if (includedChanges.length === 0) {
        setErrorMessage("Select files to commit");
        return;
      }
      if (!commitMessage) {
        setErrorMessage("Specify commit message");
        return;
      }
      if (snapshot.getLoadable(amendCommitState).getValue()) {
        balloonManager.show({
          icon: "Error",
          title: "Unsupported action",
          body: "Amending commits is not yet supported.",
        });
        return;
      }
      set(isCommitInProgressState, true);
      return commit(includedChanges, commitMessage)
        .then(
          () => {
            balloonManager.show({
              icon: "Info",
              body: (
                <>
                  {`${commitSuccessfulMessage.format({
                    count: includedChanges.length,
                  })}: `}
                  {commitMessage
                    .split("\n")
                    .flatMap((part, index) => [<br key={index} />, part])
                    .slice(1)}
                </>
              ),
            });
          },
          (e) => {
            balloonManager.show({
              icon: "Error",
              title: "Commit failed!",
              body: "Could not commit files.",
            });
            console.error("Commit error", e);
          }
        )
        .finally(() => {
          set(isCommitInProgressState, false);
        });
    };
  }, []);

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
      {errorMessage && (
        <StyledErrorMessage>
          <PlatformIcon icon="general/error.svg" /> {errorMessage}
        </StyledErrorMessage>
      )}
      <StyledCommitActionsRow>
        <Button
          preventFocusOnPress
          variant={hasFocus ? "default" : undefined}
          onPress={commitSelectedChanges}
          isDisabled={isCommitInProgress}
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
