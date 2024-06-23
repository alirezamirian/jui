import { selector } from "recoil";
import { ActionDefinition } from "@intellij-platform/core";

import { activePathExistsState, activePathsState } from "../project.state";
import { projectActionIds } from "../projectActionIds";
import { notImplemented } from "../notImplemented";

export const copyFilenameActionState = selector({
  key: `action.${projectActionIds.CopyFileName}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: projectActionIds.CopyFileName,
    title: "File Name",
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot }) => async () => {
      notImplemented();
      const activePaths = snapshot.getLoadable(activePathsState).getValue();
      if (activePaths.length === 0) {
        return;
      }
    }),
  }),
});
