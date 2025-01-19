import { IntlMessageFormat } from "intl-messageformat";
import React from "react";
import { atom, useAtomValue } from "jotai";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";
import { useRefreshRepoStatuses } from "../../file-status.state";
import { VcsActionIds } from "../../VcsActionIds";
import { notImplemented } from "../../../Project/notImplemented";
import { actionAtom } from "../../../actionAtom";
import { alertDialogRefAtom } from "../../../Project/project.state";
import { deleteFilesCallback } from "../../../Project/fs-operations";
import { Change } from "../Change";
import { useSetActiveChangeList } from "../change-lists.state";
import {
  changeListsUnderSelection,
  changesUnderSelectedKeysAtom,
} from "./ChangesView.state";

const deleteChangeListMsg = new IntlMessageFormat(
  `Delete {count, plural,
    =1 {Changelist}
    other {Changelists}
  }`,
  "en-US"
);

const selectedFilesCountMsg = new IntlMessageFormat(
  `{count, plural,
    =1 {1 selected file}
    other {# selected files}
  }`,
  "en-US"
);

const deletablePathsUnderChangesTreeSelectionState = atom((get) =>
  [...get(changesUnderSelectedKeysAtom).values()]
    .filter((change) => change.type !== "DELETED")
    .map(Change.path)
);

const deleteActionAtom = actionAtom({
  id: CommonActionId.DELETE,
  title: "Delete",
  description: "Delete selected item",
  isDisabled: atom(
    (get) => get(deletablePathsUnderChangesTreeSelectionState).length === 0
  ),
  actionPerformed: async ({ get, set }) => {
    const pathsToDelete = get(deletablePathsUnderChangesTreeSelectionState);

    const alertDialog = get(alertDialogRefAtom).current;
    if (pathsToDelete.length === 0) {
      return;
    }
    const confirmed = await alertDialog?.confirm({
      title: "Delete",
      okText: "Delete",
      message: (
        <div
          style={{ width: 354 }}
        >{`Are you sure you want to delete ${selectedFilesCountMsg.format({
          count: pathsToDelete.length,
        })}?`}</div>
      ),
    });
    if (confirmed) {
      console.log(`deleting ${pathsToDelete}`);
      await deleteFilesCallback(get, set, pathsToDelete);
    }
  },
});

export function useChangesViewActions() {
  const selectedChangeLists = useAtomValue(changeListsUnderSelection);
  const setActiveChangeList = useSetActiveChangeList();
  const nonActiveSelectedChangeLists = [...selectedChangeLists].filter(
    (list) => !list.active
  );
  const refresh = useRefreshRepoStatuses();

  const actions: ActionDefinition[] = [
    {
      id: CommonActionId.REFRESH,
      title: "Refresh",
      icon: <PlatformIcon icon="actions/refresh.svg" />,
      actionPerformed: refresh,
    },
    {
      id: VcsActionIds.SHELVE_SILENTLY,
      title: "Shelve Silently",
      icon: <PlatformIcon icon="vcs/shelveSilent.svg" />,
      actionPerformed: notImplemented,
    },
    useAtomValue(deleteActionAtom),
  ];
  // Actions are conditionally added instead of being disabled.
  if (selectedChangeLists.size === 1) {
    // FIXME: action should be scoped to change lists tree
    actions.push({
      id: VcsActionIds.RENAME_CHANGELIST,
      title: "Edit Changelist...",
      description: "Edit name and description of selected changelist",
      icon: <PlatformIcon icon="actions/edit.svg" />,
      actionPerformed: notImplemented,
    });
  }
  if (nonActiveSelectedChangeLists.length > 0) {
    actions.push({
      id: VcsActionIds.REMOVE_CHANGELIST,
      title: deleteChangeListMsg.format({
        count: nonActiveSelectedChangeLists.length,
      }) as string,
      description: "Remove changelist and move all changes to another",
      icon: <PlatformIcon icon="general/remove.svg" />,
      actionPerformed: notImplemented,
    });
  }
  if (nonActiveSelectedChangeLists.length === 1) {
    actions.push({
      title: "Set Active Changelist",
      description: "Set changelist to which new changes are placed by default",
      id: VcsActionIds.SET_DEFAULT_CHANGELIST,
      icon: <PlatformIcon icon="actions/selectall.svg" />,
      actionPerformed: () => {
        setActiveChangeList(nonActiveSelectedChangeLists[0].id);
      },
    });
  }
  return actions;
}
