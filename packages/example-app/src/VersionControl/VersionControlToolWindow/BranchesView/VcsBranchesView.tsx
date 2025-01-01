import React from "react";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import {
  ActionButton,
  ActionDefinition,
  ActionsProvider,
  CommonActionId,
  PlatformIcon,
  Toolbar,
  ToolbarSeparator,
  useTreeActions,
} from "@intellij-platform/core";

import { notImplemented } from "../../../Project/notImplemented";
import { VcsActionIds } from "../../VcsActionIds";
import { BranchesGroupByActionButton } from "./BranchesGroupByActionButton";
import { BranchesTree } from "./BranchesTree";
import { branchesTreeRefAtoms } from "./BranchesTree.state";

const DELETE_BRANCH_ACTION_ID = "Git.DeleteBranch";
const SHOW_BRANCH_DIFF_ACTION_ID = "Git.Compare.With.Current";
const SHOW_MY_BRANCHES_ACTION_ID = "Git.Show.My.Branches";
const FETCH_ACTION_ID = "Git.Fetch";
const TOGGLE_FAVORITE_ACTION_ID = "Git.Toggle.Favorite";

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
`;

export function VcsBranchesView({ tabKey }: { tabKey: string }) {
  const treeRef = useAtomValue(branchesTreeRefAtoms(tabKey));
  const actions: ActionDefinition[] = [
    {
      id: VcsActionIds.GIT_UPDATE_SELECTED,
      title: "Update Selected",
      icon: <PlatformIcon icon="actions/checkOut" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
    {
      id: DELETE_BRANCH_ACTION_ID,
      title: "Delete branch",
      icon: <PlatformIcon icon="actions/gc" />,
      useShortcutsOf: "SafeDelete",
      actionPerformed: () => {
        notImplemented();
      },
    },
    {
      id: SHOW_BRANCH_DIFF_ACTION_ID,
      title: "Compare with current",
      icon: <PlatformIcon icon="actions/diff" />,
      useShortcutsOf: VcsActionIds.SHOW_DIFF,
      actionPerformed: () => {
        notImplemented();
      },
    },
    {
      id: SHOW_MY_BRANCHES_ACTION_ID,
      title: "Show My Branches",
      icon: <PlatformIcon icon="actions/find" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
    {
      id: FETCH_ACTION_ID,
      title: "Fetch All Remotes",
      icon: <PlatformIcon icon="vcs/fetch" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
    {
      id: TOGGLE_FAVORITE_ACTION_ID,
      title: "Mark/Unmark as Favorite",
      icon: <PlatformIcon icon="nodes/favorite" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
    ...useTreeActions({ treeRef }),
  ];

  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <StyledContainer {...shortcutHandlerProps}>
          <VcsLogBranchesViewToolbar />
          <BranchesTree tabKey={tabKey} />
        </StyledContainer>
      )}
    </ActionsProvider>
  );
}

const StyledToolbar = styled(Toolbar)`
  height: 100%;
  flex-shrink: 0;
`;

function VcsLogBranchesViewToolbar() {
  return (
    <StyledToolbar border="right" orientation="vertical">
      <ActionButton actionId={VcsActionIds.GIT_LOG_HIDE_BRANCHES} />
      <ToolbarSeparator />
      {/*FIXME: replace this with a separate "new branch from" action*/}
      <ActionButton actionId={VcsActionIds.GIT_CREATE_NEW_BRANCH} />
      <ActionButton actionId={VcsActionIds.GIT_UPDATE_SELECTED} />
      <ActionButton actionId={DELETE_BRANCH_ACTION_ID} />
      <ActionButton actionId={SHOW_BRANCH_DIFF_ACTION_ID} />
      <ActionButton actionId={SHOW_MY_BRANCHES_ACTION_ID} />
      <ActionButton actionId={FETCH_ACTION_ID} />
      <ActionButton actionId={TOGGLE_FAVORITE_ACTION_ID} />
      <ActionButton
        actionId={VcsActionIds.GIT_LOG_NAVIGATE_TO_SELECTED_BRANCH}
      />
      <ToolbarSeparator />
      <BranchesGroupByActionButton />
      <ActionButton actionId={CommonActionId.EXPAND_ALL} />
      <ActionButton actionId={CommonActionId.COLLAPSE_ALL} />
    </StyledToolbar>
  );
}
