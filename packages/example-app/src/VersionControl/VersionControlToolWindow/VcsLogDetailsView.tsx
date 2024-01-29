import React from "react";
import { atom, useRecoilState } from "recoil";
import {
  ActionButton,
  ActionTooltip,
  CommonActionId,
  IconButton,
  IconButtonWithMenu,
  Item,
  Menu,
  PlatformIcon,
  Section,
  ThreeViewSplitter,
  Toolbar,
  TooltipTrigger,
} from "@intellij-platform/core";

import { StyledHeader, StyledSpacer } from "./styled-components";
import { CommitChangedFiles, CommitDetails } from "./CommitsView/CommitsTable";

const splitViewSizeState = atom({
  key: "vcs/toolwindow/splitViewSize",
  default: 0.5,
});
export function VcsLogDetailsView() {
  const [splitViewSize, setSplitViewSize] = useRecoilState(splitViewSizeState);
  return (
    <>
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
                <Menu {...menuProps}>
                  <Section title="Show">
                    <Item>Compact References View</Item>
                  </Section>
                </Menu>
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
      <ThreeViewSplitter
        orientation="vertical"
        firstSize={splitViewSize}
        onFirstResize={setSplitViewSize}
        firstView={<CommitChangedFiles />}
        innerView={<CommitDetails />}
      />
    </>
  );
}
