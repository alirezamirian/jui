import React, { HTMLAttributes } from "react";
import {
  atom,
  isRecoilValue,
  RecoilValue,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
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
  changesGroupingActiveState,
  commitChangesTreeRefState,
} from "../CommitChanges/CommitsChangedFiles.state";
import {
  vcsLogTabShowCommitDetailsInCurrentTabState,
  vcsLogTabShowCommitDetailsState,
} from "../vcs-logs.state";
import { VcsActionIds } from "../../VcsActionIds";
import { notNull } from "@intellij-platform/core/utils/array-utils";
import { useRedefineAction } from "../../../useRedefineAction";

const splitViewSizeState = atom({
  key: "vcs/toolwindow/splitViewSize",
  default: 0.5,
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const groupingState = selector({
  key: "vcs/log/commits/changes/groupingState",
  get: ({ get }) => {
    const groupings = defaultChangeGroupings.filter((grouping) =>
      isRecoilValue(grouping.isAvailable)
        ? get(grouping.isAvailable)
        : grouping.isAvailable
    );
    return groupings.map((grouping) => ({
      ...grouping,
      key: `groupBy:${grouping.id}`,
      isActive: get(changesGroupingActiveState(grouping.id)),
    }));
  },
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
  const [splitViewSize, setSplitViewSize] = useRecoilState(splitViewSizeState);
  const isDetailsVisible = useRecoilValue(
    vcsLogTabShowCommitDetailsState(tabKey)
  );
  const toggleGroupBy = useRecoilCallback(({ set }) => (id: string) => {
    set(changesGroupingActiveState(id), (currentValue) => !currentValue);
  });
  const createActionGroup = useCreateDefaultActionGroup();
  const availableGroupings = useRecoilValue(groupingState);

  const treeRef = useRecoilValue(commitChangesTreeRefState);
  const actions = [
    createActionGroup({
      id: VIEW_OPTIONS_ACTION_GROUP_ID,
      title: "View Options",
      icon: <PlatformIcon icon="actions/groupBy.svg" />,
      children: [
        createActionGroup({
          id: GROUP_BY_ACTION_GROUP_ID,
          title: "Group By",
          presentation: "titledSection",
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
          presentation: "titledSection",
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
          ].filter(notNull),
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

const toggleActionsState: { [actionId: string]: RecoilValue<boolean> } = {
  [SHOW_DETAILS_ACTION_ID]: vcsLogTabShowCommitDetailsInCurrentTabState,
  ...Object.fromEntries(
    defaultChangeGroupings.map((grouping) => [
      groupingActionId(grouping),
      changesGroupingActiveState(grouping.id),
    ])
  ),
};
const selectedKeysState = selector({
  key: "vcs/log/commits/detailsView/viewOptionsSelectedKeys",
  get: ({ get }) =>
    Object.entries(toggleActionsState)
      .filter(([, state]) => get(state))
      .map(([actionId]) => actionId),
});

function VcsLogsDetailsViewOptionsMenu({
  menuProps,
}: {
  menuProps: HTMLAttributes<HTMLDivElement>;
}) {
  const group = useActionGroup(VIEW_OPTIONS_ACTION_GROUP_ID);
  const selectedKeys = useRecoilValue(selectedKeysState);
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
