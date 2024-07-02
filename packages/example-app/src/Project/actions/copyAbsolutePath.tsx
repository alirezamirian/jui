import { selector } from "recoil";
import { ActionDefinition } from "@intellij-platform/core";

import { activePathExistsState, activePathsState } from "../project.state";
import { projectActionIds } from "../projectActionIds";
import { notImplemented } from "../notImplemented";

export const copyAbsolutePathActionState = selector({
  key: `action.${projectActionIds.CopyAbsolutePath}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: projectActionIds.CopyAbsolutePath,
    title: "Absolute Path",
    isDisabled: !get(activePathExistsState),
    useShortcutsOf: "CopyPaths",
    actionPerformed: getCallback(({ snapshot }) => async () => {
      notImplemented();
      const activePaths = snapshot.getLoadable(activePathsState).getValue();
      if (activePaths.length === 0) {
        return;
      }
    }),
  }),
});
