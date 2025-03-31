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

import { latestDefinedValue } from "../atom-utils/latestDefinedValue";

/**
 * Repo root of the file opened in the active editor tab.
 */
export const activeRepoRootAtom = atom(async (get) => {
  const activeFile = get(activeEditorTabAtom)?.filePath;
  const activeFileRepo =
    activeFile && (await get(vcsFootForFileAtom(activeFile)));
  return activeFileRepo ?? get(vcsRootsAtom)[0]?.dir;
});

/**
 * Branches of the repository of the file opened in the active editor tab.
 */
export const activeRepoBranchesAtom = atom<Promise<RepoBranches | null>>(
  async (get) => {
    const activeFileRepoRoot = await get(activeRepoRootAtom);
    return activeFileRepoRoot
      ? get(repoBranchesAtom(activeFileRepoRoot))
      : null;
  }
);

/**
 * The current branch of the file opened in the active editor tab.
 */
export const activeCurrentBranchAtom = latestDefinedValue(
  atom(async (get) => {
    const activeFile = get(activeEditorTabAtom)?.filePath;
    const filepath = activeFile ?? (await get(activeRepoRootAtom));
    return filepath ? get(branchForPathAtoms(filepath)) : null;
  })
);

/**
 * HEAD of the repository of the file opened in the active editor tab.
 * This can be evolved in future to become a "state" property on repositories. Right now we only keep repo root
 * in vcsRootsState. It can be changed to keep more properties of the repo, like state (NORMAL, DETACHED, MERGING,
 * REBASING, ...). Alternatively, repo state can be kept in a different piece of state mapped from vcsRootsState.
 */
export const activeRepoHeadAtom = atom(async (get) => {
  const branch = await get(activeCurrentBranchAtom);
  if (branch) {
    return {
      detached: false,
      head: branch,
    };
  }
  const repoRoot = await get(activeRepoRootAtom);
  if (repoRoot) {
    const head = await resolveRef({ fs, dir: repoRoot, ref: "HEAD" }).catch(
      (_e) => null
    );
    if (!head) {
      return null;
    }
    return {
      // maybe HEAD can be pointing to refs other than branches, and in that case it's probably not true to say
      // head is detached?
      detached: true,
      head,
    };
  }
  return null;
});
