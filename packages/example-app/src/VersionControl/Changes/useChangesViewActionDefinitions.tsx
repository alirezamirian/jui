import React, { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import path from "path";
import { ActionDefinition, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import {
  changesTreeNodesAtom,
  changesUnderSelectedKeysAtom,
  ChangesViewTreeNode,
  expandedKeysAtom,
  includedChangeKeysAtom,
  openRollbackWindowForSelectionCallback,
  queueCheckInCallback,
  selectedKeysAtom,
} from "./ChangesView/ChangesView.state";
import { allChangesAtom } from "./changes.state";
import { IntlMessageFormat } from "intl-messageformat";
import { getExpandedToNodesKeys } from "@intellij-platform/core/utils/tree-utils";

import { COMMIT_TOOLWINDOW_ID } from "../CommitToolWindow";
import { VcsActionIds } from "../VcsActionIds";
import { useToolWindowManager } from "../../Project/useToolWindowManager";
import { focusCommitMessageAtom } from "./ChangesView/ChangesViewSplitter";
import {
  activePathsAtom,
  currentProjectFilesAtom,
} from "../../Project/project.state";
import { useEditorStateManager } from "../../Editor/editor.state";
import { getNodeKeyForChange, isGroupNode } from "./ChangesTree/ChangeTreeNode";
import { Change } from "./Change";
import { findRootPaths } from "../../path-utils";
import { useRefreshRepoStatuses } from "../file-status.state";
import { activeChangeListState } from "./change-lists.state";

import { unwrapLatestOrNull } from "../../atom-utils/unwrapLatest";

export const useChangesViewActionDefinitions = (): ActionDefinition[] => {
  const openRollbackWindow = useAtomCallback(
    openRollbackWindowForSelectionCallback
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
  const queueCheckIn = useAtomCallback(queueCheckInCallback);
  const toolWindowManager = useToolWindowManager();
  const focusCommitMessage = useSetAtom(focusCommitMessageAtom);
  const activePaths = useAtomValue(activePathsAtom);
  const projectFiles = useAtomValue(
    unwrapLatestOrNull(currentProjectFilesAtom)
  );
  const roots = findRootPaths(activePaths);

  const allChanges = useAtomValue(allChangesAtom);
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
  const focusCommitMessage = useSetAtom(focusCommitMessageAtom);

  const queueChanges = useAtomCallback(
    useCallback((get, set) => {
      const includedChangesKeys = get(includedChangeKeysAtom);
      let keyToSelect = includedChangesKeys.values().next().value;
      if (includedChangesKeys.size === 0) {
        const allKeys = get(activeChangeListState)?.changes.map(
          getNodeKeyForChange
        );
        set(includedChangeKeysAtom, new Set(allKeys));
        keyToSelect = allKeys?.[0];
      }
      if (keyToSelect) {
        const { rootNodes } = get(changesTreeNodesAtom);
        set(
          expandedKeysAtom,
          new Set([
            ...get(expandedKeysAtom),
            ...getExpandedToNodesKeys(
              (node) => (isGroupNode(node) ? node.children : null),
              (node) => node.key,
              rootNodes as ChangesViewTreeNode[],
              [keyToSelect]
            ),
          ])
        );
        set(selectedKeysAtom, new Set([keyToSelect]));
      }
    }, [])
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
  const selectedChanges = useAtomValue(changesUnderSelectedKeysAtom);

  return {
    id: VcsActionIds.JUMP_TO_SOURCE,
    title: "Jump to source",
    icon: <PlatformIcon icon="actions/editSource.svg" />,
    actionPerformed: () => {
      [...selectedChanges].forEach((change, index, arr) => {
        const changePath = Change.path(change);
        if (!changePath) {
          editorStateManager.openPath(changePath, index === arr.length - 1);
        }
      });
    },
  };
}

function useChangeListActionDefinitions(): ActionDefinition[] {
  const selectedChanges = useAtomValue(changesUnderSelectedKeysAtom);

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
