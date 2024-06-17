import path from "path";
import { selector, useRecoilCallback } from "recoil";
import React, { useState } from "react";
import {
  ActionDefinition,
  Button,
  Checkbox,
  ModalWindow,
  PlatformIcon,
  WindowLayout,
} from "@intellij-platform/core";

import { fs } from "../../fs/fs";
import { editorManagerState } from "../../Editor/editor.state";
import {
  activePathExistsState,
  activePathsState,
  projectPopupManagerRefState,
  windowManagerRefState,
} from "../project.state";
import { vcsRootForFile } from "../../VersionControl/file-status.state";
import { stat } from "../../fs/fs-utils";
import { createFileCallback } from "../fs-operations";
import { gitAddCallback } from "../../VersionControl/gitAddCallback";
import { NewItemPopup } from "./NewItemPopup";

// TODO: expand to and select the new file in the project tree, if the action is initiated from projects view.
export const createFileActionState = selector({
  key: "action.NewFile",
  get: ({ get, getCallback }): ActionDefinition => ({
    id: "NewFile",
    icon: <PlatformIcon icon="fileTypes/text" />,
    title: "File",
    description: "Create new file",
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot, refresh }) => async () => {
      const activePaths = snapshot.getLoadable(activePathsState).getValue();
      if (activePaths.length === 0) {
        return;
      }
      const popupManager = snapshot
        .getLoadable(projectPopupManagerRefState)
        .getValue().current;

      // TODO: open a dialog and let the user choose the destination if, multiple paths are active
      const destinationDir = (
        await fs.promises.stat(activePaths[0])
      ).isDirectory()
        ? activePaths[0]
        : path.dirname(activePaths[0]);

      if (!popupManager) {
        throw new Error("Could not find popup manager");
      }

      popupManager.show(({ close }) => (
        <NewFilePopup close={close} destinationDir={destinationDir} />
      ));
    }),
  }),
});

function NewFilePopup({
  destinationDir,
  close,
}: {
  close: () => void;
  destinationDir: string;
}) {
  const createFile = useRecoilCallback(
    (callbackInterface) => {
      const createFile = createFileCallback(callbackInterface);
      return async (destination: string, filename: string) => {
        const fullpath = path.join(destinationDir, filename);
        const { snapshot } = callbackInterface;
        const editorManager = snapshot
          .getLoadable(editorManagerState)
          .getValue();
        const windowManager = snapshot
          .getLoadable(windowManagerRefState)
          .getValue().current;
        const repoDir = await snapshot.getPromise(vcsRootForFile(fullpath));
        await createFile(destinationDir, filename);
        // TODO: select it in the Project tool window, if it was created from the Project tool window
        close();
        editorManager.focus();
        // Hacky approach to fix an edge case where the editor is not rendered already (no open tabs), and
        // so will be focused with a little delay. For the focus to go back to the editor after AddFileToGitWindow
        // is closed, without any extra focus management, we need to make sure the editor is focused before the
        // modal window is opened, so it restores to the editor.
        await waitUntil(
          () => document.activeElement instanceof HTMLTextAreaElement
        );
        if (repoDir) {
          windowManager?.open(({ close }) => (
            <AddFileToGitWindow filepath={fullpath} close={close} />
          ));
        }
      };
    },
    [close]
  );
  const [filename, setFilename] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const submit = async () => {
    const fullPath = path.join(destinationDir, filename);
    const stats = await stat(fullPath);
    if (stats?.isFile()) {
      setValidationMessage(
        `A file with the name '${path.basename(filename)}' already exists`
      );
    } else if (stats?.isDirectory()) {
      setValidationMessage(
        `A directory with the name '${path.basename(filename)}' already exists`
      );
    } else {
      await createFile(destinationDir, filename);
    }
  };
  return (
    <NewItemPopup
      title="New File"
      onSubmit={() => {
        if (filename) {
          submit(); // error handling?
        }
      }}
      value={filename}
      onChange={(newValue) => {
        setValidationMessage("");
        setFilename(newValue);
      }}
      validationMessage={validationMessage}
    />
  );
}

function useAddToGit() {
  return useRecoilCallback(gitAddCallback, []);
}

function AddFileToGitWindow({
  close,
  filepath,
}: {
  close: () => void;
  filepath: string;
}) {
  const addToGit = useAddToGit();
  return (
    <ModalWindow minWidth="content" minHeight="content">
      <WindowLayout
        header="Add File to Git"
        content={
          <>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "0.75rem 0.75rem 0rem",
              }}
            >
              <PlatformIcon icon="general/questionDialog.svg" size={32} />
              <div>
                Do you want to add the following file to Git?
                <br />
                {filepath}
                <br />
                <br />
                If you choose Cancel, you can still add it later manually.
              </div>
            </div>
          </>
        }
        footer={
          <WindowLayout.Footer
            left={<Checkbox isDisabled>Don't ask again</Checkbox>}
            right={
              <>
                <Button onPress={close}>Cancel</Button>
                <Button
                  autoFocus
                  variant="default"
                  onPress={() => {
                    addToGit(filepath).then(close);
                  }}
                >
                  Add
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}

async function waitUntil(criteria: () => boolean, timeoutInMs = 2000) {
  if (criteria() || timeoutInMs < 0) {
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  await waitUntil(criteria, timeoutInMs - 50);
}
