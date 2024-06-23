import {
  ActionsMenu,
  CommonActionId,
  DividerItem,
  useAction,
} from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";
import React from "react";
import { projectActionIds } from "../Project/projectActionIds";

export function ProjectViewContextMenu() {
  return (
    <ActionsMenu
      aria-label="Project Tree actions"
      actions={[
        {
          ...useAction(projectActionIds.NewElement)!,
          title: "New",
          shortcut: undefined,
        },
        new DividerItem(),
        useAction(CommonActionId.CUT),
        useAction(CommonActionId.COPY),
        useAction(projectActionIds.CopyReferencePopupGroup),
        useAction(CommonActionId.PASTE),
        new DividerItem(),
        useAction(CommonActionId.DELETE),
        new DividerItem(),
      ].filter(notNull)}
    />
  );
}
