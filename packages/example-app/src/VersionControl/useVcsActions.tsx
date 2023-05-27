import React from "react";
import {
  ActionDefinition,
  PlatformIcon,
  usePopupManager,
} from "@intellij-platform/core";
import { BranchesPopupContent } from "./Branches/BranchesPopupContent";
import { useChangesViewActionDefinitions } from "./Changes/useChangesViewActionDefinitions";

export function useVcsActions(): ActionDefinition[] {
  const { show } = usePopupManager();

  return [
    ...useChangesViewActionDefinitions(),
    {
      id: "Git.Branches",
      title: "Branches\u2026",
      icon: <PlatformIcon icon="vcs/branch.svg" />,
      actionPerformed: () => {
        show(({ close }) => <BranchesPopupContent onClose={close} />);
      },
    },
  ];
}
