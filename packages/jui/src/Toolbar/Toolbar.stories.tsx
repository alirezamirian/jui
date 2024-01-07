import React from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import {
  ActionTooltip,
  IconButton,
  Item,
  Menu,
  MenuTrigger,
  PlatformIcon,
  styled,
  ToolbarSeparator,
  TooltipTrigger,
} from "@intellij-platform/core";
import { Toolbar, ToolbarProps as OriginalToolbarProps } from "./Toolbar";

// The way overflowBehavior is defined on toolbar props breaks how composeStories infers the type of stories.
// This is a patch to solve that type issue. Would be nicer to isolate the patch to Toolbar.cy.tsx, but couldn't figure
// a good way of doing so.
type ToolbarProps = Omit<OriginalToolbarProps, "overflowBehavior"> & {
  overflowBehavior: "wrap" | "popup";
};

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  args: {
    children: (
      <>
        <IconButton aria-label="Hide">
          <PlatformIcon icon="actions/arrowCollapse" />
        </IconButton>
        <ToolbarSeparator />
        <IconButton aria-label="Add">
          <PlatformIcon icon="general/add" />
        </IconButton>
        <IconButton aria-label="Checkout">
          <PlatformIcon icon="actions/checkOut" />
        </IconButton>
        <IconButton aria-label="Delete">
          <PlatformIcon icon="actions/gc" />
        </IconButton>
        <IconButton aria-label="Show Diff">
          <PlatformIcon icon="actions/diff" />
        </IconButton>
        <IconButton aria-label="Find">
          <PlatformIcon icon="actions/find" />
        </IconButton>
        <ToolbarSeparator />
        <IconButton aria-label="Expand All">
          <PlatformIcon icon="actions/expandall" />
        </IconButton>
        <IconButton aria-label="Collapse All">
          <PlatformIcon icon="actions/collapseall" />
        </IconButton>
      </>
    ),
  },
  argTypes: {},
} as Meta<ToolbarProps>;

const render = (props: ToolbarProps) => {
  return <Toolbar {...props}></Toolbar>;
};

export const Horizontal: StoryObj<ToolbarProps> = {
  render,
  args: {
    orientation: "horizontal",
  },
};

const sizeArgType: ArgTypes[string] = {
  control: {
    type: "range",
    min: 0,
    max: 300,
    step: 10,
  },
};

type HorizontalOverflowProps = ToolbarProps & { containerWidth: number };
type VerticalOverflowProps = ToolbarProps & { containerHeight: number };
export const HorizontalOverflow: StoryObj<HorizontalOverflowProps> = {
  render: ({
    containerWidth = 140,
    children,
    ...props
  }: HorizontalOverflowProps) => (
    <div style={{ width: containerWidth }}>
      <Toolbar {...props}>{children}</Toolbar>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    containerWidth: sizeArgType,
  },
};

export const OverflowWrap: StoryObj<HorizontalOverflowProps> = {
  ...HorizontalOverflow,
  args: {
    ...HorizontalOverflow.args,
    overflowBehavior: "wrap",
  },
};

export const Vertical: StoryObj<ToolbarProps> = {
  render,
  args: {
    orientation: "vertical",
  },
};
export const VerticalOverflow: StoryObj<VerticalOverflowProps> = {
  render: ({
    containerHeight = 140,
    children,
    ...props
  }: VerticalOverflowProps) => (
    <div style={{ height: containerHeight }}>
      <Toolbar {...props}>{children}</Toolbar>
    </div>
  ),
  args: {
    orientation: "vertical",
  },
  argTypes: {
    containerHeight: sizeArgType,
  },
};
export const OverflowFittedInViewport: StoryObj<HorizontalOverflowProps> = {
  render: (props: HorizontalOverflowProps, context: any) => (
    <div style={{ display: "flex", justifyContent: "end", paddingRight: 20 }}>
      {HorizontalOverflow.render?.(props as any, context)}
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    containerWidth: sizeArgType,
  },
};

const StyledDropdownButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.25rem;
  background: ${({ theme }) => theme.color("ComboBoxButton.background")};
  color: ${({ theme }) => theme.color("ComboBox.disabledForeground")};
  &:hover {
    color: ${({ theme }) => theme.color("*.foreground")};
  }
`;

export const OverflowWithCustomItems: StoryObj<HorizontalOverflowProps> = {
  render: ({ containerWidth = 140, ...props }: HorizontalOverflowProps) => (
    <div style={{ width: containerWidth }}>
      <Toolbar {...props}>
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <Menu {...menuProps}>
              <Item>Select...</Item>
              <Item>Last 24 hours</Item>
              <Item>Last 7 days</Item>
            </Menu>
          )}
        >
          {(props, ref) => (
            <StyledDropdownButton {...props} ref={ref}>
              Date <PlatformIcon icon="general/arrowDownSmall.svg" />
            </StyledDropdownButton>
          )}
        </MenuTrigger>
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <Menu {...menuProps}>
              <Item>Select...</Item>
              <Item>me</Item>
            </Menu>
          )}
        >
          {(props, ref) => (
            <StyledDropdownButton {...props} ref={ref}>
              User <PlatformIcon icon="general/arrowDownSmall.svg" />
            </StyledDropdownButton>
          )}
        </MenuTrigger>
        <MenuTrigger
          renderMenu={({ menuProps }) => (
            <Menu {...menuProps}>
              <Item>Select in...</Item>
              <Item>Select in Tree...</Item>
            </Menu>
          )}
        >
          {(props, ref) => (
            <StyledDropdownButton {...props} ref={ref}>
              Paths <PlatformIcon icon="general/arrowDownSmall.svg" />
            </StyledDropdownButton>
          )}
        </MenuTrigger>
        <ToolbarSeparator />
        <TooltipTrigger
          tooltip={<ActionTooltip actionName={"Open New Git Log Tab"} />}
        >
          <IconButton aria-label="Checkout">
            <PlatformIcon icon="actions/openNewTab.svg" />
          </IconButton>
        </TooltipTrigger>
      </Toolbar>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    containerWidth: sizeArgType,
  },
};

export const LastItemDivider: StoryObj<ToolbarProps> = {
  render: ({ children, ...props }: ToolbarProps) => (
    <Toolbar {...props}>
      {children}
      <ToolbarSeparator />
    </Toolbar>
  ),
};

export const FirstItemDivider: StoryObj<ToolbarProps> = {
  render: ({ children, ...props }: ToolbarProps) => (
    <Toolbar {...props}>
      <ToolbarSeparator />
      {children}
    </Toolbar>
  ),
};
