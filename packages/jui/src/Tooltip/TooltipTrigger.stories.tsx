import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { Tooltip } from "./Tooltip";
import {
  IconButton,
  ActionHelpTooltip,
  Toolbar,
  ToolbarSeparator,
  Button,
  Link,
  PlatformIcon,
  TooltipTrigger,
  TooltipTriggerProps,
} from "@intellij-platform/core";

export default {
  title: "Components/Tooltip/Trigger",
  component: TooltipTrigger,
  args: {
    tooltip: (
      <ActionHelpTooltip
        actionName="Switch Task"
        helpText="Tasks are stored locally only. Connect your issue tracker to link your commits with the corresponding issues."
        shortcut="⌥⇧T"
      />
    ),
    children: <Button>button</Button>,
  },
  argTypes: {},
} as Meta<TooltipTriggerProps>;

export const Default: StoryObj<TooltipTriggerProps> = {};

export const OnInput: StoryObj<TooltipTriggerProps> = {
  args: {
    children: <input />,
  },
};

export const Interactive: StoryObj<TooltipTriggerProps> = {
  args: {
    tooltip: (
      <ActionHelpTooltip
        actionName="Switch Task"
        helpText="Tasks are stored locally only. Connect your issue tracker to link your commits with the corresponding issues."
        shortcut="⌥⇧T"
        link={<Link>Managing tasks</Link>}
      />
    ),
  },
};

export const Disabled: StoryObj<TooltipTriggerProps> = {
  args: {
    isDisabled: true,
  },
};

export const WithPointer: StoryObj<TooltipTriggerProps> = {
  args: {
    placement: "bottom",
    tooltip: (
      <ActionHelpTooltip
        actionName="Switch Task"
        helpText="Tasks are stored locally only. Connect your issue tracker to link your commits with the corresponding issues."
        shortcut="⌥⇧T"
        withPointer
      />
    ),
  },
};

export const All: StoryFn<TooltipTriggerProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <TooltipTrigger tooltip={<Tooltip children="Tooltip text" />}>
        <Button>button</Button>
      </TooltipTrigger>
      <Toolbar>
        <TooltipTrigger tooltip={<Tooltip children="Expand All" />}>
          <IconButton excludeFromTabOrder={false}>
            <PlatformIcon icon="actions/expandall" />
          </IconButton>
        </TooltipTrigger>
        <TooltipTrigger tooltip={<Tooltip children="Collapse All" />}>
          <IconButton excludeFromTabOrder={false}>
            <PlatformIcon icon="actions/collapseall" />
          </IconButton>
        </TooltipTrigger>
        <ToolbarSeparator />
        <TooltipTrigger tooltip={<Tooltip children="Show Options Menu" />}>
          <IconButton>
            <PlatformIcon icon="general/gearPlain" />
          </IconButton>
        </TooltipTrigger>
        <ToolbarSeparator />
        <TooltipTrigger
          tooltip={
            <ActionHelpTooltip
              actionName="Search Everywhere"
              shortcut="Double ⇧"
              helpText={
                <>
                  Searches for:
                  <ul
                    style={{
                      paddingLeft: ".5rem",
                      marginTop: ".125rem",
                      listStyleType: "'- '",
                    }}
                  >
                    <li>Classes</li>
                    <li>Files</li>
                    <li>Tool Windows</li>
                    <li>Actions</li>
                    <li>Settings</li>
                  </ul>
                </>
              }
            />
          }
        >
          <IconButton>
            <PlatformIcon icon="actions/search" />
          </IconButton>
        </TooltipTrigger>
      </Toolbar>
    </div>
  );
};
