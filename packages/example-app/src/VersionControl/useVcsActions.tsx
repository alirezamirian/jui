import {
  ActionDefinition,
  PlatformIcon,
  usePopupManager,
} from "@intellij-platform/core";
import { BranchesPopupContent } from "./Branches/BranchesPopupContent";
import React from "react";

export function useVcsActions(): ActionDefinition[] {
  const { show } = usePopupManager();

  return [
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
