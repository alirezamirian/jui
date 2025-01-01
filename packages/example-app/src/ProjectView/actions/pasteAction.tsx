import React from "react";
import { atom } from "jotai";
import { CommonActionId, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsAtom } from "../../Project/project.state";
import { actionAtom } from "../../actionAtom";

export const pasteActionAtom = actionAtom({
  id: CommonActionId.PASTE,
  title: "Paste",
  description: "Paste from clipboard",
  icon: <PlatformIcon icon="actions/menu-paste" />,
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async () => {
    notImplemented();
  },
});
