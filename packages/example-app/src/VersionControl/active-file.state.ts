import { resolveRef } from "isomorphic-git";
import { selector } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import { fs } from "../fs/fs";

import { vcsRootForFile, vcsRootsState } from "./file-status.state";
import {
  branchForFile,
  RepoBranches,
  repoBranchesState,
} from "./Branches/branches.state";

/**
 * Repo root of the file opened in the active editor tab.
 */
export const activeFileRepoRootState = selector({
  key: "vcs/activeFileRepo",
  get: ({ get }) => {
    const activeFile = get(activeEditorTabState)?.filePath;
    const activeFileRepo = activeFile && get(vcsRootForFile(activeFile));
    return activeFileRepo ?? get(vcsRootsState)[0]?.dir;
  },
});

/**
 * Branches of the repository of the file opened in the active editor tab.
 */
export const activeFileRepoBranchesState = selector<RepoBranches>({
  key: "vcs/activeFileRepoBranches",
  get: ({ get }) => {
    const activeFileRepoRoot = get(activeFileRepoRootState);
    return get(repoBranchesState(activeFileRepoRoot));
  },
});

/**
 * Current branch of the file opened in the active editor tab.
 */
export const activeFileCurrentBranchState = selector({
  key: "vcs/activeFileCurrentBranch",
  get: ({ get }) => {
    const activeFile = get(activeEditorTabState)?.filePath;
    return activeFile ? branchForFile(activeFile) : null;
  },
});

/**
 * HEAD of the repository of the file opened in the active editor tab.
 * This can be evolved in future to become a "state" property on repositories. Right now we only keep repo root
 * in vcsRootsState. It can be changed to keep more properties of the repo, like state (NORMAL, DETACHED, MERGING,
 * REBASING, ...). Alternatively, repo state can be kept in a different piece of state mapped from vcsRootsState.
 */
export const activeFileRepoHeadState = selector({
  key: "vcs/activeFileRepoHead",
  get: async ({ get }) => {
    const branch = get(activeFileCurrentBranchState);
    if (branch) {
      return {
        detached: false,
        head: branch,
      };
    }
    const repoRoot = get(activeFileRepoRootState);
    return {
      // maybe HEAD can be pointing to refs other than branches, and in that case it's probably not true to say
      // head is detached?
      detached: true,
      head: await resolveRef({ fs, dir: repoRoot, ref: "HEAD" }),
    };
  },
});
