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
  styled,
  ThreeViewSplitter,
  Toolbar,
  TooltipTrigger,
} from "@intellij-platform/core";

import { notImplemented } from "../../Project/notImplemented";
import { StyledHeader, StyledSpacer } from "./styled-components";
import { CommitChangedFiles } from "./CommitsView/CommitsChangedFiles";
import { CommitDetails } from "./CommitsView/CommitDetails";

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
  return (
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
      <div style={{ flex: 1, minHeight: 0 }}>
        <ThreeViewSplitter
          orientation="vertical"
          firstSize={splitViewSize}
          onFirstResize={setSplitViewSize}
          firstView={<CommitChangedFiles />}
          firstViewMinSize={10}
          innerView={<CommitDetails />}
        />
      </div>
    </StyledContainer>
  );
}
