import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  ActionButton,
  ActionDefinition,
  ActionsProvider,
  CommonActionId,
  MultiViewToolWindow,
  PlatformIcon,
  ThreeViewSplitter,
  Toolbar,
  ToolbarSeparator,
  useTreeActions,
} from "@intellij-platform/core";

import { VcsActionIds } from "../VcsActionIds";
import { notImplemented } from "../../Project/notImplemented";
import { BranchesTree } from "./BranchesTree";
import { BranchesGroupByActionButton } from "./BranchesGroupByActionButton";
import { branchesTreeRefState } from "./BranchesTree.state";

export const VERSION_CONTROL_TOOLWINDOW_ID = "Version Control";

const DELETE_BRANCH_ACTION_ID = "Git.DeleteBranch";
const SHOW_BRANCH_DIFF_ACTION_ID = "Git.Compare.With.Current";
const SHOW_MY_BRANCHES_ACTION_ID = "Git.Show.My.Branches";
const FETCH_ACTION_ID = "Git.Fetch";
const TOGGLE_FAVORITE_ACTION_ID = "Git.Toggle.Favorite";

const firstViewSizeState = atom({
  key: "vcs/toolwindow/firstViewSize",
  default: 0.25,
});
const lastViewSizeState = atom({
  key: "vcs/toolwindow/lastViewSize",
  default: 0.25,
});

export const VersionControlToolWindow = () => {
  const treeRef = useRecoilValue(branchesTreeRefState);

  const actions: ActionDefinition[] = [
    {
      id: VcsActionIds.GIT_LOG_HIDE_BRANCHES,
      title: "Hide Git Branches",
      icon: <PlatformIcon icon="actions/arrowCollapse" />,
      actionPerformed: () => {
        notImplemented();
      },
    },
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

  const [firstViewSize, setFirstViewSize] = useRecoilState(firstViewSizeState);
  const [lastViewSize, setLastViewSize] = useRecoilState(lastViewSizeState);
  return (
    <MultiViewToolWindow
      headerContent={<span style={{ margin: "0 .5rem 0 0.125rem" }}>Git:</span>}
    >
      <MultiViewToolWindow.View tabContent="Log" key="log">
        <ActionsProvider actions={actions}>
          {({ shortcutHandlerProps }) => (
            <div
              {...shortcutHandlerProps}
              style={{ height: "100%", display: "flex" }}
            >
              <VersionControlToolbar />

              <ThreeViewSplitter
                firstView={<BranchesTree />}
                firstSize={firstViewSize}
                onFirstResize={setFirstViewSize}
                lastSize={lastViewSize}
                onLastResize={setLastViewSize}
                innerView={<div></div>}
                lastView={<div></div>}
              />
            </div>
          )}
        </ActionsProvider>
      </MultiViewToolWindow.View>
    </MultiViewToolWindow>
  );
};

function VersionControlToolbar() {
  return (
    <Toolbar border="right" orientation="vertical" style={{ height: "100%" }}>
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
    </Toolbar>
  );
}
