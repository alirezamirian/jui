import {
  atom,
  atomFamily,
  CallbackInterface,
  selectorFamily,
  useRecoilCallback,
} from "recoil";
import git, { findRoot, statusMatrix } from "isomorphic-git";
import { fs } from "../fs/fs";
import {
  convertGitStatus,
  FileStatus,
  VcsDirectoryMapping,
} from "./file-status";
import * as path from "path";
import { notNull } from "@intellij-platform/core/utils/array-utils";
import { persistentAtomEffect } from "../Project/persistence/persistentAtomEffect";
import { array, literal, object, string, union } from "@recoiljs/refine";
import { ensureArray, MaybeArray } from "../ensureArray";

/**
 * git.status function has an issue with newly added files. it returns "*added" for both of these cases:
 * - file is untracked, not yet staged (as the documentation says)
 * - file is staged, but modified in working directory (AM)
 * Here is where it seems to have wrong logic:
 * https://github.com/isomorphic-git/isomorphic-git/blob/d631f8e56a5504b10ffc1b35589b1a5b0b2f9e74/src/api/status.js#L135

 */
const status = async ({
  filepath,
  ...args
}: Parameters<(typeof git)["status"]>[0]) => {
  return git
    .statusMatrix({ ...args, filepaths: [filepath] })
    .then((rows) => rows[0]);
};

interface VcsDirectoryMappingStorage {
  mapping?: MaybeArray<{ "@directory": string; "@vcs": "Git" }>;
}
const vcsDirectoryMappingChecker = array(
  object({
    dir: string(),
    vcs: union(literal("Git")),
  })
);

export const vcsRootsState = atom<ReadonlyArray<VcsDirectoryMapping>>({
  key: "vcsRoots",
  effects: [
    persistentAtomEffect<
      ReadonlyArray<VcsDirectoryMapping>,
      VcsDirectoryMappingStorage
    >({
      storageFile: "vcs.xml",
      refine: vcsDirectoryMappingChecker,
      componentName: "VcsDirectoryMappings",
      // TODO: translate project dir to $PROJECT_DIR$
      read: (gitSettings) => {
        const mappings = ensureArray(gitSettings?.mapping)?.map((item) => ({
          dir: item["@directory"],
          vcs: item["@vcs"],
        }));
        return mappings.length > 0 ? mappings : TMP_findGitRoots();
      },
      update:
        (value) =>
        (currentValue): VcsDirectoryMappingStorage => ({
          ...(currentValue || {}),
          mapping: value.map(({ vcs, dir }) => ({
            "@directory": dir,
            "@vcs": vcs,
          })),
        }),
    }),
  ],
});

const TMP_findGitRoots = () =>
  Promise.all(
    ["/workspace/jui", "/workspace"].map(async (dir) => {
      const exists = await fs.promises.exists(dir);
      if (exists) {
        return git.findRoot({ fs, filepath: dir }).catch(() => null);
      }
    })
  ).then((roots) => {
    return [...new Set(roots.filter(notNull))].map<VcsDirectoryMapping>(
      (dir) => ({
        dir,
        vcs: "Git",
      })
    );
  });

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
      //   (root) => root.vcs === "Git" && isParentPath(root.dir, filepath)
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

const fetchRepoStatusFromFs = async (repoDir: string) => {
  console.time(`statusMatrix ${repoDir}`);
  const rows = await statusMatrix({ fs, dir: repoDir });
  console.timeEnd(`statusMatrix ${repoDir}`);
  const result: RepoStatus = {};
  rows.forEach((row) => {
    result[row[0]] = convertGitStatus(row);
  });
  return result;
};

/**
 * A mapping from relative file paths to file status, calculated efficiently for all files in a repo.
 * It's an atom to allow updating it for a single file, when status of a file is changed, instead of querying
 * the whole status matrix.
 * UPDATE: going from setting `default` to the selector that fetches the repo status from fs, and refreshing the atom's
 * state by calling `reset`/`refresh` on it, to having an empty object as default value, and updating it based on
 * the refreshed selector. That is to make sure repoStatusState will not block UI, since many pieces of state depend
 * on it, and if it's async, it will require lots of local loading handling, or Suspense boundaries, for something
 * that's usually not critical for the UX to be completely up-to-date. In cases that we do need to know if repo status
 * is being updated, a separate atom is created to hold that state. It's a little non-idiomatic use of Recoil, but
 * it seems justified for the use case. Also, it could perhaps be a feature to be supported first-class, to allow
 * atoms that can preserve the state stale, contain both the current/stale value and the loading state.
 */
export const repoStatusState = atomFamily<RepoStatus, string>({
  key: "vcs.repoStatus",
  effects: (repoDir: string) => [
    ({ setSelf }) => {
      setSelf(fetchRepoStatusFromFs(repoDir));
    },
  ],
});

export const repoStatusUpdatingState = atom<boolean>({
  key: "vcs.repoStatus.updating",
  default: false,
});

/**
 * Keeps FileStatus of files based on their absolute path.
 * NOTE: updating files status is now not connected to file updates, as there is no proper (V)FS API allowing change
 * listener. `useUpdateFileStatus` and `useUpdateVcsFileStatuses` can be used to update status of a file, or all files
 * in a git root.
 * NOTE: Do **not** use recoil `refresh` API to update file status, as it may update status for the whole repo (if
 * {@link repoStatusState} is not yet written into), which is not very efficient.
 * use {@link useRefreshFileStatus} or {@link refreshFileStatusCallback} to efficiently refresh
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
  /**
   * Adds a file or directory to git index
   * @param fullPath
   */
  async (fullPath: string) => {
    const repoRoot = snapshot.getLoadable(vcsRootForFile(fullPath)).getValue();
    if (repoRoot) {
      const relativePath = path.relative(repoRoot, fullPath);
      const rows = await git.statusMatrix({
        fs,
        dir: repoRoot,
        filepaths: [relativePath],
      });
      set(repoStatusState(repoRoot), (statusMap) => {
        const newStatusMap = {
          ...statusMap,
        };
        if (rows.length === 0) {
          // if file is removed and doesn't exist in HEAD, it will not appear on the status matrix
          delete newStatusMap[relativePath];
        }
        rows.forEach((row) => {
          newStatusMap[row[0]] = convertGitStatus(row);
        });
        return newStatusMap;
      });
    }
  };

export const useRefreshFileStatus = (): ((
  absoluteFilepath: string
) => Promise<void>) => useRecoilCallback(refreshFileStatusCallback);

export const useRefreshRepoStatuses = () =>
  useRecoilCallback(
    ({ snapshot, set }: CallbackInterface) =>
      async () => {
        set(repoStatusUpdatingState, true);
        try {
          const gitDirs = await snapshot.getPromise(vcsRootsState);
          await Promise.all(
            gitDirs?.map(({ dir, vcs }) =>
              fetchRepoStatusFromFs(dir).then((repoStatus) => {
                set(repoStatusState(dir), repoStatus);
              })
            )
          );
        } finally {
          set(repoStatusUpdatingState, false);
        }
      },
    []
  );
