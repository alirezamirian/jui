import React from "react";
import { selector } from "recoil";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { activePathExistsState } from "../../Project/project.state";

export const copyActionState = selector({
  key: `action.${CommonActionId.COPY}`,
  get: ({ get, getCallback }): ActionDefinition => ({
    id: CommonActionId.COPY,
    title: "Copy",
    description: "Copy to clipboard",
    icon: <PlatformIcon icon="actions/copy" />,
    isDisabled: !get(activePathExistsState),
    actionPerformed: getCallback(({ snapshot }) => async () => {
      notImplemented();
    }),
  }),
});
