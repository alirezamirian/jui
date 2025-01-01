import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import {
  Button,
  PlatformIcon,
  styled,
  useBalloonManager,
  useDefaultToolWindowContext,
} from "@intellij-platform/core";

import { notImplemented } from "../../../Project/notImplemented";
import {
  amendCommitAtom,
  commitErrorMessageAtom,
  commitMessageAtom,
  commitTaskIdAtom,
  includedChangesAtom,
} from "./ChangesView.state";
import { useCommitChanges } from "./useCommitChanges";

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

/**
 * Commit message and commit buttons shown in the bottom/right split view of the commit toolwindow
 */
export function CommitView({
  editorRef,
}: {
  editorRef: React.RefObject<{ focus: () => void }>;
}) {
  const commitMessageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [commitMessage, setCommitMessage] = useAtom(commitMessageAtom);
  const commit = useCommitChanges();
  const amend = useAtomValue(amendCommitAtom);
  const balloonManager = useBalloonManager();
  const [errorMessage, setErrorMessage] = useAtom(commitErrorMessageAtom);
  const commitTaskId = useAtomValue(commitTaskIdAtom);

  useEffect(() => {
    if (commitMessage) {
      setErrorMessage("");
    }
  }, [commitMessage]);

  const commitSelectedChanges = useAtomCallback(
    useCallback((get) => {
      const includedChanges = get(includedChangesAtom);
      const commitMessage = get(commitMessageAtom);
      if (includedChanges.length === 0) {
        setErrorMessage("Select files to commit");
        return;
      }
      if (!commitMessage) {
        setErrorMessage("Specify commit message");
        return;
      }
      if (get(amendCommitAtom)) {
        balloonManager.show({
          icon: "Error",
          title: "Unsupported action",
          body: "Amending commits is not yet supported.",
        });
        return;
      }
      commit(includedChanges, commitMessage);
      // TODO: clear message and add an entry in commit message history
    }, [])
  );

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
          isDisabled={commitTaskId != null}
          mnemonic="i"
        >
          {amend ? "Amend Commit" : "Commit"}
        </Button>
        <Button preventFocusOnPress onPress={notImplemented} mnemonic="P">
          {amend ? "Amend Commit and Push..." : "Commit and Push..."}
        </Button>
      </StyledCommitActionsRow>
    </StyledCommitMessageContainer>
  );
}
