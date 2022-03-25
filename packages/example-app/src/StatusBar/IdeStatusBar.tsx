import {
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  MenuTrigger,
  PlatformIcon,
  ProgressBar,
  ProgressBarPauseButton,
  ProgressBarStopButton,
  StatusBar,
  StatusBarWidget,
} from "@intellij-platform/core";
import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { editorCursorPositionState } from "../Editor/editor.state";
import { currentBranchState } from "../VersionControl/Changes/ChangesView/ChangesView.state";
import { switchToPersistentFsProcess } from "../usePersistenceFsNotification";

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
  const currentBranch = useRecoilValue(currentBranchState("" /*FIXME*/));

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
            renderMenu={({ menuProps, close }) => (
              <Menu
                {...menuProps}
                onAction={() => {
                  alert("Not implemented");
                  close();
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
            renderMenu={({ menuProps, close }) => (
              <Menu
                {...menuProps}
                onAction={() => {
                  alert("Not implemented");
                  close();
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
          <StatusBarWidget
            icon={<PlatformIcon icon="vcs/branch.svg" />}
            label={currentBranch}
          />
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};
