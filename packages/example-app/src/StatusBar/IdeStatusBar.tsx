import {
  ActionTooltip,
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  MenuTrigger,
  PlatformIcon,
  PopupTrigger,
  ProgressBar,
  ProgressBarPauseButton,
  ProgressBarStopButton,
  StatusBar,
  StatusBarWidget,
  TooltipTrigger,
} from "@intellij-platform/core";
import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { editorCursorPositionState } from "../Editor/editor.state";
import { switchToPersistentFsProcess } from "../usePersistenceFsNotification";
import { BranchesPopup } from "../VersionControl/Branches/BranchesPopup";
import { activeFileRepoHeadState } from "../VersionControl/active-file.state";
import { notImplemented } from "../Project/notImplemented";

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
  const gitRepoHead = useRecoilValue(activeFileRepoHeadState);

  return (
    <StatusBar
      left={
        <>
          <PlatformIcon
            icon="general/tbHidden.svg"
            role="button"
            onClick={notImplemented}
          />
          <StyledLastMessage>
            Tooltip content or last message will show up here.
          </StyledLastMessage>
        </>
      }
      right={
        <>
          {<StatusBarProcess />}
          <StatusBarWidget onPress={notImplemented} label="LF" />
          <StatusBarWidget
            onPress={notImplemented}
            label={`${cursorPosition.lineNumber},${cursorPosition.column}`}
          />
          <StatusBarWidget label="UTF-8" />
          <MenuTrigger
            renderMenu={({ menuProps }) => (
              <Menu {...menuProps} onAction={notImplemented}>
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
              <Menu {...menuProps} onAction={notImplemented}>
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
          <PopupTrigger
            placement="top"
            popup={({ close }) => <BranchesPopup onClose={close} />}
          >
            <TooltipTrigger
              tooltip={
                <ActionTooltip
                  actionName={
                    gitRepoHead.detached
                      ? "Git: Detached HEAD doesn't point to any branch"
                      : `Git Branch: ${gitRepoHead.head}`
                  }
                />
              }
            >
              <StatusBarWidget
                icon={
                  <PlatformIcon
                    icon={
                      gitRepoHead.detached
                        ? "general/warning.svg"
                        : "vcs/branch.svg"
                    }
                  />
                }
                label={gitRepoHead.head.slice(
                  0,
                  gitRepoHead.detached ? 8 : undefined
                )}
              />
            </TooltipTrigger>
          </PopupTrigger>
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};
