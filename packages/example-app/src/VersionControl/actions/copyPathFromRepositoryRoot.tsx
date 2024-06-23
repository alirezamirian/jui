import { selector } from "recoil";
import { ActionDefinition } from "@intellij-platform/core";

import {
  activePathExistsState,
  activePathsState,
} from "../../Project/project.state";
import { notImplemented } from "../../Project/notImplemented";
import { VcsActionIds } from "../VcsActionIds";

export const copyPathFromRepositoryRootActionState = selector({
  key: `action.${VcsActionIds.CopyPathFromRepositoryRootProvider}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: VcsActionIds.CopyPathFromRepositoryRootProvider,
    title: "Path From Repository Root",
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot, refresh }) => async () => {
      notImplemented();
      const activePaths = snapshot.getLoadable(activePathsState).getValue();
      if (activePaths.length === 0) {
        return;
      }
    }),
  }),
});
