import path from "path";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import React, { useEffect, useState } from "react";
import { ActionDefinition, PlatformIcon } from "@intellij-platform/core";

import { fs } from "../../fs/fs";
import { stat } from "../../fs/fs-utils";
import { DIR_ICON } from "../../file-utils";
import { useCancelableAsyncCallback } from "../../useCancelableAsyncCallback";
import {
  activePathExistsAtom,
  activePathsAtom,
  projectPopupManagerRefAtom,
} from "../project.state";
import { NewItemPopup } from "./NewItemPopup";
import { projectActionIds } from "../projectActionIds";
import { createDirectoryCallback } from "../fs-operations";
import { actionAtom } from "../../actionAtom";

// TODO: expand to and select the new directory in the project tree
export const createDirectoryActionAtom = actionAtom({
  id: projectActionIds.NewDir,
  icon: <PlatformIcon icon={DIR_ICON} />,
  title: "Directory",
  description: "Create new directory",
  isDisabled: atom((get) => !get(activePathExistsAtom)), // TODO: disable action when multiple paths are selected and none of them are directories
  actionPerformed: async ({ get }) => {
    const activePaths = get(activePathsAtom);
    if (activePaths.length === 0) {
      return;
    }
    const popupManager = get(projectPopupManagerRefAtom).current;

    // TODO: open a dialog and let the user choose the destination if, multiple dirs are active
    const destinationDir = (
      await fs.promises.stat(activePaths[0])
    ).isDirectory()
      ? activePaths[0]
      : path.dirname(activePaths[0]);

    if (!popupManager) {
      throw new Error("Could not find popup manager");
    }

    popupManager.show(({ close }) => (
      <NewDirectoryPopup close={close} destinationDir={destinationDir} />
    ));
  },
});

function NewDirectoryPopup({
  destinationDir,
  close,
}: {
  close: () => void;
  destinationDir: string;
}) {
  const createDirectory = useAtomCallback(createDirectoryCallback);

  const [dirName, setDirName] = useState("");

  const [validationResult, setValidationResult] = useState<{
    type: "error" | "warning";
    message: string;
  } | null>(null);

  const updateValidation = useCancelableAsyncCallback(function* (
    destinationDir: string,
    dirName: string
  ) {
    setValidationResult(
      (yield validate(destinationDir, dirName)) as Awaited<
        ReturnType<typeof validate>
      >
    );
  });
  useEffect(() => {
    updateValidation(destinationDir, dirName);
  }, [destinationDir, dirName]);

  const submit = async () => {
    const error = await validate(destinationDir, dirName);
    if (error == null) {
      await createDirectory(destinationDir, dirName);
      close();
    }
  };
  return (
    <NewItemPopup
      title="New Directory"
      onSubmit={() => {
        if (dirName) {
          submit(); // error handling?
        }
      }}
      value={dirName}
      onChange={setDirName}
      validationMessage={validationResult?.message}
      validationType={validationResult?.type}
    />
  );
}

const validate = async function (
  destinationDir: string,
  dirName: string
): Promise<{ type: "error" | "warning"; message: string } | null> {
  const fullPath = path.join(destinationDir, dirName);
  if (!dirName) {
    return null;
  }
  if (dirName.includes(".")) {
    return {
      type: "warning",
      message: `Note: "." in the name is treated as a regular character. Use "/" instead if you mean to create nested directories`,
    };
  }
  let stats = await stat(fullPath);
  if (stats?.isFile()) {
    return {
      type: "error",
      message: `A file with the name '${dirName}' already exists`,
    };
  } else if (stats?.isDirectory()) {
    return {
      type: "error",
      message: `A directory with the name '${dirName}' already exists`,
    };
  }
  return null;
};
