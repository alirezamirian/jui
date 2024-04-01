import { IntlMessageFormat } from "intl-messageformat";
import { useRecoilValue } from "recoil";
import { changeListsUnderSelection } from "./ChangesView.state";
import { useSetActiveChangeList } from "../change-lists.state";
import { useRefreshRepoStatuses } from "../../file-status.state";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";
import { VcsActionIds } from "../../VcsActionIds";
import { notImplemented } from "../../../Project/notImplemented";
import React from "react";

const deleteChangeListMsg = new IntlMessageFormat(
  `Delete {count, plural,
    =1 {Changelist}
    other {Changelists}
  }`,
  "en-US"
);

export function useChangesViewActions() {
  const selectedChangeLists = useRecoilValue(changeListsUnderSelection);
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
