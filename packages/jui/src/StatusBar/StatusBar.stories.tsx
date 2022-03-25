import React from "react";
import { Meta, Story } from "@storybook/react";
import styled from "styled-components";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { StatusBarWidget } from "@intellij-platform/core/StatusBar/StatusBarWidget";
import {
  Divider,
  Item,
  Menu,
  MenuItemLayout,
  MenuTrigger,
} from "@intellij-platform/core/Menu";
import { ProgressBar, ProgressBarPauseButton } from "@intellij-platform/core";
import { StatusBar, StatusBarProps } from "./StatusBar";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const StyledLastMessage = styled.div`
  margin-left: 0.75rem;
  cursor: pointer;
`;

const widgets = (
  <>
    <ProgressBar
      value={40}
      width={146}
      name="Indexing Paused"
      namePosition="side"
      button={<ProgressBarPauseButton small paused onPausedChange={() => {}} />}
      dense
    />
    <StatusBarWidget label="LF" />
    <StatusBarWidget label="UTF-8" />
    <MenuTrigger
      renderMenu={({ menuProps, close }) => (
        <Menu {...menuProps} onAction={close}>
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
        <Menu {...menuProps} onAction={close}>
          <Item title="Compile">
            <Item>packages/jui/tsconfig.json</Item>
            <Item>packages/jui/src/StatusBar/StatusBar.stories.tsx</Item>
            <Item>Compile All</Item>
          </Item>
          <Divider />
          <Item>
            <MenuItemLayout
              icon={<PlatformIcon icon="javaee/updateRunningApplication.svg" />}
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
      label="feat/StatusBar"
    />
    <StatusBarWidget icon={<PlatformIcon icon="ide/readwrite.svg" />} />
    <StatusBarWidget icon={<PlatformIcon icon="ide/fatalError.svg" />} />
  </>
);
export default {
  title: "Components/StatusBar",
  component: StatusBar,
  subcomponents: {
    StatusBarWidget,
  },
  parameters: {
    layout: "fullscreen",
  },
  args: {
    left: (
      <>
        <PlatformIcon icon="general/tbHidden.svg" />
        <StyledLastMessage>
          Workspace associated with branch 'feat/balloons-provider' has been
          restored // Rollback Configure...
        </StyledLastMessage>
      </>
    ),
    right: widgets,
  },
  argTypes: {},
} as Meta;

const Template: Story<StatusBarProps> = (props) => {
  return (
    <StyledContainer>
      <StatusBar {...props} />
    </StyledContainer>
  );
};

export const Default: Story<StatusBarProps> = Template.bind({});
