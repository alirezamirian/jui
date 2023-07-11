import {
  atom,
  atomFamily,
  CallbackInterface,
  selector,
  selectorFamily,
  useRecoilCallback,
} from "recoil";
import { sampleRepos } from "../Project/project.state";
import { findRoot, status, statusMatrix } from "isomorphic-git";
import { fs } from "../fs/fs";
import {
  convertGitStatus,
  FileStatus,
  VcsDirectoryMapping,
} from "./file-status";
import { useEffect } from "react";
import * as path from "path";
import { asyncFilter } from "../async-utils";

const temporaryVcsMappingsDefault = async (): Promise<
  VcsDirectoryMapping[]
> => {
  return asyncFilter(
    ({ dir }) => fs.promises.stat(dir).then(Boolean),
    Object.values(sampleRepos).map(({ path }) => ({
      dir: path,
      vcs: "git",
    }))
  );
};

// This should be refactored to have the configuration file(s) as the source of truth.
export const vcsRootsState = atom<VcsDirectoryMapping[]>({
  key: "vcsRoots",
  default: selector({
    key: "vcsRoots/temporaryDefault",
    get: temporaryVcsMappingsDefault,
  }),
});

/**
 * Given the absolute path of a file, returns the relevant VCS root path, if any.
 */
export const vcsRootForFile = selectorFamily<string | null, string>({
  key: "gitRootForFile",
  get:
    (filepath: string) =>
    ({ get }) => {
      return findRoot({ fs, filepath }).catch(() => null);
    },
});

/**
 * Keeps FileStatus of files based on their absolute path.
 * NOTE: Should it be an atom or selector?
 * NOTE: updating files status is now not connected to file updates, as there is no proper (V)FS API allowing change
 * listener. `useUpdateFileStatus` and `useUpdateVcsFileStatuses` can be used to update status of a file, or all files
 * in a git root.
 */
export const fileStatusState = atomFamily<FileStatus, string>({
  key: "fileStatus",
  default: "NOT_CHANGED",
});

export const useUpdateFileStatus = () =>
  useRecoilCallback(
    ({ snapshot, set }: CallbackInterface) =>
      async (filepath: string) => {
        const repoRoot = await snapshot.getPromise(vcsRootForFile(filepath));
        if (repoRoot != null) {
          console.time(`status ${filepath}`);
          const fileStatus = await status({
            fs,
            dir: repoRoot,
            filepath: path.relative(repoRoot, filepath),
          });
          console.timeEnd(`status ${filepath}`);
          set(fileStatusState(filepath), convertGitStatus(fileStatus));
        }
      },
    []
  );

export const useUpdateVcsFileStatuses = () =>
  useRecoilCallback(
    ({ snapshot, transact_UNSTABLE }: CallbackInterface) =>
      async () => {
        const vcsDirectoryMappings = await snapshot.getPromise(vcsRootsState);
        return Promise.all(
          vcsDirectoryMappings
            .filter(({ vcs }) => vcs === "git")
            .map(async ({ dir }) => {
              console.time("statusMatrix");
              const rows = await statusMatrix({ fs, dir });
              console.timeEnd("statusMatrix");
              transact_UNSTABLE(({ set }) => {
                rows.forEach((row) => {
                  set(
                    fileStatusState(`${dir}/${row[0]}`),
                    convertGitStatus(row)
                  );
                });
              });
            })
        );
      },
    []
  );

export const useInitializeVcs = () => {
  const updateVcsFileStatuses = useUpdateVcsFileStatuses();
  useEffect(() => {
    updateVcsFileStatuses().catch((e) => {
      console.error("could not initialize VCS file statuses", e);
    });
  }, []);
};
