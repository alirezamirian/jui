import { useAtomValue } from "jotai";
import React from "react";
import { ActionDefinition, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../Project/notImplemented";
import { useChangesViewActionDefinitions } from "./Changes/useChangesViewActionDefinitions";
import { VcsActionIds } from "./VcsActionIds";
import { gitAddActionAtom } from "./actions/gitAddAction";
import { gitInitActionAtom } from "./actions/gitInitAction";
import { vcsRootsAtom } from "./file-status.state";
import {
  cloneAnotherRepoActionAtom,
  gitCloneActionAtom,
} from "./actions/gitCloneAction";
import { gitPushActionAtom } from "./Push/gitPushAction";
import { newBranchActionAtom } from "./actions/newBranchAction";
import { branchesActionAtom } from "./actions/branchesAction";

export function useVcsActions(): ActionDefinition[] {
  const gitInitAction = useAtomValue(gitInitActionAtom);
  return [
    ...useChangesViewActionDefinitions(),
    useAtomValue(gitAddActionAtom),
    useAtomValue(gitCloneActionAtom),
    useAtomValue(gitPushActionAtom),
    useAtomValue(cloneAnotherRepoActionAtom),
    // not including git init action if there is at least one git root, because the action is not fully implemented
    // and doesn't allow selecting the directory to initialize as a git repository. FIXME
    ...(useAtomValue(vcsRootsAtom).length === 0 ? [gitInitAction] : []),
    useAtomValue(newBranchActionAtom),
    useAtomValue(branchesActionAtom),
    {
      id: VcsActionIds.GIT_LOG_NAVIGATE_TO_SELECTED_BRANCH,
      title: "Navigate Log to Selected Branch Head",
      useShortcutsOf: "SelectIn",
      icon: <PlatformIcon icon="general/locate.svg" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
  ];
}
