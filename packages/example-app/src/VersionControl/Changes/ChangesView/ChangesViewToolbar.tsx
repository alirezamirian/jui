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

import { VcsActionIds } from "../../VcsActionIds";

export function ChangesViewToolbar() {
  return (
    <ActionToolbar hasBorder>
      <Action.Button actionId={VcsActionIds.REFRESH} />
      <Action.Button actionId={VcsActionIds.ROLLBACK} />
      <Action.Button actionId={VcsActionIds.SHOW_DIFF} />
      <TooltipTrigger tooltip={<ActionTooltip actionName="Changelists" />}>
        <ChangeListsActionButton />
      </TooltipTrigger>
      <Action.Button actionId={VcsActionIds.SHELVE_SILENTLY} />
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
