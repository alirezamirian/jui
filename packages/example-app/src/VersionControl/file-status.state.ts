import { atom, Getter, Setter } from "jotai";
import { atomFamily, useAtomCallback } from "jotai/utils";
import { withAtomEffect } from "jotai-effect";
import git, { findRoot, statusMatrix } from "isomorphic-git";
import { z } from "zod";
import { fs } from "../fs/fs";
import {
  convertGitStatus,
  FileStatus,
  VcsDirectoryMapping,
} from "./file-status";
import * as path from "path";
import { atomWithRefresh } from "../atom-utils/atomWithRefresh";
import { atomWithPersistence } from "../persistence/atomWithPersistence";
import { maybeArray } from "../persistence/schema-utils";

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

const TMP_findGitRoots = () =>
  Promise.all(
    ["/workspace/jui", "/workspace"].map(async (dir) => {
      const exists = await fs.promises.exists(dir);
      if (exists) {
        return git.findRoot({ fs, filepath: dir }).catch(() => null);
      }
    })
  ).then((roots) => {
    return [
      ...new Set(roots.filter((i) => i != null)),
    ].map<VcsDirectoryMapping>((dir) => ({
      dir,
      vcs: "Git",
    }));
  });

const vcsDirectoryMappingsSchema = z
  .object({
    mapping: maybeArray(
      z.object({
        "@directory": z.string(),
        "@vcs": z.enum(["Git"]),
      })
    ).optional(),
  })
  .optional();
type VcsDirectoryMappingStorage =
  (typeof vcsDirectoryMappingsSchema)["_output"];

export const vcsRootsAtom = atomWithPersistence(
  {
    componentName: "VcsDirectoryMappings",
    schema: vcsDirectoryMappingsSchema,
    storageFile: "vcs.xml",
    read: (state) => {
      // TODO: translate project dir to $PROJECT_DIR$
      return (
        state?.mapping?.map((item) => ({
          dir: item["@directory"],
          vcs: item["@vcs"],
        })) ?? TMP_findGitRoots()
      );
    },
    write: (value, state): VcsDirectoryMappingStorage => ({
      ...(state || {}),
      mapping:
        value?.map(({ vcs, dir }) => ({
          "@directory": dir,
          "@vcs": vcs,
        })) ?? [],
    }),
  },
  [] as ReadonlyArray<VcsDirectoryMapping>
);

/**
 * Given the absolute path of a file, returns the relevant VCS root path, if any.
 */
export const vcsFootForFileAtom = atomFamily((filepath: string) =>
  atom(() => {
    // FIXME: use vcsRoots.
    // return get(vcsRootsState).find(
    //   (root) => root.vcs === "Git" && isParentPath(root.dir, filepath)
    // )?.dir ?? null;
    // function isParentPath(parent: string, dir: string) {
    //   const relative = path.relative(parent, dir);
    //   return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
    // }
    return findRoot({ fs, filepath }).catch(() => null);
  })
);

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
 * It's a writable sync atom to allow updating it for a single file when the status of a file is changed.
 * It could have been an async atom wrapped by {@link unwrapLatestWithLoading}, which would simplify
 * keeping the loading state per repo while the latest sync value is always available, but note that
 * we want it to be writable as well, since in many scenarios a single file changes and the repo
 * status can be patched with that single change, instead of being fully recalculated.
 */
export const repoStatusAtoms = atomFamily((repoDir: string) => {
  const targetAtom = atom<RepoStatus>({});
  return withAtomEffect(targetAtom, (_get, set) => {
    fetchRepoStatusFromFs(repoDir).then((repoStatus) => {
      set(targetAtom, repoStatus);
    });
  });
});

export const isRepoStatusUpdatingAtom = atomFamily((_repoRoot: string) =>
  atom(false)
);

export const isAnyRepoStatusUpdatingAtom = atom<boolean>((get) =>
  get(vcsRootsAtom).some(({ dir }) => get(isRepoStatusUpdatingAtom(dir)))
);

/**
 * Keeps FileStatus of files based on their absolute path.
 * NOTE: updating files status is now not connected to file updates, as there is no proper (V)FS API allowing change
 * listener. `useUpdateFileStatus` and `useUpdateVcsFileStatuses` can be used to update status of a file, or all files
 * in a git root.
 * NOTE: Do **not** refresh `fileStatusAtom`s directly to update file status, as it may update status for
 * the entire repo (if {@link repoStatusAtoms} is not yet written into), which is not very efficient.
 * use {@link useRefreshFileStatus} or {@link refreshFileStatusCallback} to efficiently refresh
 * the status of a single file.
 */
export const fileStatusAtoms = atomFamily((filepath: string) =>
  atomWithRefresh(async (get): Promise<FileStatus> => {
    const repoRoot = await get(vcsFootForFileAtom(filepath));
    if (repoRoot) {
      const relativePath = path.relative(repoRoot, filepath);
      const repoStatus = get(repoStatusAtoms(repoRoot));
      if (!repoStatus[relativePath]) {
        console.log(
          "file status missing in repo status state, fetching individually",
          filepath
        );
      }
      return (
        repoStatus[relativePath] ??
        // TODO(jotai): files that are initially shown in project view all hit this individual status checking code
        //  It gets pretty slow when multiple calls to status are made simultaneously.
        //  the entire file status state could use some refactoring to improve such cases.
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
  })
);

/**
 * Adds a file or directory to git index
 */
export const refreshFileStatusCallback = async (
  get: Getter,
  set: Setter,
  fullPath: string
) => {
  const repoRoot = await get(vcsFootForFileAtom(fullPath));
  if (repoRoot) {
    const relativePath = path.relative(repoRoot, fullPath);
    const rows = await git.statusMatrix({
      fs,
      dir: repoRoot,
      filepaths: [relativePath],
    });
    set(repoStatusAtoms(repoRoot), (statusMap) => {
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
) => Promise<void>) => useAtomCallback(refreshFileStatusCallback);

export const refreshRepoStatusesCallback = async (get: Getter, set: Setter) => {
  get(vcsRootsAtom)?.forEach(({ dir }) => {
    set(isRepoStatusUpdatingAtom(dir), true);
    fetchRepoStatusFromFs(dir)
      .then((repoStatus) => {
        console.log("setting repo status for git dirs:", dir, repoStatus);
        set(repoStatusAtoms(dir), repoStatus);
      })
      .finally(() => {
        set(isRepoStatusUpdatingAtom(dir), false);
      });
  });
};
export const useRefreshRepoStatuses = () =>
  useAtomCallback(refreshRepoStatusesCallback);
