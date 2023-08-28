import { Meta, StoryObj } from "@storybook/react";
import { ActionTooltip, ActionTooltipProps } from "@intellij-platform/core";
import React from "react";

export default {
  title: "Components/Tooltip/Action",
  component: ActionTooltip,
  args: {
    actionName: "Commit",
  },
  argTypes: {},
} as Meta<ActionTooltipProps>;

export const Default: StoryObj<ActionTooltipProps> = {};
export const Long: StoryObj<ActionTooltipProps> = {
  args: {
    actionName:
      "/workspace/intellij-community/platform/platform-api/src/com/intellij/ide/HelpTooltip.java",
  },
};
export const WithShortcut: StoryObj<ActionTooltipProps> = {
  args: {
    shortcut: "⌘K",
  },
};
