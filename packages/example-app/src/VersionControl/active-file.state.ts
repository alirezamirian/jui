import { selector } from "recoil";
import { activeEditorTabState } from "../Editor/editor.state";
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
