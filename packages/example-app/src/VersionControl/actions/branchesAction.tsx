import { VcsActionIds } from "../VcsActionIds";
import { PlatformIcon } from "@intellij-platform/core";
import React from "react";
import { actionAtom } from "../../actionAtom";
import { projectPopupManagerRefAtom } from "../../Project/project.state";
import { BranchesPopup } from "../Branches/BranchesPopup";

export const branchesActionAtom = actionAtom({
  id: VcsActionIds.GIT_BRANCHES,
  title: "Branches\u2026",
  icon: <PlatformIcon icon="vcs/branch.svg" />,
  actionPerformed: ({ get }) => {
    get(projectPopupManagerRefAtom).current?.show(({ close }) => (
      <BranchesPopup close={close} />
    ));
  },
});
