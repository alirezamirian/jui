import path from "path";
import { selector, useRecoilCallback } from "recoil";
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
  windowManagerRefState,
} from "../../Project/project.state";
import { selectedNodesState } from "../ProjectView.state";
import { findRootPaths } from "../../path-utils";
import { deleteFilesCallback } from "../../Project/fs-operations";

export const deleteActionState = selector({
  key: `action.${CommonActionId.Delete}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: CommonActionId.Delete,
    title: "Delete",
    description: "Delete selected item",
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot, refresh }) => async () => {
      const selectedNodes = snapshot.getLoadable(selectedNodesState).getValue();
      const windowManager = snapshot
        .getLoadable(windowManagerRefState)
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
        return notImplemented();
      }
      windowManager?.open(({ close }) => (
        <DeleteFilesConfirmationDialog filePaths={filePaths} close={close} />
      ));
    }),
  }),
});

function DeleteFilesConfirmationDialog({
  close,
  filePaths,
}: {
  close: () => void;
  filePaths: string[];
}) {
  const deleteFiles = useRecoilCallback(deleteFilesCallback, []);

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
                <Button onPress={close}>Cancel</Button>
                <Button
                  autoFocus
                  type="submit"
                  form="delete_dialog_form" // Using form in absence of built-in support for default button
                  variant="default"
                  onPress={() => {
                    deleteFiles(filePaths);
                    close();
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
