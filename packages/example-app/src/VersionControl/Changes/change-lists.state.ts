import { atom, CallbackInterface, selector, useRecoilCallback } from "recoil";
import { checkout, resetIndex, statusMatrix, StatusRow } from "isomorphic-git";
import { fs } from "../../fs/fs";
import {
  useUpdateFileStatus,
  VcsRootForFile,
  vcsRootsState,
} from "../file-status.state";
import { useEffect } from "react";
import path from "path";
import { groupBy } from "ramda";
import { reloadFileFromDiskCallback } from "../../fs/fs.state";

export type Revision = {
  path: string;
  isDir: boolean;
};

export interface Change {
  before: Revision;
  after: Revision;
}

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

const refreshChanges = ({ snapshot, set }: CallbackInterface) => async () => {
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
  const changes = allStatusMatrices
    .flat()
    .map(([path, head, workdir, stage]) => ({
      // FIXME: change object creation doesn't cover all kind of changes.
      after: { path, isDir: false },
      before: { path, isDir: false },
    }));

  // FIXME: changes now all go to default change list on each refresh. fix it.
  set(changeListsState, (changeLists) =>
    changeLists.map((changeList) => {
      if (changeList.active) {
        console.log(changes);
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

export interface ChangeListManager {
  addChangeList(name: string, comment: string): void;
  removeChangeList(id: string): void;
  editChangeList(
    id: string,
    edits: { name?: string; comment?: string; active?: boolean }
  ): void;
  setActiveChangeList(id: string): void;
  mergeChangeLists(sourceId: string, targetId: string): void;
  moveChange(change: Change, toChangeListId: string): void;
  refresh(): Promise<void>;
  rollback(changes: readonly Change[]): Promise<void>;
}

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
          .filter((change) => !change.after.isDir)
          .map(async (change) => {
            const repoRoot = (await snapshot.getPromise(
              VcsRootForFile(change.after.path)
            ))!; // FIXME: handle null
            return {
              repoRoot,
              fullPath: change.after.path,
              relativePath: path.relative(repoRoot, change.after.path),
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

/**
 * Exposes actions related to managing change lists, such as CRUD on change lists or refreshing the list of changes, etc.
 * NOTE: ChangeListManager is not used to get the list of changes or change lists, etc. that is to prevent unnecessary
 * re-renders when a component only needs to perform actions related to change lists, without caring about the state
 * of change lists. to get the list of change lists or active change list or list of all changes, there are several
 * other recoil values that can be used simply by `useRecoilValue` hook. of course setting those recoil values
 * is not expected to be done directly via recoil API, and can be prevented by not exposing the atoms/selectors
 * directly, and exposing small hooks that would simply call useRecoilValue.
 */
export const useChangeListManager = (): ChangeListManager => {
  const refresh = useRecoilCallback(refreshChanges, []);
  const rollback = useRollbackChanges();

  const addChangeList = (name: string, comment: string) => {
    throw new Error("Not implemented");
  };
  const editChangeList = (
    id: string,
    edits: { name?: string; comment?: string; active?: boolean }
  ) => {
    throw new Error("Not implemented");
  };
  const mergeChangeLists = (sourceId: string, targetId: string) => {
    throw new Error("Not implemented");
  };
  const moveChange = (change: Change, toChangeListId: string) => {
    throw new Error("Not implemented");
  };
  const removeChangeList = (id: string) => {
    throw new Error("Not implemented");
  };
  const setActiveChangeList = (id: string) => {
    throw new Error("Not implemented");
  };
  return {
    addChangeList,
    editChangeList,
    mergeChangeLists,
    moveChange,
    removeChangeList,
    setActiveChangeList,
    refresh,
    rollback,
  };
};

// temporary, perhaps
export const useInitializeChanges = () => {
  const { refresh } = useChangeListManager();
  useEffect(() => {
    refresh().catch((e) => console.error("could not initialize changes", e));
  }, [refresh]);
};
