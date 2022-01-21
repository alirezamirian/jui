import { atom, CallbackInterface, selector, useRecoilCallback } from "recoil";
import { statusMatrix, StatusRow } from "isomorphic-git";
import { fs } from "../../fs/fs";
import { vcsRootsState } from "../file-status.state";
import { useEffect } from "react";

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
      changes: [
        {
          after: { path: "/workspace/jui/README.md", isDir: false },
          before: { path: "/workspace/jui/README.md", isDir: false },
        },
        {
          after: {
            path: "/workspace/jui/packages/example-app/src/Project/Project.tsx",
            isDir: false,
          },
          before: {
            path: "/workspace/jui/packages/example-app/src/Project/Project.tsx",
            isDir: false,
          },
        },
        {
          after: {
            path:
              "/workspace/jui/packages/example-app/src/ProjectView/ProjectViewPane.tsx",
            isDir: false,
          },
          before: {
            path:
              "/workspace/jui/packages/example-app/src/ProjectView/ProjectViewPane.tsx",
            isDir: false,
          },
        },
      ],
      active: true,
    },
    {
      id: "some-other-UUID",
      name: "Empty changelist",
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

const refreshChanges = ({ snapshot }: CallbackInterface) => async () => {
  const gitRoots = (await snapshot.getPromise(vcsRootsState)).filter(
    (root) => root.vcs === "git"
  );
  const allStatusMatrices = await Promise.all(
    gitRoots.map(({ dir }) => statusMatrix({ fs, dir }))
  );
  const rows = allStatusMatrices.flat().filter(isAChange);
  console.log(rows);
  // FIXME
  const unversionedPaths = [];
  rows.forEach((row) => {});
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
}

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
  };
};

// temporary, perhaps
export const useInitializeChanges = () => {
  const { refresh } = useChangeListManager();
  useEffect(() => {
    refresh().catch((e) => console.error("could not initialize changes", e));
  }, [refresh]);
};
