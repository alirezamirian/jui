import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { ActionDefinition, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import {
  changeListsUnderSelection,
  changesTreeNodesState,
  changesUnderSelectedKeys,
  expandedKeysState,
  includedChangeKeysState,
  openRollbackWindowForSelectionCallback,
  queueCheckInCallback,
  selectedKeysState,
} from "./ChangesView/ChangesView.state";
import {
  allChangesState,
  useRefreshChanges,
  useSetActiveChangeList,
} from "./change-lists.state";
import { COMMIT_TOOLWINDOW_ID } from "../CommitToolWindow";
import { VcsActionIds } from "../VcsActionIds";
import { useToolWindowManager } from "../../Project/useToolWindowManager";
import { focusCommitMessage } from "./ChangesView/ChangesViewSplitter";
import {
  activePathsState,
  currentProjectFilesState,
} from "../../Project/project.state";
import path from "path";
import { IntlMessageFormat } from "intl-messageformat";
import { useEditorStateManager } from "../../Editor/editor.state";
import {
  AnyNode,
  getNodeKeyForChange,
  isGroupNode,
} from "./ChangesView/change-view-nodes";
import { getExpandedToNodesKeys } from "@intellij-platform/core/utils/tree-utils";

export const useChangesViewActionDefinitions = (): ActionDefinition[] => {
  const openRollbackWindow = useRecoilCallback(
    openRollbackWindowForSelectionCallback,
    []
  );
  const refresh = useRefreshChanges();

  return [
    useCheckInActionDefinition(),
    useCheckInProjectAction(),
    useJumpToSourceAction(),
    {
      id: VcsActionIds.ROLLBACK,
      title: "Rollback...",
      icon: <PlatformIcon icon="actions/rollback.svg" />,
      actionPerformed: (event) => {
        openRollbackWindow(Boolean(event));
      },
    },
    {
      id: VcsActionIds.REFRESH,
      title: "Refresh",
      icon: <PlatformIcon icon="actions/refresh.svg" />,
      actionPerformed: refresh,
    },
    {
      id: VcsActionIds.SHOW_DIFF,
      title: "Show Diff",
      icon: <PlatformIcon icon="actions/diff.svg" />,
      actionPerformed: notImplemented,
    },
    {
      id: VcsActionIds.SHELVE_SILENTLY,
      title: "Shelve Silently",
      icon: <PlatformIcon icon="vcs/shelveSilent.svg" />,
      actionPerformed: notImplemented,
    },
    {
      id: VcsActionIds.SHELVE,
      title: "Shelve Changes...",
      description:
        "Save changes to an external patch file and remove them from the code",
      icon: <PlatformIcon icon="vcs/shelve.svg" />,
      actionPerformed: notImplemented,
    },
    ...useChangeListActionDefinitions(),
  ];
};

const commitFileMsg = new IntlMessageFormat(
  `{count, plural,
    =1 {Commit File...}
    other {Commit Files...}
  }`,
  "en-US"
);
const commitDirMsg = new IntlMessageFormat(
  `{count, plural,
    =1 {Commit Directory...}
    other {Commit Directories...}
  }`,
  "en-US"
);

function useCheckInActionDefinition(): ActionDefinition {
  const queueCheckIn = useRecoilCallback(queueCheckInCallback, []);
  const toolWindowManager = useToolWindowManager();
  const activePaths = useRecoilValue(activePathsState);
  const projectFiles = useRecoilValue(currentProjectFilesState);
  const roots = activePaths.filter(
    (path) =>
      !activePaths.find(
        (activePath) => path !== activePath && path.startsWith(activePath)
      )
  );

  const isDir = projectFiles.find(
    (item) => path.dirname(item.path).startsWith(roots[0]) // This is not quite accurate!
  );
  const allChanges = useRecoilValue(allChangesState);
  const containsChange = roots.some((root) =>
    allChanges.find((change) => isPathInside(root, change.after.path))
  );

  return {
    id: VcsActionIds.CHECKIN_FILES,
    title: isDir
      ? (commitDirMsg.format({ count: roots.length }) as string)
      : (commitFileMsg.format({ count: roots.length }) as string),
    isDisabled: !containsChange,
    actionPerformed: () => {
      queueCheckIn();
      toolWindowManager.open(COMMIT_TOOLWINDOW_ID);
      focusCommitMessage();
    },
  };
}
function useCheckInProjectAction(): ActionDefinition {
  const toolWindowManager = useToolWindowManager();

  const queueChanges = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const includedChangesKeys = snapshot
          .getLoadable(includedChangeKeysState)
          .getValue();
        let keyToSelect = includedChangesKeys.values().next().value;
        if (includedChangesKeys.size === 0) {
          const allKeys = snapshot
            .getLoadable(allChangesState)
            .getValue()
            .map(getNodeKeyForChange);
          set(includedChangeKeysState, new Set(allKeys));
          keyToSelect = allKeys[0];
        }
        if (keyToSelect) {
          const { rootNodes } = snapshot
            .getLoadable(changesTreeNodesState)
            .getValue();
          set(
            expandedKeysState,
            new Set([
              ...snapshot.getLoadable(expandedKeysState).getValue(),
              ...getExpandedToNodesKeys(
                (node) => (isGroupNode(node) ? node.children : null),
                (node) => node.key,
                rootNodes as AnyNode[],
                [keyToSelect]
              ),
            ])
          );
          set(selectedKeysState, new Set([keyToSelect]));
        }
      },
    []
  );

  return {
    id: VcsActionIds.CHECKIN_PROJECT,
    title: "Commit",
    actionPerformed: () => {
      queueChanges();
      toolWindowManager.open(COMMIT_TOOLWINDOW_ID);
      focusCommitMessage();
    },
  };
}

function useJumpToSourceAction(): ActionDefinition {
  const editorStateManager = useEditorStateManager();
  const selectedChanges = useRecoilValue(changesUnderSelectedKeys);

  return {
    id: VcsActionIds.JUMP_TO_SOURCE,
    title: "Jump to source",
    icon: <PlatformIcon icon="actions/editSource.svg" />,
    actionPerformed: () => {
      [...selectedChanges].forEach((change, index, arr) => {
        if (!change.after.isDir) {
          editorStateManager.openPath(
            change.after.path,
            index === arr.length - 1
          );
        }
      });
    },
  };
}

const deleteChangeListMsg = new IntlMessageFormat(
  `Delete {count, plural,
    =1 {Changelist}
    other {Changelists}
  }`,
  "en-US"
);
function useChangeListActionDefinitions(): ActionDefinition[] {
  const selectedChangeLists = useRecoilValue(changeListsUnderSelection);
  const selectedChanges = useRecoilValue(changesUnderSelectedKeys);
  const setActiveChangeList = useSetActiveChangeList();
  const nonActiveSelectedChangeLists = [...selectedChangeLists].filter(
    (list) => !list.active
  );

  const actions: ActionDefinition[] = [
    {
      id: VcsActionIds.NEW_CHANGELIST,
      title: "New Changelist...",
      description: "Create new changelist",
      icon: <PlatformIcon icon="general/add.svg" />,
      actionPerformed: notImplemented,
    },
  ];

  // Actions are conditionally added instead of being disabled.
  if (selectedChangeLists.size === 1) {
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
  if (selectedChanges.size > 0) {
    actions.push({
      title: "Move to Another Changelist...",
      description: "Move selected changes to another changelist",
      id: VcsActionIds.MOVE_TO_ANOTHER_CHANGELIST,
      actionPerformed: notImplemented,
    });
  }
  return actions;
}

function isPathInside(parent: string, dir: string) {
  const relative = path.relative(parent, dir);
  return (
    !relative /* If parent and dir are the same, `relative` will be an empty string. We want to return true in this edge case*/ ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}
