import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  MenuTrigger,
  PlatformIcon,
  StatusBar,
  StatusBarWidget,
} from "@intellij-platform/core";

import { editorCursorPositionState } from "../Editor/editor.state";
import { notImplemented } from "../Project/notImplemented";
import { StatusBarTaskProgressBar } from "./StatusBarTaskProgressBar";
import { BranchPopupTrigger } from "./BranchPopupTrigger";

const StyledLastMessage = styled.div`
  margin-left: 0.75rem;
  cursor: pointer;
`;
export const IdeStatusBar = () => {
  const cursorPosition = useRecoilValue(editorCursorPositionState);

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
          {<StatusBarTaskProgressBar />}
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
          <BranchPopupTrigger />
          <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
          <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
        </>
      }
    />
  );
};
