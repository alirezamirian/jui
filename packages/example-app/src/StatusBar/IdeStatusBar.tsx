import {
  ActionTooltip,
  Bounds,
  Divider,
  Item,
  Menu,
  MenuItemLayout,
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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { editorCursorPositionState } from "../Editor/editor.state";
import { switchToPersistentFsProcess } from "../usePersistenceFsNotification";
import {
  BRANCHES_POPUP_MIN_HEIGHT,
  BRANCHES_POPUP_MIN_WIDTH,
  BranchesPopupContent,
  branchesPopupSizeState,
} from "../VersionControl/Branches/BranchesPopupContent";
import { activeFileCurrentBranchState } from "../VersionControl/active-file.state";
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
  const currentBranch = useRecoilValue(activeFileCurrentBranchState);
  const [branchesPopupPersistedSize, setBranchesPopupPersistedSize] =
    useRecoilState(branchesPopupSizeState);
  const [branchesPopupBounds, setBranchesPopupBounds] = useState<
    Partial<Bounds>
  >(branchesPopupPersistedSize ?? {});

  useEffect(() => {
    setBranchesPopupBounds(({ left, top }) => ({
      // Following the reference impl, keep the positioning (left,top) untouched. From UX point of view though,
      // it's probably better to have the popup repositioned as well, with respect to the trigger. Especially because
      // restoring the default size can increase the size, pushing the popup offscreen.
      left,
      top,
      ...branchesPopupPersistedSize,
    }));
  }, [branchesPopupPersistedSize]);

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
          <PopupOnTrigger
            onOpenChange={() => {
              setBranchesPopupBounds(branchesPopupPersistedSize ?? {});
            }}
            bounds={branchesPopupBounds}
            onBoundsChange={(bounds, interactionType) => {
              if (interactionType === "resize") {
                setBranchesPopupPersistedSize({
                  width: bounds.width,
                  height: bounds.height,
                });
              }
              setBranchesPopupBounds(bounds);
            }}
            minWidth={BRANCHES_POPUP_MIN_WIDTH}
            minHeight={BRANCHES_POPUP_MIN_HEIGHT}
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
            {({ close }) => <BranchesPopupContent onClose={close} />}
          </PopupOnTrigger>
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};
