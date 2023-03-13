import { selector } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
import {
  branchForFile,
  vcsRootForFile,
  vcsRootsState,
} from "./file-status.state";

/**
 * Repo root of the file opened in the active editor tab.
 */
export const activeFileRepoRoot = selector({
  key: "vcs/activeFileRepo",
  get: ({ get }) => {
    const activeFile = get(activeEditorTabState)?.filePath;
    const activeFileRepo = activeFile && get(vcsRootForFile(activeFile));
    return activeFileRepo ?? get(vcsRootsState)[0]?.dir;
  },
});
/**
 * Current branch of the file opened in the active editor tab.
 */
export const activeFileCurrentBranch = selector({
  key: "vcs/activeFileCurrentBranch",
  get: ({ get }) => branchForFile(get(activeFileRepoRoot)),
});
