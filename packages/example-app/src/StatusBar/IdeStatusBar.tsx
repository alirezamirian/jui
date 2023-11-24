import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ActionTooltip,
  Divider,
  Item,
  Link,
  Menu,
  MenuItemLayout,
  MenuTrigger,
  PlatformIcon,
  PopupTrigger,
  ProgressBar,
  ProgressBarProps,
  ProgressBarStopButton,
  StatusBar,
  StatusBarWidget,
  TooltipTrigger,
} from "@intellij-platform/core";
import { editorCursorPositionState } from "../Editor/editor.state";
import { BranchesPopup } from "../VersionControl/Branches/BranchesPopup";
import { activeFileRepoHeadState } from "../VersionControl/active-file.state";
import { notImplemented } from "../Project/notImplemented";
import { useLatestRecoilValue } from "../recoil-utils";
import { firstTaskState, taskCountState, useCancelTask } from "../tasks";
import { useShowGitTipIfNeeded } from "../VersionControl/useShowGitTipIfNeeded";

const StyledLastMessage = styled.div`
  margin-left: 0.75rem;
  cursor: pointer;
`;

function StatusBarProgress(
  props: Omit<ProgressBarProps, "dense" | "namePosition" | "width">
) {
  return <ProgressBar dense namePosition="side" width={146} {...props} />;
}

const Spacer = styled.span`
  width: 0.5rem;
`;

/**
 * Intentionally, "processes" haven't been abstracted as an extension point for different features, since the focus
 * here is not to create an IDE, but to demo UI components.
 */
const StatusBarProcess = () => {
  const firstTask = useRecoilValue(firstTaskState);
  const tasksCount = useRecoilValue(taskCountState);
  const cancel = useCancelTask();

  return (
    <>
      {firstTask && (
        <StatusBarProgress
          name={firstTask.progress.text || firstTask.title}
          isIndeterminate={firstTask.progress.isIndeterminate}
          value={firstTask.progress.fraction}
          maxValue={1}
          button={
            <>
              {/*
              {task.canPause && (
                <ProgressBarPauseButton
                  small
                  paused={false}
                  onPausedChange={() => {}}
                />
              )}
              */}
              {firstTask.isCancelable && (
                <ProgressBarStopButton
                  small
                  onPress={() => cancel(firstTask.id)}
                />
              )}
            </>
          }
        />
      )}
      {tasksCount > 1 && (
        <>
          <Spacer />
          <Link onPress={notImplemented}>Show all ({tasksCount})</Link>
        </>
      )}
    </>
  );
};

export const IdeStatusBar = () => {
  const cursorPosition = useRecoilValue(editorCursorPositionState);
  const maybeShowGitCloneTip = useShowGitTipIfNeeded();

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
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setTimeout(maybeShowGitCloneTip, 500);
              }
            }}
            popup={({ close }) => <BranchesPopup onClose={close} />}
          >
            <BranchPopupTrigger />
          </PopupTrigger>
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};

function BranchPopupTrigger() {
  const gitRepoHead = useLatestRecoilValue(activeFileRepoHeadState);

  return (
    gitRepoHead && (
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
                gitRepoHead.detached ? "general/warning.svg" : "vcs/branch.svg"
              }
            />
          }
          label={gitRepoHead.head.slice(
            0,
            gitRepoHead.detached ? 8 : undefined
          )}
        />
      </TooltipTrigger>
    )
  );
}
