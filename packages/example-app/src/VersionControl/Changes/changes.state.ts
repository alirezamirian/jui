import { atom, Getter, Setter } from "jotai";
import { atomFamily, useAtomCallback } from "jotai/utils";
import path from "path";
import { groupBy } from "ramda";
import git, { checkout, resetIndex } from "isomorphic-git";

import { dirContentAtom, reloadFileFromDiskCallback } from "../../fs/fs.state";
import { fs } from "../../fs/fs";
import { findRootPaths } from "../../path-utils";
import { editorManagerAtom } from "../../Editor/editor.state";
import {
  refreshFileStatusCallback,
  repoStatusAtoms,
  vcsFootForFileAtom,
  vcsRootsAtom,
} from "../file-status.state";
import { AnyChange, Change } from "./Change";

const repoChangesAtoms = atomFamily((repoDir: string) =>
  atom((get): AnyChange[] =>
    Object.entries(get(repoStatusAtoms(repoDir)))
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
      .filter((i) => i != null)
  )
);

export const allChangesAtom = atom<ReadonlyArray<AnyChange>>((get) => {
  return get(vcsRootsAtom)
    .map(({ dir }) => get(repoChangesAtoms(dir)))
    .flat();
});

const rollbackChangesCallback = async (
  get: Getter,
  set: Setter,
  changes: readonly AnyChange[],
  deleteAddedFiles?: boolean
) => {
  const reloadFileFromDisk = reloadFileFromDiskCallback(get, set);

  const changesWithRepoRoots = (
    await Promise.all(
      changes
        .filter((change) => !Change.revision(change).isDir)
        .map(async (change) => {
          const repoRoot = await get(vcsFootForFileAtom(Change.path(change)));
          if (repoRoot) {
            return {
              repoRoot,
              change,
              relativePath: path.relative(repoRoot, Change.path(change)),
            };
          }
        })
    )
  ).filter((i) => i != null);
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
        const resolvedHead = await git
          .resolveRef({ fs, dir: repoRoot, ref: "HEAD" })
          .catch(() => null);
        if (resolvedHead) {
          await checkout({
            fs,
            dir: repoRoot,
            force: true,
            filepaths: toCheckout.map(
              ({ relativePath, change: { type } }) => relativePath
            ),
          });
        } else {
          // if the repository is just created, HEAD is not resolved, and checkout() throws, so we delete files
          // manually in that case.
          // TODO: another use case is detached HEAD, and it may need to be handled for non-addition changes?
          await Promise.all(
            toCheckout
              .filter(({ change }) => change.type === "ADDED")
              .map(({ change }) => {
                const fullPath = Change.path(change);
                return fs.promises.unlink(fullPath);
              })
          );
        }
      }
      if (deleteAddedFiles) {
        const editor = get(editorManagerAtom);
        changes.filter(Change.isAddition).forEach((change) => {
          editor.closePath(Change.path(change)); // FIXME(fs.watch)
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
        set(dirContentAtom(pathToRefresh))
      );

      await Promise.allSettled(
        items.map(async ({ relativePath, change }) => {
          const fullPath = Change.path(change);
          await reloadFileFromDisk(fullPath); // Since fileContent is an atom, we set the value. Could be a selector that we would refresh
          await resetIndex({
            fs,
            dir: repoRoot,
            filepath: relativePath,
          });
          await refreshFileStatusCallback(get, set, fullPath);
        })
      );
    })
  );
};

/**
 * react hook that returns a rollback function which accepts a list of changes to rollback.
 */
export const useRollbackChanges = () => {
  return useAtomCallback(rollbackChangesCallback);
};
