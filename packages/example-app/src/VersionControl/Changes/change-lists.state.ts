import { atom as jotaiAtom, useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useEffect } from "react";

import { allChangesAtom } from "./changes.state";
import { AnyChange, Change, UnversionedChange } from "./Change";

export interface ChangeListObj {
  id: string;
  name: string;
  comment: string;
  active: boolean;
  changes: ReadonlyArray<AnyChange>;
}

export const changeListsAtom = jotaiAtom<ChangeListObj[]>([
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
]);

export const activeChangeListState = jotaiAtom<ChangeListObj | null>(
  (get) => get(changeListsAtom).find((changeList) => changeList.active) ?? null
);

export const unversionedChangesAtom = jotaiAtom<UnversionedChange[]>((get) =>
  get(allChangesAtom).filter(Change.isUnversioned)
);

export const useSetActiveChangeList = () =>
  useAtomCallback(
    useCallback((get, set, changeListId: string) => {
      const changeLists = get(changeListsAtom);
      const targetChangeList = changeLists.find(
        ({ id }) => id === changeListId
      );
      if (targetChangeList) {
        set(
          changeListsAtom,
          changeLists.map((changeList) => ({
            ...changeList,
            active: changeList === targetChangeList,
          }))
        );
      }
      // TODO: check if deactivated changelist is empty, and open a confirmation modal window to remove it if confirmed.
    }, [])
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
 *   TODO(jotai): The limitation mentioned above doesn't exist in Jotai. Refactor.
 */
export function SyncChangeListsState() {
  const changes = useAtomValue(allChangesAtom);
  const setChangeLists = useSetAtom(changeListsAtom);
  useEffect(() => {
    setChangeLists((changeLists) => {
      const trackedChanges = changes.filter(
        (change) => !Change.isUnversioned(change)
      );
      const updatedChangeLists = changeLists.map((changeList) => {
        return {
          ...changeList,
          changes: changeList.changes
            .map((change) =>
              trackedChanges.find((aChange) => Change.equals(aChange, change))
            )
            .filter((i) => i != null),
        };
      });
      const existingChanges = updatedChangeLists.flatMap(
        ({ changes }) => changes
      );
      const newChanges = trackedChanges.filter(
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
