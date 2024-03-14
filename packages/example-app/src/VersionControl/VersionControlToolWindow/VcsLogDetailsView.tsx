import React from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  ActionButton,
  ActionsProvider,
  ActionTooltip,
  CommonActionId,
  Divider,
  IconButton,
  IconButtonWithMenu,
  Item,
  PlatformIcon,
  Section,
  SpeedSearchMenu,
  styled,
  ThreeViewSplitter,
  Toolbar,
  TooltipTrigger,
  useAction,
  useTreeActions,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { StyledHeader, StyledSpacer } from "./styled-components";
import { CommitChangedFiles } from "./CommitsView/CommitsChangedFiles";
import { CommitDetails } from "./CommitsView/CommitDetails";
import { defaultChangeGroupings } from "../Changes/ChangesTree/changesGroupings";
import {
  changesGroupingActiveState,
  commitChangesTreeRefState,
} from "./CommitsView/CommitsChangedFiles.state";
import { vcsLogTabShowCommitDetails } from "./vcs-logs.state";
import { VcsActionIds } from "../VcsActionIds";

const splitViewSizeState = atom({
  key: "vcs/toolwindow/splitViewSize",
  default: 0.5,
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export function VcsLogDetailsView({ tabKey }: { tabKey: string }) {
  const [splitViewSize, setSplitViewSize] = useRecoilState(splitViewSizeState);
  const isDetailsVisible = useRecoilValue(vcsLogTabShowCommitDetails(tabKey));
  const toggleDetailsAction = useAction(VcsActionIds.SHOW_DETAILS);

  const toggleGroupBy = useRecoilCallback(({ set }) => (id: string) => {
    set(changesGroupingActiveState(id), (currentValue) => !currentValue);
  });
  const groupByMenuItems = defaultChangeGroupings
    .filter((grouping) =>
      useRecoilValue(changesGroupingActiveState(grouping.id))
    )
    .map((grouping) => ({
      title: grouping.title,
      key: `groupBy:${grouping.id}`,
    }));
  const groupBySelectedKeys = groupByMenuItems.map(({ key }) => key);

  const treeRef = useRecoilValue(commitChangesTreeRefState);
  const actions = useTreeActions({ treeRef });

  const selectedKeys = [
    ...groupBySelectedKeys,
    ...(isDetailsVisible ? [VcsActionIds.SHOW_DETAILS] : []),
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
                    <SpeedSearchMenu
                      {...menuProps}
                      selectedKeys={selectedKeys}
                      onAction={(key) => {
                        const groupByItem = groupByMenuItems.find(
                          (item) => item.key === key
                        );
                        if (groupByItem) {
                          toggleGroupBy(`${key}`.split(":")[1]);
                        } else if (key === toggleDetailsAction?.id) {
                          toggleDetailsAction?.perform();
                        } else {
                          notImplemented();
                        }
                      }}
                    >
                      <Section title="Group By">
                        {groupByMenuItems.map((item) => (
                          <Item key={item.key}>{item.title}</Item>
                        ))}
                      </Section>
                      <Divider />
                      <Section title="Layout">
                        {toggleDetailsAction ? (
                          <Item key={toggleDetailsAction?.id}>
                            {toggleDetailsAction.title}
                          </Item>
                        ) : (
                          (null as any)
                        )}
                        <Item>Show Diff Preview</Item>
                      </Section>
                    </SpeedSearchMenu>
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
