import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import {
  changesTreeNodesState,
  changesUnderSelectedKeys,
  ChangesViewTreeNode,
  expandedKeysState,
  includedChangeKeysState,
  openRollbackWindowForSelectionCallback,
  queueCheckInCallback,
  selectedKeysState,
} from "./ChangesView/ChangesView.state";
import { allChangesState } from "./change-lists.state";
import path from "path";
import { IntlMessageFormat } from "intl-messageformat";
import { getExpandedToNodesKeys } from "@intellij-platform/core/utils/tree-utils";

import { COMMIT_TOOLWINDOW_ID } from "../CommitToolWindow";
import { VcsActionIds } from "../VcsActionIds";
import { useToolWindowManager } from "../../Project/useToolWindowManager";
import { focusCommitMessage } from "./ChangesView/ChangesViewSplitter";
import {
  activePathsState,
  currentProjectFilesState,
} from "../../Project/project.state";
import { useEditorStateManager } from "../../Editor/editor.state";
import { getNodeKeyForChange, isGroupNode } from "./ChangesTree/ChangeTreeNode";
import { Change } from "./Change";
import { useLatestRecoilValue } from "../../recoil-utils";
import { findRootPaths } from "../../path-utils";
import { useRefreshRepoStatuses } from "../file-status.state";

export const useChangesViewActionDefinitions = (): ActionDefinition[] => {
  const openRollbackWindow = useRecoilCallback(
    openRollbackWindowForSelectionCallback,
    []
  );
  const refresh = useRefreshRepoStatuses();

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
      title: "Refresh VCS Changes",
      description: "Refresh VCS Changes",
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
  const [projectFiles] = useLatestRecoilValue(currentProjectFilesState);
  const roots = findRootPaths(activePaths);

  const allChanges = useRecoilValue(allChangesState);
  const containsChange = roots.some((root) =>
    allChanges.find((change) => isPathInside(root, Change.path(change)))
  );

  // The logic here is a little better than the reference impl, which itself is inconsistent in project view
  // and in Changes view (aka commit view).
  const isDirectory = (path: string) =>
    projectFiles?.some((item) => item.type === "dir" && item.path === path);
  const selectedPathsAreDirectories = roots.every(isDirectory);
  return {
    id: VcsActionIds.CHECKIN_FILES,
    title: selectedPathsAreDirectories
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
                rootNodes as ChangesViewTreeNode[],
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
        if (!change.after?.isDir) {
          editorStateManager.openPath(
            Change.path(change),
            index === arr.length - 1
          );
        }
      });
    },
  };
}

function useChangeListActionDefinitions(): ActionDefinition[] {
  const selectedChanges = useRecoilValue(changesUnderSelectedKeys);

  const actions: ActionDefinition[] = [
    {
      id: VcsActionIds.NEW_CHANGELIST,
      title: "New Changelist...",
      description: "Create new changelist",
      icon: <PlatformIcon icon="general/add.svg" />,
      actionPerformed: notImplemented,
    },
  ];
  if (selectedChanges.size > 0) {
    // FIXME: should use active paths, not selection
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
