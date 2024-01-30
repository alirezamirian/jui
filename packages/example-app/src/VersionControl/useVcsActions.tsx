import React from "react";
import {
  ActionDefinition,
  PlatformIcon,
  usePopupManager,
  useWindowManager,
} from "@intellij-platform/core";

import { notImplemented } from "../Project/notImplemented";
import { BranchesPopup } from "./Branches/BranchesPopup";
import { useChangesViewActionDefinitions } from "./Changes/useChangesViewActionDefinitions";
import { VcsActionIds } from "./VcsActionIds";
import { CreateNewBranchWindow } from "./Branches/CreateNewBranchWindow";

export function useVcsActions(): ActionDefinition[] {
  const popupManager = usePopupManager();
  const windowManager = useWindowManager();

  return [
    ...useChangesViewActionDefinitions(),
    {
      id: VcsActionIds.GIT_CREATE_NEW_BRANCH,
      title: "New Branch\u2026",
      description: "Create new branch starting from the selected commit",
      icon: <PlatformIcon icon="general/add.svg" />,
      actionPerformed: () => {
        windowManager.open(({ close }) => (
          <CreateNewBranchWindow close={close} />
        ));
      },
    },
    {
      id: VcsActionIds.GIT_BRANCHES,
      title: "Branches\u2026",
      icon: <PlatformIcon icon="vcs/branch.svg" />,
      actionPerformed: () => {
        popupManager.show(({ close }) => <BranchesPopup onClose={close} />);
      },
    },
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
