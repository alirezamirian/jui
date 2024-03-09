import { atom, CallbackInterface, selector, useRecoilCallback } from "recoil";
import { checkout, resetIndex, statusMatrix, StatusRow } from "isomorphic-git";
import { useEffect } from "react";
import path from "path";
import { groupBy } from "ramda";

import { fs } from "../../fs/fs";
import { reloadFileFromDiskCallback } from "../../fs/fs.state";
import {
  useUpdateFileStatus,
  vcsRootForFile,
  vcsRootsState,
} from "../file-status.state";
import { Change } from "./Change";

export interface ChangeListObj {
  id: string;
  name: string;
  comment: string;
  active: boolean;
  changes: Change[];
}

export const changeListsState = atom<ChangeListObj[]>({
  key: "changelists.lists",
  default: [
    {
      id: "some-UUID",
      name: "Changes",
      comment: "last modified commit message",
      changes: [],
      active: true,
    },
    {
      id: "some-other-UUID",
      name: "Some other changelist",
      comment: "Some empty changelist for testing",
      changes: [],
      active: false,
    },
  ],
});

export const activeChangeListState = selector<ChangeListObj | null>({
  key: "changelists.lists/default",
  get: ({ get }) =>
    get(changeListsState).find((changeList) => changeList.active) ?? null,
});

export const allChangesState = selector<ReadonlyArray<Change>>({
  key: "changelists.allChanges",
  get: ({ get }) =>
    get(changeListsState)
      .map((changeLists) => changeLists.changes)
      .flat(),
});

const isAChange = ([, head, workingDir, stage]: StatusRow): boolean =>
  head !== 1 || workingDir !== 1 || stage !== 1;

const refreshChangesCallback =
  ({ snapshot, set }: CallbackInterface) =>
  async () => {
    const gitRoots = (await snapshot.getPromise(vcsRootsState)).filter(
      (root) => root.vcs === "git"
    );
    const allStatusMatrices = await Promise.all(
      gitRoots.map(async ({ dir }) => {
        const rows = await statusMatrix({ fs, dir });
        return rows
          .filter(isAChange)
          .map(
            ([pathname, ...theRest]) =>
              [path.join(dir, pathname), ...theRest] as StatusRow
          );
      })
    );
    const unversionedPaths = []; // FIXME: handle unversioned files
    const changes = allStatusMatrices.flat().map(
      ([path, head, workdir, stage]): Change => ({
        // FIXME: change object creation doesn't cover all kind of changes.
        after: { path, isDir: false },
        before: { path, isDir: false },
      })
    );

    // FIXME: changes now all go to default change list on each refresh. fix it.
    set(changeListsState, (changeLists) =>
      changeLists.map((changeList) => {
        if (changeList.active) {
          return {
            ...changeList,
            changes,
          };
        }
        return {
          ...changeList,
          changes: [],
        };
      })
    );
  };

/**
 * react hook that returns a rollback function which accepts a list of changes to rollback.
 */
export const useRollbackChanges = () => {
  const updateFileStatus = useUpdateFileStatus();
  return useRecoilCallback(
    (callbackInterface) => async (changes: readonly Change[]) => {
      const { snapshot, set } = callbackInterface;
      const reloadFileFromDisk = reloadFileFromDiskCallback(callbackInterface);

      const changesWithRepoRoots = await Promise.all(
        changes
          .filter((change) => !change.after?.isDir)
          .map(async (change) => {
            const repoRoot = (await snapshot.getPromise(
              vcsRootForFile(Change.path(change))
            ))!; // FIXME: handle null
            return {
              repoRoot,
              fullPath: Change.path(change),
              relativePath: path.relative(repoRoot, Change.path(change)),
            };
          })
      );
      const groupedChanges = groupBy(
        ({ repoRoot }) => repoRoot,
        changesWithRepoRoots
      );
      await Promise.all(
        Object.entries(groupedChanges).map(async ([repoRoot, items]) => {
          await checkout({
            fs,
            dir: repoRoot,
            force: true,
            filepaths: items.map(({ relativePath }) => relativePath),
          });
          await Promise.all(
            items.map(async ({ fullPath, relativePath }) => {
              await resetIndex({ fs, dir: repoRoot, filepath: relativePath });
              await reloadFileFromDisk(fullPath); // Since fileContent is an atom, we set the value. Could be a selector that we would refresh
              return updateFileStatus(fullPath);
            })
          );
        })
      );

      // Remove all changes from changelists. It's much more efficient than refresh.
      set(changeListsState, (changeLists) =>
        changeLists.map((changeList) => {
          return {
            ...changeList,
            changes: changeList.changes.filter(
              (change) => !changes.includes(change)
            ),
          };
        })
      );
    },
    []
  );
};

export const useRefreshChanges = () =>
  useRecoilCallback(refreshChangesCallback, []);

export const useSetActiveChangeList = () =>
  useRecoilCallback(
    ({ set, snapshot }) =>
      (changeListId) => {
        const changeLists = snapshot.getLoadable(changeListsState).getValue();
        const targetChangeList = changeLists.find(
          ({ id }) => id === changeListId
        );
        if (targetChangeList) {
          set(
            changeListsState,
            changeLists.map((changeList) => ({
              ...changeList,
              active: changeList === targetChangeList,
            }))
          );
        }
        // TODO: check if deactivated changelist is empty, and open a confirmation modal window to remove it if confirmed.
      },
    []
  );

// temporary, perhaps
export const useInitializeChanges = () => {
  const refresh = useRefreshChanges();
  useEffect(() => {
    refresh().catch((e) => console.error("could not initialize changes", e));
  }, [refresh]);
};
