import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HelpTooltip, HelpTooltipProps, Link } from "@intellij-platform/core";

export default {
  title: "Components/Tooltip/Help",
  component: HelpTooltip,
  args: {
    helpText:
      "Useful when moving constants (static final fields) to an enum type in cases when the enum type has a constructor with one parameter of the suitable type.",
  },
  argTypes: {},
} as Meta<HelpTooltipProps>;

export const Default: StoryObj<HelpTooltipProps> = {};

export const WithShortcut: StoryObj<HelpTooltipProps> = {
  args: {
    shortcut: "⌘M",
  },
};

export const WithLink: StoryObj<HelpTooltipProps> = {
  args: {
    link: <Link>Example</Link>,
  },
};

export const WithShortcutAndLink: StoryObj<HelpTooltipProps> = {
  args: {
    shortcut: "⌘M",
    link: <Link>Example</Link>,
  },
};
