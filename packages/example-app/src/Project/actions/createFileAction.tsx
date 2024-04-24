import path from "path";
import { selector, useRecoilCallback } from "recoil";
import React, { ChangeEvent, useState } from "react";
import {
  ActionDefinition,
  Button,
  Checkbox,
  Input,
  ModalWindow,
  PlatformIcon,
  Popup,
  PopupLayout,
  PositionedTooltipTrigger,
  styled,
  ValidationTooltip,
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
import { createFileCallback } from "../fs-operations";
import { gitAddCallback } from "../../VersionControl/gitAddCallback";

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

      // TODO: open a dialog and let the user choose the destination
      const destinationDir = (
        await fs.promises.stat(activePaths[0])
      ).isDirectory()
        ? activePaths[0]
        : path.dirname(activePaths[0]);

      if (!popupManager) {
        throw new Error("Could not find popup manager");
      }

      popupManager.show(({ close }) => (
        <NewFileNamePopup close={close} destinationDir={destinationDir} />
      ));
    }),
  }),
});

const StyledInput = styled(Input)`
  width: 20.5rem;
  /**
   * To have the validation box shadow not clipped by the popup.
   * Maybe it should be an option on input to make sure margin is always in sync with the box-shadow thickness
   */
  margin: 3px;
  input {
    padding-top: 1px;
    padding-bottom: 1px;
  }
`;

const StyledHeader = styled(Popup.Header)`
  border-bottom: 1px solid ${({ theme }) => theme.commonColors.border()};
`;

function NewFileNamePopup({
  destinationDir,
  close,
}: {
  close: () => void;
  destinationDir: string;
}) {
  const createFile = useRecoilCallback(
    (callbackInterface) => {
      const createFile = createFileCallback(callbackInterface);
      return async (filePath: string) => {
        const { snapshot } = callbackInterface;
        const editorManager = snapshot
          .getLoadable(editorManagerState)
          .getValue();
        const windowManager = snapshot
          .getLoadable(windowManagerRefState)
          .getValue().current;
        const repoDir = await snapshot.getPromise(vcsRootForFile(filePath));
        await createFile(filePath);
        // TODO: select it in the Project tool window, if it was created from the Project tool window
        close();
        editorManager.focus();
        if (repoDir) {
          windowManager?.open(({ close }) => (
            <AddFileToGitWindow filepath={filePath} close={close} />
          ));
        }
      };
    },
    [close]
  );
  const [filename, setFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationState, setValidationState] = useState<"valid" | "invalid">(
    "valid"
  );
  const submit = async () => {
    const fullPath = path.join(destinationDir, filename);
    const exists = await fs.promises.exists(fullPath);
    if (exists) {
      const stats = await fs.promises.stat(fullPath);
      setValidationState("invalid");
      if (stats.isFile()) {
        setErrorMessage(
          `A file with the name '${path.basename(filename)}' already exists`
        );
      } else if (stats.isDirectory()) {
        setErrorMessage(
          `A directory with the name '${path.basename(
            filename
          )}' already exists`
        );
      }
    } else {
      await createFile(fullPath);
    }
  };

  return (
    <Popup>
      <PopupLayout
        header={<StyledHeader>New File</StyledHeader>}
        content={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (filename) {
                submit(); // error handling?
              }
            }}
            onMouseDown={() => {
              setErrorMessage("");
            }}
          >
            <PositionedTooltipTrigger
              isOpen={Boolean(errorMessage)}
              placement="top"
              offset={6}
              tooltip={
                <ValidationTooltip type="error">
                  {errorMessage}
                </ValidationTooltip>
              }
            >
              <StyledInput
                appearance="embedded"
                validationState={validationState}
                placeholder="Name"
                value={filename}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setValidationState("valid");
                  setErrorMessage("");
                  setFilename(e.target.value);
                }}
              />
            </PositionedTooltipTrigger>
          </form>
        }
      />
    </Popup>
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
