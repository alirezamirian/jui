import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useEffect } from "react";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { allChangesState } from "./changes.state";
import { AnyChange, Change, UnversionedChange } from "./Change";

export interface ChangeListObj {
  id: string;
  name: string;
  comment: string;
  active: boolean;
  changes: ReadonlyArray<AnyChange>;
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

export const unversionedChangesState = selector<UnversionedChange[]>({
  key: "changelists.lists/unversioned",
  get: ({ get }) => get(allChangesState).filter(Change.isUnversioned),
});

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
      const newChanges = changes
        .filter((change) => !Change.isUnversioned(change))
        .filter(
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
