import { ActionDefinition, PlatformIcon } from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback } from "recoil";
import { openRollbackWindowForSelectionCallback } from "./ChangesView/ChangesView.state";
import { useChangeListManager } from "./change-lists.state";

export const ChangesViewActionIds = {
  ROLLBACK: "ChangesView.Revert",
  REFRESH: "ChangesView.Refresh",
  SHELVE_SILENTLY: "ChangesView.ShelveSilently",
  UNSHELVE_SILENTLY: "ChangesView.UnshelveSilently",
  SHOW_DIFF: "Diff.ShowDiff", // Maybe doesn't belong here?
};

export const useChangesViewActions = (): Record<string, ActionDefinition> => {
  const openRollbackWindow = useRecoilCallback(
    // FIXME: selection should be used to pre-include changes based on "active path" context, which can come from editor
    //  projects pane, changes view, etc.
    openRollbackWindowForSelectionCallback,
    []
  );
  const { refresh } = useChangeListManager();

  return {
    [ChangesViewActionIds.ROLLBACK]: {
      title: "Rollback...",
      icon: <PlatformIcon icon="actions/rollback.svg" />,
      actionPerformed: openRollbackWindow,
    },
    [ChangesViewActionIds.REFRESH]: {
      title: "Refresh",
      icon: <PlatformIcon icon="actions/refresh.svg" />,
      actionPerformed: refresh,
    },
    [ChangesViewActionIds.SHOW_DIFF]: {
      title: "Show Diff",
      icon: <PlatformIcon icon="actions/diff.svg" />,
      actionPerformed: () => alert("Not implemented"),
    },
    [ChangesViewActionIds.SHELVE_SILENTLY]: {
      title: "Shelve Silently",
      icon: <PlatformIcon icon="vcs/shelveSilent.svg" />,
      actionPerformed: () => alert("Not implemented"),
    },
  };
};
