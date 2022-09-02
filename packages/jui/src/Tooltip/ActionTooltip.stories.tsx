import { Meta, Story } from "@storybook/react";
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

const Template: Story<ActionTooltipProps> = (props) => {
  return <ActionTooltip {...props} />;
};

export const Default: Story<ActionTooltipProps> = Template.bind({});

export const Long: Story<ActionTooltipProps> = Template.bind({});
Long.args = {
  actionName:
    "/workspace/intellij-community/platform/platform-api/src/com/intellij/ide/HelpTooltip.java",
};

export const WithShortcut: Story<ActionTooltipProps> = Template.bind({});
WithShortcut.args = {
  shortcut: "⌘K",
};
