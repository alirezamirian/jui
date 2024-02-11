import React from "react";
import { atom, useRecoilState } from "recoil";
import {
  ActionButton,
  ActionTooltip,
  CommonActionId,
  Divider,
  IconButton,
  IconButtonWithMenu,
  Item,
  PlatformIcon,
  Section,
  SpeedSearchMenu,
  ThreeViewSplitter,
  Toolbar,
  TooltipTrigger,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { StyledHeader, StyledSpacer } from "./styled-components";
import {
  CommitChangedFiles,
  CommitDetails,
} from "./CommitsView/CommitsChangedFiles";

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
                <SpeedSearchMenu {...menuProps} onAction={notImplemented}>
                  <Section title="Group By">
                    <Item>Directory</Item>
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
