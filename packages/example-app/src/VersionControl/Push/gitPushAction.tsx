import { PlatformIcon } from "@intellij-platform/core";
import React from "react";

import { windowManagerRefAtom } from "../../Project/project.state";
import { actionAtom } from "../../actionAtom";
import { VcsActionIds } from "../VcsActionIds";
import { GitPushWindow } from "./GitPushWindow";

export const gitPushActionAtom = actionAtom({
  id: VcsActionIds.GIT_PUSH,
  title: "Push...",
  icon: <PlatformIcon icon="vcs/push.svg" />,
  actionPerformed: async ({ get, set }) => {
    const windowManager = get(windowManagerRefAtom).current;
    windowManager?.open(({ close }) => <GitPushWindow close={close} />);
  },
});
