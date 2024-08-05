import path from "path";
import { selector } from "recoil";
import React from "react";

import {
  ActionDefinition,
  Button,
  Checkbox,
  CommonActionId,
  ModalWindow,
  WindowLayout,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { HelpButton } from "../../HelpButton";
import {
  activePathExistsState,
  alertDialogRefState,
  windowManagerRefState,
} from "../../Project/project.state";
import { selectedNodesState } from "../ProjectView.state";
import { findRootPaths } from "../../path-utils";
import {
  deleteDirCallback,
  deleteFilesCallback,
} from "../../Project/fs-operations";
import { IntlMessageFormat } from "intl-messageformat";

const fileCountMsg = new IntlMessageFormat(
  `{count, plural,
    =1 {1 file}
    other {# files}
  }`,
  "en-US"
);

const dirCountMsg = new IntlMessageFormat(
  `{count, plural,
    =1 {1 directory}
    other {# directories}
  }`,
  "en-US"
);

export const deleteActionState = selector({
  key: `action.${CommonActionId.DELETE}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: CommonActionId.DELETE,
    title: "Delete",
    description: "Delete selected item",
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot }) => async () => {
      const deleteDir = getCallback(deleteDirCallback);
      const deleteFiles = getCallback(deleteFilesCallback);
      const selectedNodes = snapshot.getLoadable(selectedNodesState).getValue();
      const windowManager = snapshot
        .getLoadable(windowManagerRefState)
        .getValue().current;
      const alertDialog = snapshot
        .getLoadable(alertDialogRefState)
        .getValue().current;
      if (selectedNodes.length === 0) {
        return;
      }
      const nodesToDelete = findRootPaths(selectedNodes, (node) => node.path);
      const filePaths = nodesToDelete
        .filter((node) => node.type === "file")
        .map((node) => node.path);
      const directories = nodesToDelete
        .filter((node) => node.type === "project" || node.type === "dir")
        .map((node) => node.path);

      if (directories.length > 0) {
        const singleDirName =
          directories.length === 1 && filePaths.length === 0
            ? path.basename(directories[0])
            : null;

        const confirmed = await alertDialog?.confirm({
          title: "Delete",
          okText: "Delete",
          message: (
            <div style={{ width: 354 }}>
              Delete{" "}
              {singleDirName
                ? `"${singleDirName}"`
                : [
                    { count: directories.length, message: dirCountMsg },
                    { count: filePaths.length, message: fileCountMsg },
                  ]
                    .filter(({ count }) => count > 0)
                    .map(({ message, count }) => message.format({ count }))
                    .join(" and ")}
              ?
              <br />
              All files and subdirectories in
              {singleDirName
                ? ` "${singleDirName}" `
                : " the selected directories "}
              will be deleted. <br />
              You might not be able to fully undo this operation!
            </div>
          ),
        });
        if (confirmed) {
          directories.forEach((pathname) => deleteDir(pathname));
          deleteFiles(filePaths);
        }
      } else {
        windowManager
          ?.open<boolean>(({ close }) => (
            <DeleteFilesConfirmationDialog
              filePaths={filePaths}
              close={close}
            />
          ))
          .then((confirmed) => {
            if (confirmed) {
              requestAnimationFrame(() => {
                // It's important that the focus is restored to the previously focused item, which typically is the
                // file in project view, that's being deleted.
                // If the file is deleted before the focus is restored, the DOM element that was going to be focused
                // will be removed by the time focus restoration logic runs.
                // Even though `windowManager.open()` was changed to return a promise which is supposed to be resolved
                // **after** the modal window is closed,
                // in the CI environment the focus is not properly restored.
                // In lack of a better solution, the deletion is done async with a setTimeout.
                deleteFiles(filePaths);
              });
            }
          });
      }
    }),
  }),
});

function DeleteFilesConfirmationDialog({
  close,
  filePaths,
}: {
  close: (confirmed?: true) => void;
  filePaths: string[];
}) {
  return (
    <ModalWindow minWidth="content" minHeight="content">
      <WindowLayout
        header="Delete"
        content={
          <form
            id="delete_dialog_form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              padding: "0.75rem 1rem",
            }}
          >
            <div style={{ marginBottom: ".5rem" }}>
              {filePaths.length === 1
                ? `Delete file "${path.basename(filePaths[0])}"`
                : `Delete ${filePaths.length} files`}
              ?
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <Checkbox isDisabled>Safe delete (with usage search)</Checkbox>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Checkbox isDisabled>Search in comments and strings</Checkbox>
                <Checkbox isDisabled>Search for text occurrences</Checkbox>
              </div>
            </div>
          </form>
        }
        footer={
          <WindowLayout.Footer
            left={<HelpButton onPress={() => notImplemented()}></HelpButton>}
            right={
              <>
                <Button onPress={() => close()}>Cancel</Button>
                <Button
                  autoFocus
                  type="submit"
                  form="delete_dialog_form" // Using form in absence of built-in support for default button
                  variant="default"
                  onPress={() => {
                    close(true);
                  }}
                >
                  Ok
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}
