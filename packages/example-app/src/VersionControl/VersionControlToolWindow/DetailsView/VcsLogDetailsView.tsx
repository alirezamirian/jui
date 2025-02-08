import React, { HTMLAttributes, useCallback } from "react";
import { Atom, atom, useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import {
  ActionButton,
  ActionGroupMenu,
  ActionsProvider,
  ActionTooltip,
  CommonActionId,
  IconButton,
  IconButtonWithMenu,
  PlatformIcon,
  SpeedSearchMenu,
  styled,
  ThreeViewSplitter,
  Toolbar,
  TooltipTrigger,
  useActionGroup,
  useCreateDefaultActionGroup,
  useTreeActions,
} from "@intellij-platform/core";
import { StyledHeader, StyledSpacer } from "../styled-components";
import { CommitChangedFiles } from "../CommitChanges/CommitsChangedFiles";
import { CommitDetails } from "./CommitDetails";
import { defaultChangeGroupings } from "../../Changes/ChangesTree/changesGroupings";
import {
  changesGroupingActiveAtoms,
  commitChangesTreeRefAtom,
} from "../CommitChanges/CommitsChangedFiles.state";
import {
  vcsLogTabShowCommitDetailsInCurrentTabAtom,
  vcsLogTabShowCommitDetailsAtoms,
} from "../vcs-logs.state";
import { VcsActionIds } from "../../VcsActionIds";
import { useRedefineAction } from "../../../useRedefineAction";

import { isAtom } from "../../../atom-utils/isAtom";

const splitViewSizeState = atom(0.5);

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const groupingAtom = atom((get) => {
  const groupings = defaultChangeGroupings.filter((grouping) =>
    isAtom(grouping.isAvailable)
      ? get(grouping.isAvailable)
      : grouping.isAvailable
  );
  return groupings.map((grouping) => ({
    ...grouping,
    key: `groupBy:${grouping.id}`,
    isActive: get(changesGroupingActiveAtoms(grouping.id)),
  }));
});

const GROUP_BY_ACTION_GROUP_ID = "Vcs.log.detailsView.groupBy";
const LAYOUT_ACTION_GROUP_ID = "Vcs.log.detailsView.layout";
const VIEW_OPTIONS_ACTION_GROUP_ID = "Vcs.log.detailsView.viewOptions";
const SHOW_DETAILS_ACTION_ID = `${LAYOUT_ACTION_GROUP_ID}.${VcsActionIds.SHOW_DETAILS}`;
const SHOW_DIFF_PREVIEW_ACTION_ID = `${LAYOUT_ACTION_GROUP_ID}.${VcsActionIds.SHOW_DIFF_PREVIEW}`;

const groupingActionId = (grouping: { id: string }) => {
  return `Vcs.log.detailsView.groupBy.${grouping.id}`;
};

export function VcsLogDetailsView({ tabKey }: { tabKey: string }) {
  const [splitViewSize, setSplitViewSize] = useAtom(splitViewSizeState);
  const isDetailsVisible = useAtomValue(
    vcsLogTabShowCommitDetailsAtoms(tabKey)
  );
  const toggleGroupBy = useAtomCallback(
    useCallback((get, set, id: string) => {
      set(changesGroupingActiveAtoms(id), (currentValue) => !currentValue);
    }, [])
  );
  const createActionGroup = useCreateDefaultActionGroup();
  const availableGroupings = useAtomValue(groupingAtom);

  const treeRef = useAtomValue(commitChangesTreeRefAtom);
  const actions = [
    createActionGroup({
      id: VIEW_OPTIONS_ACTION_GROUP_ID,
      title: "View Options",
      icon: <PlatformIcon icon="actions/groupBy.svg" />,
      children: [
        createActionGroup({
          id: GROUP_BY_ACTION_GROUP_ID,
          title: "Group By",
          menuPresentation: "titledSection",
          icon: <PlatformIcon icon="actions/groupBy.svg" />,

          children: availableGroupings.map((grouping) => ({
            id: groupingActionId(grouping),
            useShortcutsOf: grouping.useShortcutOf,
            title: grouping.title,
            actionPerformed: () => {
              toggleGroupBy(grouping.id);
            },
          })),
        }),
        createActionGroup({
          id: LAYOUT_ACTION_GROUP_ID,
          menuPresentation: "titledSection",
          title: "Layout",
          children: [
            useRedefineAction(
              VcsActionIds.SHOW_DETAILS,
              SHOW_DETAILS_ACTION_ID
            ),
            useRedefineAction(
              VcsActionIds.SHOW_DIFF_PREVIEW,
              SHOW_DIFF_PREVIEW_ACTION_ID
            ),
          ].filter((i) => i != null),
        }),
      ],
    }),
    ...useTreeActions({ treeRef }),
  ];

  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <StyledContainer>
          <StyledHeader>
            <Toolbar>
              <TooltipTrigger
                tooltip={<ActionTooltip actionName="Show Diff" shortcut="⌘D" />}
              >
                <IconButton isDisabled>
                  <PlatformIcon icon={"actions/diff.svg"} />
                </IconButton>
              </TooltipTrigger>
              <TooltipTrigger
                tooltip={<ActionTooltip actionName="Revert Selected Changes" />}
              >
                <IconButton isDisabled>
                  <PlatformIcon icon="actions/rollback.svg" />
                </IconButton>
              </TooltipTrigger>
              <IconButtonWithMenu
                renderMenu={({ menuProps }) => {
                  return (
                    <VcsLogsDetailsViewOptionsMenu menuProps={menuProps} />
                  );
                }}
              >
                <PlatformIcon icon="actions/groupBy.svg" />
              </IconButtonWithMenu>
            </Toolbar>
            <StyledSpacer />
            <Toolbar style={{ flexShrink: 0 }}>
              <ActionButton actionId={CommonActionId.EXPAND_ALL} />
              <ActionButton actionId={CommonActionId.COLLAPSE_ALL} />
            </Toolbar>
          </StyledHeader>
          <div style={{ flex: 1, minHeight: 0 }}>
            {isDetailsVisible ? (
              <ThreeViewSplitter
                orientation="vertical"
                firstSize={splitViewSize}
                onFirstResize={setSplitViewSize}
                firstViewMinSize={10}
                firstView={
                  <CommitChangedFiles
                    treeShortcutHandlerProps={shortcutHandlerProps}
                  />
                }
                innerView={<CommitDetails />}
              />
            ) : (
              <CommitChangedFiles
                treeShortcutHandlerProps={shortcutHandlerProps}
              />
            )}
          </div>
        </StyledContainer>
      )}
    </ActionsProvider>
  );
}

const toggleActionAtoms: { [actionId: string]: Atom<boolean> } = {
  [SHOW_DETAILS_ACTION_ID]: vcsLogTabShowCommitDetailsInCurrentTabAtom,
  ...Object.fromEntries(
    defaultChangeGroupings.map((grouping) => [
      groupingActionId(grouping),
      changesGroupingActiveAtoms(grouping.id),
    ])
  ),
};

const selectedKeysAtom = atom((get) =>
  Object.entries(toggleActionAtoms)
    .filter(([, state]) => get(state))
    .map(([actionId]) => actionId)
);

function VcsLogsDetailsViewOptionsMenu({
  menuProps,
}: {
  menuProps: Omit<HTMLAttributes<HTMLDivElement>, "autoFocus">;
}) {
  const group = useActionGroup(VIEW_OPTIONS_ACTION_GROUP_ID);
  const selectedKeys = useAtomValue(selectedKeysAtom);
  return (
    group && (
      <ActionGroupMenu actionGroup={group}>
        {(actionMenuProps) => (
          <SpeedSearchMenu
            {...menuProps}
            {...actionMenuProps}
            selectedKeys={selectedKeys}
          />
        )}
      </ActionGroupMenu>
    )
  );
}
