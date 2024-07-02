import React from "react";
import { selector } from "recoil";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsState } from "../../Project/project.state";

export const cutActionState = selector({
  key: `action.${CommonActionId.CUT}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: CommonActionId.CUT,
    title: "Cut",
    description: "Cut to clipboard",
    icon: <PlatformIcon icon="actions/menu-cut" />,
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot }) => async () => {
      notImplemented();
    }),
  }),
});
