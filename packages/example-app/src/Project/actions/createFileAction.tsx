import path from "path";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import React, { useCallback, useState } from "react";
import {
  ActionDefinition,
  Button,
  Checkbox,
  ModalWindow,
  PlatformIcon,
  WindowLayout,
} from "@intellij-platform/core";

import { fs } from "../../fs/fs";
import { editorManagerAtom } from "../../Editor/editor.state";
import {
  activePathExistsAtom,
  activePathsAtom,
  projectPopupManagerRefAtom,
  windowManagerRefAtom,
} from "../project.state";
import { vcsFootForFileAtom } from "../../VersionControl/file-status.state";
import { stat } from "../../fs/fs-utils";
import { createFileCallback } from "../fs-operations";
import { gitAddCallback } from "../../VersionControl/gitAddCallback";
import { NewItemPopup } from "./NewItemPopup";
import { projectActionIds } from "../projectActionIds";
import { actionAtom } from "../../actionAtom";

// TODO: expand to and select the new file in the project tree, if the action is initiated from projects view.
export const createFileActionAtom = actionAtom({
  id: projectActionIds.NewFile,
  icon: <PlatformIcon icon="fileTypes/text" />,
  title: "File",
  description: "Create new file",
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async ({ get }) => {
    const activePaths = get(activePathsAtom);
    if (activePaths.length === 0) {
      return;
    }
    const popupManager = get(projectPopupManagerRefAtom).current;

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
  },
});

function NewFilePopup({
  destinationDir,
  close,
}: {
  close: () => void;
  destinationDir: string;
}) {
  const createFile = useAtomCallback(
    useCallback(
      async (get, set, destination: string, filename: string) => {
        const fullpath = path.join(destination, filename);
        const editorManager = get(editorManagerAtom);
        const windowManager = get(windowManagerRefAtom).current;
        const repoDir = await get(vcsFootForFileAtom(fullpath));
        await createFileCallback(get, set, destination, filename);
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
      },
      [close]
    )
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

function AddFileToGitWindow({
  close,
  filepath,
}: {
  close: () => void;
  filepath: string;
}) {
  const addToGit = useAtomCallback(gitAddCallback);
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
