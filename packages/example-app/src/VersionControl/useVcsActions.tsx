import React from "react";
import {
  ActionDefinition,
  PlatformIcon,
  usePopupManager,
  useWindowManager,
} from "@intellij-platform/core";
import {
  BRANCHES_POPUP_MIN_HEIGHT,
  BRANCHES_POPUP_MIN_WIDTH,
  BranchesPopup,
  branchesPopupSizeState,
} from "./Branches/BranchesPopup";
import { useChangesViewActionDefinitions } from "./Changes/useChangesViewActionDefinitions";
import { VcsActionIds } from "./VcsActionIds";
import { CreateNewBranchWindow } from "./Branches/CreateNewBranchWindow";
import { useRecoilValue } from "recoil";

export function useVcsActions(): ActionDefinition[] {
  const popupManager = usePopupManager();
  const { openModalWindow } = useWindowManager();
  const branchesPopupSize = useRecoilValue(branchesPopupSizeState);

  return [
    ...useChangesViewActionDefinitions(),
    {
      id: VcsActionIds.GIT_CREATE_NEW_BRANCH,
      title: "New Branch\u2026",
      description: "Create new branch starting from the selected commit",
      icon: <PlatformIcon icon="general/add.svg" />,
      actionPerformed: () => {
        openModalWindow(
          ({ close }) => <CreateNewBranchWindow close={close} />,
          {
            minWidth: "content",
            minHeight: "content",
          }
        );
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
  ];
}
