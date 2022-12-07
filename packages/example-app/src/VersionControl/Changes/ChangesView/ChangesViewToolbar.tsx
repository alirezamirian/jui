import {
  ActionToolbar,
  ActionToolbarSeparator,
  ActionTooltip,
  CommonActionId,
  TooltipTrigger,
} from "@intellij-platform/core";
import { ChangeListsActionButton } from "./ActionButtons/ChangeListsActionButton";
import { GroupByActionButton } from "./ActionButtons/GroupByActionButton";
import { ViewOptionsActionButton } from "./ActionButtons/ViewOptionsActionButton";
import React from "react";
import { Action } from "@intellij-platform/core/ActionSystem/components";
import { ChangesViewActionIds } from "../useChangesViewActions";

export function ChangesViewToolbar() {
  return (
    <ActionToolbar hasBorder>
      <Action.Button actionId={ChangesViewActionIds.REFRESH} />
      <Action.Button actionId={ChangesViewActionIds.ROLLBACK} />
      <Action.Button actionId={ChangesViewActionIds.SHOW_DIFF} />
      <TooltipTrigger tooltip={<ActionTooltip actionName="Changelists" />}>
        <ChangeListsActionButton />
      </TooltipTrigger>
      <Action.Button actionId={ChangesViewActionIds.SHELVE_SILENTLY} />
      <ActionToolbarSeparator />
      <TooltipTrigger tooltip={<ActionTooltip actionName="Group By" />}>
        <GroupByActionButton />
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="View Options" />}>
        <ViewOptionsActionButton />
      </TooltipTrigger>
      <Action.Button actionId={CommonActionId.EXPAND_ALL} />
      <Action.Button actionId={CommonActionId.COLLAPSE_ALL} />
    </ActionToolbar>
  );
}
