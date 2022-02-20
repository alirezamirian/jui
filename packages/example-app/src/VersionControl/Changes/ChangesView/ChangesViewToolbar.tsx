import { useChangeListManager } from "../change-lists.state";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import {
  AnyNode,
  changesTreeNodesState,
  expandedKeysState,
  GroupNode,
} from "./ChangesView.state";
import { getExpandAllKeys } from "../../../TreeUtils/tree-utils";
import {
  ActionButton,
  ActionToolbar,
  ActionToolbarSeparator,
  PlatformIcon,
} from "@intellij-platform/core";
import { ChangeListsActionButton } from "./ActionButtons/ChangeListsActionButton";
import { GroupByActionButton } from "./ActionButtons/GroupByActionButton";
import { ViewOptionsActionButton } from "./ActionButtons/ViewOptionsActionButton";
import React from "react";

export function ChangesViewToolbar() {
  const { refresh } = useChangeListManager();

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
      <ActionButton onPress={refresh}>
        <PlatformIcon icon="actions/refresh.svg" />
      </ActionButton>
      <ActionButton onPress={() => alert("Not implemented")}>
        <PlatformIcon icon="actions/rollback.svg" />
      </ActionButton>
      <ActionButton onPress={() => alert("Not implemented")}>
        <PlatformIcon icon="actions/diff.svg" />
      </ActionButton>
      <ChangeListsActionButton />
      <ActionButton onPress={() => alert("Not implemented")}>
        <PlatformIcon icon="vcs/shelveSilent.svg" />
      </ActionButton>
      <ActionToolbarSeparator />
      <GroupByActionButton />
      <ViewOptionsActionButton />
      <ActionButton onPress={expandAll}>
        <PlatformIcon icon="actions/expandall.svg" />
      </ActionButton>
      <ActionButton onPress={collapseAll}>
        <PlatformIcon icon="actions/collapseall.svg" />
      </ActionButton>
    </ActionToolbar>
  );
}
