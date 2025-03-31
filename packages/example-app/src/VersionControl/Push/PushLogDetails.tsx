import { Selection } from "@react-types/shared";
import React, {
  HTMLAttributes,
  Key,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAtomCallback } from "jotai/utils";
import { Atom, atom, useAtom, useAtomValue } from "jotai";
import {
  ActionButton,
  ActionGroupMenu,
  ActionsMenu,
  ActionsProvider,
  ActionTooltip,
  CommonActionId,
  ContextMenuContainer,
  Divider,
  IconButton,
  IconButtonWithMenu,
  PlatformIcon,
  SpeedSearchMenu,
  SpeedSearchTree,
  styled,
  Toolbar,
  TooltipTrigger,
  TreeRefValue,
  useAction,
  useActionGroup,
  useCreateDefaultActionGroup,
  useTreeActions,
} from "@intellij-platform/core";

import { isAtom } from "../../atom-utils/isAtom";
import { commitChangesTreeNodeRenderer } from "../VersionControlToolWindow/CommitChanges/commitChangesTreeNodeRenderer";
import { defaultChangeGroupings } from "../Changes/ChangesTree/changesGroupings";
import {
  pushDetailsTreeState,
  pushLogTreeSelectionAtom,
} from "./PushLog.state";
import { VcsActionIds } from "../VcsActionIds";
import { notImplemented } from "../../Project/notImplemented";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.commonColors.contrastBorder};
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const pushChangesTreeRefAtom = atom<RefObject<TreeRefValue>>(
  React.createRef<TreeRefValue>()
);
export const pushLogDetailsTreeSelectionAtom = atom<Selection>(new Set([]));

const groupingAtom = atom((get) => {
  const groupings = defaultChangeGroupings.filter((grouping) =>
    isAtom(grouping.isAvailable)
      ? get(grouping.isAvailable)
      : grouping.isAvailable
  );
  return groupings.map((grouping) => ({
    ...grouping,
    key: `groupBy:${grouping.id}`,
    isActive: get(pushDetailsTreeState.isGroupingActiveAtom(grouping.id)),
  }));
});

const GROUP_BY_ACTION_GROUP_ID = "Vcs.push.detailsView.groupBy";
const VIEW_OPTIONS_ACTION_GROUP_ID = "Vcs.push.detailsView.viewOptions";

const groupingActionId = (grouping: { id: string }) => {
  return `Vcs.push.detailsView.groupBy.${grouping.id}`;
};

export function PushLogDetails() {
  const treeRef = useAtomValue(pushChangesTreeRefAtom);
  const availableGroupings = useAtomValue(groupingAtom);
  const toggleGroupBy = useAtomCallback(
    useCallback((get, set, id: string) => {
      set(
        pushDetailsTreeState.isGroupingActiveAtom(id),
        (currentValue) => !currentValue
      );
    }, [])
  );
  const [expandedKeys, setExpandedKeys] = useState(new Set<Key>());
  const [selection, setSelection] = useAtom(pushLogDetailsTreeSelectionAtom);

  const createActionGroup = useCreateDefaultActionGroup();

  const selectionIsEmpty = [...selection].length === 0;
  const actions = [
    ...useTreeActions({ treeRef }),
    // TODO: move group by action definitions into createCommitsChangesTreeState
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
      ],
    }),
    // TODO(#69): reuse the same action when providing data to actions is possible
    {
      id: VcsActionIds.SHOW_DIFF,
      title: "Show Diff",
      description: "Compare files or revisions.",
      icon: <PlatformIcon icon="actions/diff.svg" />,
      isDisabled: selectionIsEmpty,
      actionPerformed: notImplemented,
    },
    {
      id: VcsActionIds.SHOW_DIFF_STANDALONE,
      title: "Show Diff in a New Tab or Window",
      description: "Open diff for each selection in a new tab or window",
      icon: <PlatformIcon icon="actions/diff.svg" />,
      isDisabled: selectionIsEmpty,
      actionPerformed: notImplemented,
    },
  ];

  const stateLoadable = useAtomValue(
    pushDetailsTreeState.changedFilesLoadableAtom
  );

  const state = stateLoadable.state === "hasData" ? stateLoadable.data : null;

  useEffect(() => {
    treeRef.current?.expandAll();
  }, [useAtomValue(pushLogTreeSelectionAtom), state]);

  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <StyledColumn {...shortcutHandlerProps}>
          <StyledRow>
            <Toolbar>
              <TooltipTrigger
                tooltip={<ActionTooltip actionName="Show Diff" shortcut="⌘D" />}
              >
                <IconButton isDisabled>
                  <PlatformIcon icon={"actions/diff.svg"} />
                </IconButton>
              </TooltipTrigger>
              <Divider />
              <TooltipTrigger tooltip={<ActionTooltip actionName="Group By" />}>
                <IconButtonWithMenu
                  renderMenu={({ menuProps }) => {
                    return (
                      <PushLogDetailsViewOptionsMenu menuProps={menuProps} />
                    );
                  }}
                >
                  <PlatformIcon icon="actions/groupBy.svg" />
                </IconButtonWithMenu>
              </TooltipTrigger>
            </Toolbar>
            <Toolbar>
              <ActionButton actionId={CommonActionId.EXPAND_ALL} />
              <ActionButton actionId={CommonActionId.COLLAPSE_ALL} />
            </Toolbar>
          </StyledRow>
          {state && (
            <ContextMenuContainer renderMenu={() => <ContextMenu />}>
              {(props) => (
                <div {...props} style={{ height: "100%" }}>
                  <SpeedSearchTree
                    aria-label="Commit changes"
                    treeRef={treeRef}
                    items={state.rootNodes}
                    selectionMode="multiple"
                    expandedKeys={expandedKeys}
                    onExpandedChange={setExpandedKeys}
                    selectedKeys={selection}
                    onSelectionChange={setSelection}
                    style={{ paddingBottom: "1rem" }}
                    fillAvailableSpace
                  >
                    {commitChangesTreeNodeRenderer.itemRenderer({
                      fileCountsMap: state.fileCountsMap,
                    })}
                  </SpeedSearchTree>
                </div>
              )}
            </ContextMenuContainer>
          )}
        </StyledColumn>
      )}
    </ActionsProvider>
  );
}

function ContextMenu() {
  return (
    <ActionsMenu
      actions={[
        useAction(VcsActionIds.SHOW_DIFF),
        useAction(VcsActionIds.SHOW_DIFF_STANDALONE),
      ].filter((i) => i !== null)}
    />
  );
}

const toggleActionAtoms: { [actionId: string]: Atom<boolean> } = {
  ...Object.fromEntries(
    defaultChangeGroupings.map((grouping) => [
      groupingActionId(grouping),
      pushDetailsTreeState.isGroupingActiveAtom(grouping.id),
    ])
  ),
};

const selectedKeysAtom = atom((get) =>
  Object.entries(toggleActionAtoms)
    .filter(([, state]) => get(state))
    .map(([actionId]) => actionId)
);

function PushLogDetailsViewOptionsMenu({
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
