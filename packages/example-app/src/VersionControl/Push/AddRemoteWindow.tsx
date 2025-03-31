import { addRemote } from "isomorphic-git";
import { useAtomValue, useSetAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import {
  Button,
  InputField,
  LabeledControlsAlignmentProvider,
  LOADING_SPINNER_SIZE_SMALL,
  LoadingSpinner,
  ModalWindow,
  styled,
  useWindowManager,
  WindowLayout,
} from "@intellij-platform/core";

import { fs } from "../../fs/fs";
import { repoRemotesAtoms } from "../Branches/branches.state";
import { getShortRepositoryName } from "../repo-utils";
import { getRemoteInfo } from "../git-operations/git-http-operations";
import { useCancelableAsyncCallback } from "../../useCancelableAsyncCallback";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
`;

function AddRemoteWindow({
  dir,
  close,
}: {
  dir: string;
  close: (result?: { name: string; url: string }) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const existingRemotes = useAtomValue(repoRemotesAtoms(dir)).map(
    ({ remote }) => remote
  );
  const refreshRemotes = useSetAtom(repoRemotesAtoms(dir));
  const originRemoteExists = existingRemotes.find(
    (remote) => remote === "origin"
  );
  const [name, setName] = useState(originRemoteExists ? "" : "origin");
  const [url, setUrl] = useState("");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [checkingConnection, setCheckingConnection] = useState(false);

  const nameError = !name
    ? "Remote name cannot be empty"
    : existingRemotes.includes(name)
    ? `Remote name '${name}' is already used`
    : null;
  const urlError =
    connectionError ?? (!url ? "Remote URL cannot be empty" : null);

  const onSubmit = useCancelableAsyncCallback(function* (e: FormEvent) {
    setSubmitted(true);
    e.preventDefault();
    if (url && name) {
      setCheckingConnection(true);
      try {
        yield getRemoteInfo({ url });
      } catch (e) {
        setConnectionError(`${e}`);
        return;
      } finally {
        setCheckingConnection(false);
      }
      yield addRemote({ fs, remote: name, url, dir });
      refreshRemotes();
      close({
        name,
        url,
      });
    }
  });
  return (
    <ModalWindow minWidth={375} minHeight="content">
      <WindowLayout
        header={`Define Remote in ${getShortRepositoryName({
          dir,
        })}`}
        content={
          <LabeledControlsAlignmentProvider>
            <StyledForm id="add-remote-form" onSubmit={onSubmit}>
              <InputField
                label="Name:"
                labelPlacement="before"
                autoFocus={!name}
                value={name}
                onChange={setName}
                validationState={submitted && nameError ? "error" : "valid"}
                validationMessage={submitted && nameError}
              />
              <InputField
                label="URL:"
                labelPlacement="before"
                autoFocus={Boolean(name)}
                value={url}
                addonAfter={
                  checkingConnection && (
                    <LoadingSpinner size={LOADING_SPINNER_SIZE_SMALL} />
                  )
                }
                onChange={(newUrl) => {
                  setUrl(newUrl);
                  setConnectionError(null);
                }}
                validationState={submitted && urlError ? "error" : "valid"}
                validationMessage={submitted && urlError}
              />
            </StyledForm>
          </LabeledControlsAlignmentProvider>
        }
        footer={
          <WindowLayout.Footer
            right={
              <>
                <Button onPress={() => close()}>Cancel</Button>
                <Button
                  type="submit"
                  form="add-remote-form"
                  variant="default"
                  isDisabled={submitted && (!url || !name)}
                >
                  OK
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}

export function useAddRemote() {
  const windowManager = useWindowManager();

  return (repoDir: string) =>
    windowManager.open<{ name: string; url: string }>(({ close }) => (
      <React.Suspense>
        <AddRemoteWindow dir={repoDir} close={close} />
      </React.Suspense>
    ));
}
