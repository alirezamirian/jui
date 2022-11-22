import { useChangeListManager } from "../change-lists.state";
import { useRecoilCallback } from "recoil";
import { openRollbackWindowForSelectionCallback } from "./ChangesView.state";
import {
  ActionButton,
  ActionToolbar,
  ActionToolbarSeparator,
  ActionTooltip,
  CommonActionId,
  PlatformIcon,
  TooltipTrigger,
} from "@intellij-platform/core";
import { ChangeListsActionButton } from "./ActionButtons/ChangeListsActionButton";
import { GroupByActionButton } from "./ActionButtons/GroupByActionButton";
import { ViewOptionsActionButton } from "./ActionButtons/ViewOptionsActionButton";
import React from "react";
import { Action } from "@intellij-platform/core/ActionSystem/components";

export function ChangesViewToolbar() {
  const { refresh } = useChangeListManager();
  const openRollbackWindow = useRecoilCallback(
    openRollbackWindowForSelectionCallback,
    []
  );
  return (
    <ActionToolbar hasBorder>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Refresh" />}>
        <ActionButton onPress={refresh}>
          <PlatformIcon icon="actions/refresh.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Rollback..." />}>
        <ActionButton onPress={openRollbackWindow}>
          <PlatformIcon icon="actions/rollback.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Show Diff" />}>
        <ActionButton onPress={() => alert("Not implemented")}>
          <PlatformIcon icon="actions/diff.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Changelists" />}>
        <ChangeListsActionButton />
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Shelve Silently" />}>
        <ActionButton onPress={() => alert("Not implemented")}>
          <PlatformIcon icon="vcs/shelveSilent.svg" />
        </ActionButton>
      </TooltipTrigger>
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
