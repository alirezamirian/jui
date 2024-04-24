import { selector, selectorFamily, useRecoilCallback } from "recoil";
import path from "path";
import { groupBy } from "ramda";
import { checkout, resetIndex } from "isomorphic-git";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { dirContentState, reloadFileFromDiskCallback } from "../../fs/fs.state";
import { fs } from "../../fs/fs";
import {
  repoStatusState,
  useRefreshFileStatus,
  vcsRootForFile,
  vcsRootsState,
} from "../file-status.state";
import { findRootPaths } from "../../path-utils";
import { AnyChange, Change } from "./Change";

const repoChangesState = selectorFamily<AnyChange[], string>({
  key: "vcs.repoChanges",
  get:
    (repoDir: string) =>
    ({ get }) =>
      Object.entries(get(repoStatusState(repoDir)))
        .map<AnyChange | null>(([filename, status]) => {
          const revision = {
            path: path.join(repoDir, filename),
            isDir: false,
            content(): Promise<string> {
              throw new Error("Not implemented");
            },
          };
          if (status === "ADDED") {
            return Change(null, revision);
          } else if (status === "MODIFIED") {
            return Change(revision, revision);
          } else if (status === "DELETED") {
            return Change(revision, null);
          } else if (status === "UNKNOWN") {
            return Change.Unversioned(revision);
          } else {
            return null;
          }
        })
        .filter(notNull),
});

export const allChangesState = selector<ReadonlyArray<AnyChange>>({
  key: "vcs.allChanges",
  get: ({ get }) => {
    return get(vcsRootsState)
      .map(({ dir }) => get(repoChangesState(dir)))
      .flat();
  },
});

/**
 * react hook that returns a rollback function which accepts a list of changes to rollback.
 */
export const useRollbackChanges = () => {
  const updateFileStatus = useRefreshFileStatus();
  return useRecoilCallback(
    (callbackInterface) =>
      async (changes: readonly AnyChange[], deleteAddedFiles?: boolean) => {
        const { snapshot, refresh } = callbackInterface;
        const reloadFileFromDisk =
          reloadFileFromDiskCallback(callbackInterface);

        const changesWithRepoRoots = (
          await Promise.all(
            changes
              .filter((change) => !Change.revision(change).isDir)
              .map(async (change) => {
                const repoRoot = await snapshot.getPromise(
                  vcsRootForFile(Change.path(change))
                );
                if (repoRoot) {
                  return {
                    repoRoot,
                    change,
                    relativePath: path.relative(repoRoot, Change.path(change)),
                  };
                }
              })
          )
        ).filter(notNull);
        const groupedChanges = groupBy(
          ({ repoRoot }) => repoRoot,
          changesWithRepoRoots
        );
        await Promise.all(
          Object.entries(groupedChanges).map(async ([repoRoot, items]) => {
            const { toReset = [], toCheckout = [] } = groupBy(
              ({ change: { type } }) =>
                type !== "ADDED" || deleteAddedFiles ? "toCheckout" : "toReset",
              items
            );
            await Promise.allSettled(
              toReset.map(({ relativePath }) =>
                resetIndex({
                  fs,
                  dir: repoRoot,
                  filepath: relativePath,
                })
              )
            );
            if (toCheckout.length > 0) {
              await checkout({
                fs,
                dir: repoRoot,
                force: true,
                filepaths: toCheckout.map(
                  ({ relativePath, change: { type } }) => relativePath
                ),
              });
            }

            // FIXME(fs.watch)
            const changedDirectories = findRootPaths(
              items.flatMap(({ change }) => {
                if (change.type === "MODIFIED") {
                  // minor optimization
                  return [];
                }
                if (change.type === "MOVED") {
                  return [change.before.path, change.after.path];
                }
                return Change.path(change);
              })
            ).map(path.dirname);
            changedDirectories.forEach((pathToRefresh) =>
              refresh(dirContentState(pathToRefresh))
            );

            await Promise.allSettled(
              items.map(async ({ relativePath, change }) => {
                const fullPath = Change.path(change);
                await reloadFileFromDisk(fullPath); // Since fileContent is an atom, we set the value. Could be a selector that we would refresh
                await updateFileStatus(fullPath);
                await resetIndex({ fs, dir: repoRoot, filepath: relativePath });
              })
            );
          })
        );
      },
    []
  );
};
