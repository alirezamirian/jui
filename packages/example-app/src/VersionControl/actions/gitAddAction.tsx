import { selector } from "recoil";
import { VcsActionIds } from "../VcsActionIds";
import { asyncFilter } from "../../async-utils";
import { fileStatusState, vcsRootForFile } from "../file-status.state";
import git from "isomorphic-git";
import { fs } from "../../fs/fs";
import path from "path";
import { activePathsState } from "../../Project/project.state";
import { createAction } from "../../createAction";
import { PlatformIcon } from "@intellij-platform/core";
import { gitAddCallback } from "../gitAddCallback";
import React from "react";

const pathsToAddState = selector<string[]>({
  key: `vcs.action.${VcsActionIds.GIT_ADD}.pathsToAdd`,
  get: async ({ get }) => {
    return asyncFilter(async (activePath): Promise<boolean> => {
      const repoDir = get(vcsRootForFile(activePath));
      if (repoDir) {
        const isIgnored = await git.isIgnored({
          fs,
          dir: repoDir,
          filepath: path.relative(repoDir, activePath),
        });
        const isFile = await fs.promises
          .stat(activePath)
          .then((stat) => stat.isFile())
          .catch(() => false);
        const isUnchangedFile =
          isFile && get(fileStatusState(activePath)) === "NOT_CHANGED";
        return !isIgnored && !isUnchangedFile; // logic checked with the behavior of the reference impl
      }
      return false;
    }, get(activePathsState));
  },
});

const gitAddDisabledState = selector<boolean>({
  key: `vcs.action.${VcsActionIds.GIT_ADD}.disabled`,
  get: ({ get }) => get(pathsToAddState).length === 0,
});

/**
 * FIXME: action is not enabled on repo roots.
 * FIXME(maybe): if repo status is being updated, action either remains disabled or just doesn't work (didn't check which)
 *  Maybe not much to do here if the action remains disabled because of unknown status, though.
 * TODO: task API can be used to make this a task.
 */
export const gitAddActionSelector = createAction({
  id: VcsActionIds.GIT_ADD,
  title: "Add",
  icon: <PlatformIcon icon="general/add.svg" />,
  useShortcutsOf: VcsActionIds.ADD_UNVERSIONED,
  isDisabled: gitAddDisabledState,
  actionPerformed: (callbackInterface) => async () => {
    const addToGit = gitAddCallback(callbackInterface);
    const { snapshot } = callbackInterface;
    const pathsToAdd = await snapshot.getPromise(pathsToAddState);
    return Promise.all(pathsToAdd.map(addToGit));
  },
});
