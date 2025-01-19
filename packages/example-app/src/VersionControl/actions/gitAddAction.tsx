import { atom } from "jotai";
import React from "react";
import { VcsActionIds } from "../VcsActionIds";
import git from "isomorphic-git";
import { PlatformIcon } from "@intellij-platform/core";
import { asyncFilter } from "../../async-utils";
import { fileStatusAtoms, vcsFootForFileAtom } from "../file-status.state";
import { fs } from "../../fs/fs";
import path from "path";
import { activePathsAtom } from "../../Project/project.state";
import { gitAddCallback } from "../gitAddCallback";
import { actionAtom } from "../../actionAtom";

const pathsToAddAtom = atom<Promise<string[]>>(async (get) => {
  return asyncFilter(async (activePath): Promise<boolean> => {
    const repoDir = await get(vcsFootForFileAtom(activePath));
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
        isFile && (await get(fileStatusAtoms(activePath))) === "NOT_CHANGED";
      return !isIgnored && !isUnchangedFile; // logic checked with the behavior of the reference impl
    }
    return false;
  }, get(activePathsAtom));
});

const gitAddDisabledAtom = atom(
  async (get) => (await get(pathsToAddAtom)).length === 0
);

/**
 * FIXME: action is not enabled on repo roots.
 * FIXME(maybe): if repo status is being updated, action either remains disabled or just doesn't work (didn't check which)
 *  Maybe not much to do here if the action remains disabled because of unknown status, though.
 * TODO: task API can be used to make this a task.
 */
export const gitAddActionAtom = actionAtom({
  id: VcsActionIds.GIT_ADD,
  title: "Add",
  icon: <PlatformIcon icon="general/add.svg" />,
  useShortcutsOf: VcsActionIds.ADD_UNVERSIONED,
  isDisabled: gitAddDisabledAtom,
  actionPerformed: async ({ get, set }) => {
    const pathsToAdd = await get(pathsToAddAtom);
    await Promise.all(
      pathsToAdd.map((aPath) => gitAddCallback(get, set, aPath))
    );
  },
});
