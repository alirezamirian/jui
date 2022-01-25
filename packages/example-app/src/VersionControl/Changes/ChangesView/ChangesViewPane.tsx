import { useRecoilCallback, useSetRecoilState } from "recoil";
import React from "react";
import {
  ActionButton,
  ActionToolbar,
  ActionToolbarSeparator,
  PlatformIcon,
} from "@intellij-platform/core";
import { ViewOptionsActionButton } from "./ActionButtons/ViewOptionsActionButton";
import { GroupByActionButton } from "./ActionButtons/GroupByActionButton";
import { ChangeListsActionButton } from "./ActionButtons/ChangeListsActionButton";
import { useChangeListManager } from "../change-lists.state";
import { ChangeViewTree } from "./ChangeViewTree";
import { getExpandAllKeys } from "../../../TreeUtils/tree-utils";
import {
  AnyNode,
  changesTreeNodesState,
  expandedKeysState,
  GroupNode,
} from "./ChangesView.state";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChangesViewPane = () => {
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
    <StyledContainer>
      <ActionToolbar hasBorder>
        <ActionButton onPress={refresh}>
          <PlatformIcon icon="actions/refresh.svg" />
        </ActionButton>
        <ActionButton>
          <PlatformIcon icon="actions/rollback.svg" />
        </ActionButton>
        <ActionButton>
          <PlatformIcon icon="actions/diff.svg" />
        </ActionButton>
        <ChangeListsActionButton />
        <ActionButton>
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
      <ChangeViewTree />
    </StyledContainer>
  );
};
