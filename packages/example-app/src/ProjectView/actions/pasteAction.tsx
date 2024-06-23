import React from "react";
import { selector } from "recoil";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsState } from "../../Project/project.state";

export const pasteActionState = selector({
  key: `action.${CommonActionId.PASTE}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: CommonActionId.PASTE,
    title: "Paste",
    description: "Paste from clipboard",
    icon: <PlatformIcon icon="actions/menu-paste" />,
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot }) => async () => {
      notImplemented();
    }),
  }),
});
