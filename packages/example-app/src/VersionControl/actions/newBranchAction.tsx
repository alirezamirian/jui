import { VcsActionIds } from "../VcsActionIds";
import { PlatformIcon } from "@intellij-platform/core";
import { CreateNewBranchWindow } from "../Branches/CreateNewBranchWindow";
import React from "react";
import { actionAtom } from "../../actionAtom";
import { windowManagerRefAtom } from "../../Project/project.state";

export const newBranchActionAtom = actionAtom({
  id: VcsActionIds.GIT_CREATE_NEW_BRANCH,
  title: "New Branch\u2026",
  description: "Create new branch starting from the selected commit",
  icon: <PlatformIcon icon="general/add.svg" />,
  actionPerformed: ({ get }) => {
    get(windowManagerRefAtom).current?.open(({ close }) => (
      <CreateNewBranchWindow close={close} />
    ));
  },
});
