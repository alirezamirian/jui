import { Meta, StoryFn } from "@storybook/react";
import {
  ActionHelpTooltip,
  ActionHelpTooltipProps,
  Link,
} from "@intellij-platform/core";
import React from "react";

export default {
  title: "Components/Tooltip/ActionHelp",
  component: ActionHelpTooltip,
  args: {
    actionName: "Switch Task",
    helpText:
      "Tasks are stored locally only. Connect your issue tracker to link your commits with the corresponding issues.",
  },
  argTypes: {},
} as Meta<ActionHelpTooltipProps>;

export const Default = {};

export const WithShortcut = {
  args: {
    shortcut: "⌥⇧T",
  },
};

export const WithLink = {
  args: {
    link: <Link>Managing tasks</Link>,
  },
};

export const WithShortcutAndLink = {
  args: {
    shortcut: "⌥⇧T",
    link: <Link>Managing tasks</Link>,
  },
};
