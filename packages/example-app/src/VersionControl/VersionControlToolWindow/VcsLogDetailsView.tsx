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

const splitViewSizeState = atom({
  key: "vcs/toolwindow/splitViewSize",
  default: 0.5,
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export function VcsLogDetailsView() {
  const [splitViewSize, setSplitViewSize] = useRecoilState(splitViewSizeState);

  const toggleGroupBy = useRecoilCallback(({ set }) => (id: string) => {
    set(changesGroupingActiveState(id), (currentValue) => !currentValue);
  });
  const groupByMenuItems = defaultChangeGroupings.map((grouping) => ({
    title: grouping.title,
    key: `groupBy:${grouping.id}`,
    isActive: useRecoilValue(changesGroupingActiveState(grouping.id)),
  }));
  const groupBySelectedKeys = groupByMenuItems
    .filter(({ isActive }) => isActive)
    .map(({ key }) => key);

  const treeRef = useRecoilValue(commitChangesTreeRefState);
  const actions = useTreeActions({ treeRef });

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
                      selectedKeys={groupBySelectedKeys}
                      onAction={(key) => {
                        const groupByItem = groupByMenuItems.find(
                          (item) => item.key === key
                        );
                        if (groupByItem) {
                          toggleGroupBy(`${key}`.split(":")[1]);
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
                        <Item>Show Details</Item>
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
          </div>
        </StyledContainer>
      )}
    </ActionsProvider>
  );
}
