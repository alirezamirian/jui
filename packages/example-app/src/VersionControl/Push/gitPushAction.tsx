import { PlatformIcon } from "@intellij-platform/core";
import React from "react";

import { windowManagerRefAtom } from "../../Project/project.state";
import { actionAtom } from "../../actionAtom";
import { VcsActionIds } from "../VcsActionIds";
import { GitPushWindow } from "./GitPushWindow";
import { atom } from "jotai";
import { vcsRootsAtom } from "../file-status.state";

export const gitPushActionAtom = actionAtom({
  id: VcsActionIds.GIT_PUSH,
  title: "Push...",
  icon: <PlatformIcon icon="vcs/push.svg" />,
  isDisabled: atom((get) => get(vcsRootsAtom).length === 0),
  actionPerformed: async ({ get, set }) => {
    const windowManager = get(windowManagerRefAtom).current;
    windowManager?.open(({ close }) => <GitPushWindow close={close} />);
  },
});
