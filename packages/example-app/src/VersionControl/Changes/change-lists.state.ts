import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { checkout, resetIndex } from "isomorphic-git";
import { useEffect } from "react";
import path from "path";
import { groupBy } from "ramda";

import { fs } from "../../fs/fs";
import { reloadFileFromDiskCallback } from "../../fs/fs.state";
import {
  repoStatusState,
  useRefreshFileStatus,
  vcsRootForFile,
  vcsRootsState,
} from "../file-status.state";
import { Change } from "./Change";
import { notNull } from "@intellij-platform/core/utils/array-utils";

export interface ChangeListObj {
  id: string;
  name: string;
  comment: string;
  active: boolean;
  changes: ReadonlyArray<Change>;
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
  key: "vcs.allChanges",
  get: ({ get }) => {
    return get(vcsRootsState)
      .map(({ dir }) => get(repoChangesState(dir)))
      .flat();
  },
});

const repoChangesState = selectorFamily<Change[], string>({
  key: "vcs.repoChanges",
  get:
    (repoDir: string) =>
    ({ get }) =>
      Object.entries(get(repoStatusState(repoDir)))
        .map(([filename, status]) => {
          const revision = {
            path: path.join(repoDir, filename),
            isDir: false,
            content(): Promise<string> {
              throw new Error("Not implemented");
            },
          };
          if (status === "ADDED") {
            return {
              after: revision,
            };
          }
          if (status === "MODIFIED") {
            return {
              before: revision,
              after: revision,
            };
          }
          if (status === "DELETED") {
            return {
              before: revision,
            };
          }
          return null;
        })
        .filter(notNull),
});

/**
 * react hook that returns a rollback function which accepts a list of changes to rollback.
 */
export const useRollbackChanges = () => {
  const updateFileStatus = useRefreshFileStatus();
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

/**
 * Helper component that keeps change lists state up-to-date with respect to changes.
 * It must be rendered at top level. Reasons for the unconventional implementation as a component
 * that must be rendered in top level:
 * - The *effects* API in recoil doesn't allow for this use case where one atom needs to be kept valid/up-to-date
 *   based on another atom. Changes here is the source of truth. Any removed changes should be removed from
 *   changelist(s) too, and any new change should be added to the active changelist
 * - The state of change lists is **not** just a 1:1 function of changes. So it can't be a selector. How changes are
 *   grouped in different lists is something that must have its own source of truth, but it needs validation,
 *   every time changes are added/removed.
 */
export function SyncChangeListsState() {
  const changes = useRecoilValue(allChangesState);
  const setChangeLists = useSetRecoilState(changeListsState);
  useEffect(() => {
    // FIXME: changes now all go to default change list on each refresh. fix it.
    setChangeLists((changeLists) => {
      const updatedChangeLists = changeLists.map((changeList) => {
        return {
          ...changeList,
          changes: changeList.changes
            .map((change) =>
              changes.find((aChange) => Change.equals(aChange, change))
            )
            .filter(notNull),
        };
      });
      const existingChanges = updatedChangeLists.flatMap(
        ({ changes }) => changes
      );
      const newChanges = changes.filter(
        (change) =>
          !existingChanges.find((anExistingChange) =>
            Change.equals(change, anExistingChange)
          )
      );
      const activeChangeList =
        updatedChangeLists.find(({ active }) => active) ??
        updatedChangeLists[0];
      activeChangeList.changes.push(...newChanges);
      return updatedChangeLists;
    });
  }, [changes]);
  return null;
}
