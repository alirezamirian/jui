import React from "react";
import { atom } from "jotai";
import { CommonActionId, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsAtom } from "../../Project/project.state";
import { actionAtom } from "../../actionAtom";

export const cutActionAtom = actionAtom({
  id: CommonActionId.CUT,
  title: "Cut",
  description: "Cut to clipboard",
  icon: <PlatformIcon icon="actions/menu-cut" />,
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async () => {
    notImplemented();
  },
});
