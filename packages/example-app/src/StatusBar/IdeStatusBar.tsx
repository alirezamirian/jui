import {
  ActionTooltip,
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  MenuOverlayContext,
  MenuTrigger,
  PlatformIcon,
  PopupOnTrigger,
  ProgressBar,
  ProgressBarPauseButton,
  ProgressBarStopButton,
  StatusBar,
  StatusBarWidget,
  TooltipTrigger,
} from "@intellij-platform/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { editorCursorPositionState } from "../Editor/editor.state";
import { switchToPersistentFsProcess } from "../usePersistenceFsNotification";
import { BranchesPopupContent } from "../VersionControl/Branches/BranchesPopupContent";
import { activeFileCurrentBranch } from "../VersionControl/active-file.state";

const StyledLastMessage = styled.div`
  margin-left: 0.75rem;
  cursor: pointer;
`;

const StatusBarProcess = () => {
  const process = useRecoilValue(switchToPersistentFsProcess);

  return (
    process && (
      <ProgressBar
        name={process.name}
        isIndeterminate={process.isIndeterminate}
        value={process.progress}
        dense
        namePosition="side"
        width={146}
        button={
          <>
            {process.onPause && (
              <ProgressBarPauseButton
                small
                paused={false}
                onPausedChange={() => {}}
              />
            )}
            {process.onCancel && (
              <ProgressBarStopButton small onPress={process.onCancel} />
            )}
          </>
        }
      />
    )
  );
};

export const IdeStatusBar = () => {
  const cursorPosition = useRecoilValue(editorCursorPositionState);
  const currentBranch = useRecoilValue(activeFileCurrentBranch);
  const [isBranchesPopupOpen, setBranchesPopupOpen] = useState(false);

  return (
    <StatusBar
      left={
        <>
          <PlatformIcon
            icon="general/tbHidden.svg"
            role="button"
            onClick={() => alert("Not implemented")}
          />
          <StyledLastMessage>
            Tooltip content or last message will show up here.
          </StyledLastMessage>
        </>
      }
      right={
        <>
          {<StatusBarProcess />}
          <StatusBarWidget
            onPress={() => alert("Not implemented")}
            label="LF"
          />
          <StatusBarWidget
            onPress={() => alert("Not implemented")}
            label={`${cursorPosition.lineNumber},${cursorPosition.column}`}
          />
          <StatusBarWidget label="UTF-8" />
          <MenuTrigger
            renderMenu={({ menuProps }) => (
              <Menu
                {...menuProps}
                onAction={() => {
                  alert("Not implemented");
                }}
              >
                <Item>Configure Indents for Typescript</Item>
                <Item>Disable Indents Detection for Project</Item>
              </Menu>
            )}
          >
            {(props, ref) => (
              <StatusBarWidget {...props} ref={ref} label="2 spaces" />
            )}
          </MenuTrigger>
          <MenuTrigger
            renderMenu={({ menuProps }) => (
              <Menu
                {...menuProps}
                onAction={() => {
                  alert("Not implemented");
                }}
              >
                <Item title="Compile">
                  <Item>packages/jui/tsconfig.json</Item>
                  <Item>packages/jui/src/StatusBar/StatusBar.stories.tsx</Item>
                  <Item>Compile All</Item>
                </Item>
                <Divider />
                <Item>
                  <MenuItemLayout
                    icon={
                      <PlatformIcon icon="javaee/updateRunningApplication.svg" />
                    }
                    content="Restart Typescript Service"
                  />
                </Item>
                <Item>
                  <MenuItemLayout
                    icon={<PlatformIcon icon="general/settings.svg" />}
                    content="Configure Typescript..."
                  />
                </Item>
              </Menu>
            )}
          >
            {(props, ref) => (
              <StatusBarWidget {...props} ref={ref} label="TypeScript 4.4.3" />
            )}
          </MenuTrigger>
          <PopupOnTrigger
            isOpen={isBranchesPopupOpen}
            onOpenChange={setBranchesPopupOpen}
            placement="top"
            interactions="all"
            trigger={
              <TooltipTrigger
                tooltip={
                  <ActionTooltip actionName={`Git Branch: ${currentBranch}`} />
                }
              >
                <StatusBarWidget
                  icon={<PlatformIcon icon="vcs/branch.svg" />}
                  label={currentBranch}
                />
              </TooltipTrigger>
            }
          >
            {/* TODO: Menu in Popover should be easier out of the box */}
            <MenuOverlayContext.Provider
              value={{ close: () => setBranchesPopupOpen(false) }}
            >
              <BranchesPopupContent />
            </MenuOverlayContext.Provider>
          </PopupOnTrigger>
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};
