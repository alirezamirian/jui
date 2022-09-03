import { useChangeListManager } from "../change-lists.state";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import {
  AnyNode,
  changesTreeNodesState,
  expandedKeysState,
  GroupNode,
  openRollbackWindowForSelectionCallback,
} from "./ChangesView.state";
import { getExpandAllKeys } from "../../../TreeUtils/tree-utils";
import {
  ActionButton,
  ActionToolbar,
  ActionToolbarSeparator,
  ActionTooltip,
  PlatformIcon,
  TooltipTrigger,
} from "@intellij-platform/core";
import { ChangeListsActionButton } from "./ActionButtons/ChangeListsActionButton";
import { GroupByActionButton } from "./ActionButtons/GroupByActionButton";
import { ViewOptionsActionButton } from "./ActionButtons/ViewOptionsActionButton";
import React from "react";

export function ChangesViewToolbar() {
  const { refresh } = useChangeListManager();
  const openRollbackWindow = useRecoilCallback(
    openRollbackWindowForSelectionCallback,
    []
  );
  const setExpandedKeys = useSetRecoilState(expandedKeysState);
  const collapseAll = () => setExpandedKeys(new Set()); // in Intellij, it also changes selection sometimes.
  const expandAll = useRecoilCallback(
    ({ set, snapshot }) => () => {
      set(
        expandedKeysState,
        new Set(
          getExpandAllKeys<AnyNode>(
            (node) =>
              node === null
                ? snapshot.getLoadable(changesTreeNodesState).valueMaybe()
                    ?.rootNodes || []
                : (node as GroupNode<any>)?.children,
            (item) => item.key
          )
        )
      );
    },
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
      <TooltipTrigger tooltip={<ActionTooltip actionName="Expand All" />}>
        <ActionButton onPress={expandAll}>
          <PlatformIcon icon="actions/expandall.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger tooltip={<ActionTooltip actionName="Collapse All" />}>
        <ActionButton onPress={collapseAll}>
          <PlatformIcon icon="actions/collapseall.svg" />
        </ActionButton>
      </TooltipTrigger>
    </ActionToolbar>
  );
}
