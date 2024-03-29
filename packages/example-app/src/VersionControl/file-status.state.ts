import {
  atom,
  atomFamily,
  CallbackInterface,
  selector,
  selectorFamily,
  useRecoilCallback,
  useSetRecoilState,
} from "recoil";
import { sampleRepos } from "../Project/project.state";
import git, { findRoot, statusMatrix } from "isomorphic-git";
import { fs } from "../fs/fs";
import {
  convertGitStatus,
  FileStatus,
  VcsDirectoryMapping,
} from "./file-status";
import { useEffect } from "react";
import * as path from "path";
import { asyncFilter } from "../async-utils";

/**
 * git.status function has an issue with newly added files. it returns "*added" for both of these cases:
 * - file is untracked, not yet staged (as the documentation says)
 * - file is staged, but modified in working directory (AM)
 * Here is where it seems to have wrong logic:
 * https://github.com/isomorphic-git/isomorphic-git/blob/d631f8e56a5504b10ffc1b35589b1a5b0b2f9e74/src/api/status.js#L135

 */
const status = ({ filepath, ...args }: Parameters<typeof git["status"]>[0]) => {
  return git
    .statusMatrix({ ...args, filepaths: [filepath] })
    .then((rows) => rows[0]);
};
// This should be refactored to have the configuration file(s) as the source of truth.
const temporaryVcsMappingsDefaultState = selector({
  key: "vcsRoots/temporaryDefault",
  get: async (): Promise<VcsDirectoryMapping[]> => {
    return asyncFilter(
      ({ dir }) => fs.promises.stat(dir).then(Boolean),
      Object.values(sampleRepos).map(({ path }) => ({
        dir: path,
        vcs: "git",
      }))
    );
  },
});

// FIXME: since the value of this atom comes from a selector, everytime it's called in a selector (which happens in
//  many places), it will cause a page blink as some component is using a state that depends on this and the loading
//  is not handled locally (by either a local Suspense or using useRecoilValueLoadable)
export const vcsRootsState = atom<VcsDirectoryMapping[]>({
  key: "vcsRoots",
  default: [],
});

/**
 * temporary(?) hook to refresh vcs roots
 */
export const useRefreshVcsRoots = () => {
  const setVcsRoots = useSetRecoilState(vcsRootsState);
  return () =>
    asyncFilter(
      ({ dir }) => fs.promises.stat(dir).then(Boolean),
      Object.values(sampleRepos).map<VcsDirectoryMapping>(({ path }) => ({
        dir: path,
        vcs: "git",
      }))
    ).then((roots) => {
      setVcsRoots(roots);
    });
};

/**
 * Given the absolute path of a file, returns the relevant VCS root path, if any.
 */
export const vcsRootForFile = selectorFamily<string | null, string>({
  key: "gitRootForFile",
  get:
    (filepath: string) =>
    ({ get }) => {
      // FIXME: use vcsRoots.
      // return get(vcsRootsState).find(
      //   (root) => root.vcs === "git" && isParentPath(root.dir, filepath)
      // )?.dir ?? null;
      // function isParentPath(parent: string, dir: string) {
      //   const relative = path.relative(parent, dir);
      //   return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
      // }
      return findRoot({ fs, filepath }).catch(() => null);
    },
});

type RepoStatus = {
  [relativeFilePath: string]: FileStatus;
};

const repoStatusInitialValue = selectorFamily<RepoStatus, string>({
  key: "vcs.repoStatusMatrix",
  get: (repoDir) => async () => {
    console.time(`statusMatrix ${repoDir}`);
    const rows = await statusMatrix({ fs, dir: repoDir });
    console.timeEnd(`statusMatrix ${repoDir}`);
    const result: RepoStatus = {};
    rows.forEach((row) => {
      result[row[0]] = convertGitStatus(row);
    });
    return result;
  },
});

/**
 * A mapping from relative file paths to file status, calculated efficiently for all files in a repo.
 * It's an atom to allow updating it for a single file, when status of a file is changed, instead of querying
 * the whole status matrix.
 */
const repoStatusState = atomFamily<RepoStatus, string>({
  key: "vcs.repoStatus",
  default: repoStatusInitialValue,
});

/**
 * Keeps FileStatus of files based on their absolute path.
 * NOTE: updating files status is now not connected to file updates, as there is no proper (V)FS API allowing change
 * listener. `useUpdateFileStatus` and `useUpdateVcsFileStatuses` can be used to update status of a file, or all files
 * in a git root.
 * NOTE: Do **not** use recoil `refresh` API to update file status, as it may update status for the whole repo (if
 * {@link repoStatusState} is not yet written into), which is not very efficient.
 * use {@link useUpdateFileStatus} or {@link refreshFileStatusCallback} to efficiently refresh
 * the status of a single file.
 */
export const fileStatusState = selectorFamily<FileStatus, string>({
  key: "vcs.fileStatus",
  /**
   * using a selector for the default value allows for using standard recoil API like `reset`/`refresh` to update
   * the status for a given file.
   */
  get:
    (filepath: string) =>
    async ({ get }) => {
      const repoRoot = get(vcsRootForFile(filepath));
      if (repoRoot) {
        const relativePath = path.relative(repoRoot, filepath);
        const repoStatus = get(repoStatusState(repoRoot));
        if (!repoStatus[relativePath]) {
          console.log(
            "file status missing in repo status state, fetching individually",
            filepath
          );
        }
        return (
          repoStatus[relativePath] ??
          convertGitStatus(
            await status({
              fs,
              dir: repoRoot,
              filepath: relativePath,
            })
          )
        );
      }
      return "NOT_CHANGED";
    },
});

export const refreshFileStatusCallback =
  ({ set, snapshot }: CallbackInterface) =>
  async (filepath: string) => {
    const repoRoot = snapshot.getLoadable(vcsRootForFile(filepath)).getValue();
    if (repoRoot) {
      const relativePath = path.relative(repoRoot, filepath);
      const fileStatus = convertGitStatus(
        await status({
          fs,
          dir: repoRoot,
          filepath: relativePath,
        })
      );
      set(repoStatusState(repoRoot), (statusMap) => ({
        ...statusMap,
        [relativePath]: fileStatus,
      }));
    }
  };

export const useUpdateFileStatus = (): ((
  absoluteFilepath: string
) => Promise<void>) => useRecoilCallback(refreshFileStatusCallback);

export const useUpdateVcsFileStatuses = () =>
  useRecoilCallback(
    ({ snapshot, refresh }: CallbackInterface) =>
      async () => {
        const gitDirs = await snapshot.getPromise(vcsRootsState);
        gitDirs?.forEach(({ dir, vcs }) => {
          if (vcs === "git") {
            refresh(repoStatusState(dir));
          }
        });
      },
    []
  );

export const useInitializeVcs = () => {
  // const updateVcsFileStatuses = useUpdateVcsFileStatuses();
  const refreshVcsRoots = useRefreshVcsRoots();
  useEffect(() => {
    refreshVcsRoots().catch((e) => {
      console.error("could not initialize VCS file statuses", e);
    });
  }, []);
};
