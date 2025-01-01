import { resolveRef } from "isomorphic-git";
import { atom } from "jotai";

import { activeEditorTabAtom } from "../Editor/editor.state";
import { fs } from "../fs/fs";

import { vcsFootForFileAtom, vcsRootsAtom } from "./file-status.state";
import {
  branchForPathAtoms,
  RepoBranches,
  repoBranchesAtom,
} from "./Branches/branches.state";

/**
 * Repo root of the file opened in the active editor tab.
 */
export const activeFileRepoRootAtom = atom((get) => {
  const activeFile = get(activeEditorTabAtom)?.filePath;
  const activeFileRepo = activeFile && get(vcsFootForFileAtom(activeFile));
  return activeFileRepo ?? get(vcsRootsAtom)[0]?.dir;
});

/**
 * Branches of the repository of the file opened in the active editor tab.
 */
export const activeFileRepoBranchesAtom = atom<Promise<RepoBranches | null>>(
  async (get) => {
    const activeFileRepoRoot = await get(activeFileRepoRootAtom);
    return activeFileRepoRoot
      ? get(repoBranchesAtom(activeFileRepoRoot))
      : null;
  }
);

/**
 * Current branch of the file opened in the active editor tab.
 */
export const activeFileCurrentBranchAtom = atom(async (get) => {
  const activeFile = get(activeEditorTabAtom)?.filePath;
  return activeFile ? get(branchForPathAtoms(activeFile)) : null;
});

/**
 * HEAD of the repository of the file opened in the active editor tab.
 * This can be evolved in future to become a "state" property on repositories. Right now we only keep repo root
 * in vcsRootsState. It can be changed to keep more properties of the repo, like state (NORMAL, DETACHED, MERGING,
 * REBASING, ...). Alternatively, repo state can be kept in a different piece of state mapped from vcsRootsState.
 */
export const activeFileRepoHeadAtom = atom(async (get) => {
  const branch = await get(activeFileCurrentBranchAtom);
  if (branch) {
    return {
      detached: false,
      head: branch,
    };
  }
  const repoRoot = await get(activeFileRepoRootAtom);
  if (repoRoot) {
    return {
      // maybe HEAD can be pointing to refs other than branches, and in that case it's probably not true to say
      // head is detached?
      detached: true,
      head: await resolveRef({ fs, dir: repoRoot, ref: "HEAD" }),
    };
  }
  return null;
});
