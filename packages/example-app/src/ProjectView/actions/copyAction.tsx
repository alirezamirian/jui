import React from "react";
import { atom } from "jotai";
import { CommonActionId, PlatformIcon } from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsAtom } from "../../Project/project.state";
import { actionAtom } from "../../actionAtom";

export const copyActionAtom = actionAtom({
  id: CommonActionId.COPY,
  title: "Copy",
  description: "Copy to clipboard",
  icon: <PlatformIcon icon="actions/copy" />,
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async () => {
    notImplemented();
  },
});
