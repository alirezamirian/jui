import { Meta, Story } from "@storybook/react";
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

const Template: Story<ActionHelpTooltipProps> = (props) => {
  return <ActionHelpTooltip {...props} />;
};

export const Default = Template.bind({});

export const WithShortcut = Template.bind({});
WithShortcut.args = {
  shortcut: "⌥⇧T",
};

export const WithLink = Template.bind({});
WithLink.args = {
  link: <Link>Managing tasks</Link>,
};

export const WithShortcutAndLink = Template.bind({});
WithShortcutAndLink.args = {
  shortcut: "⌥⇧T",
  link: <Link>Managing tasks</Link>,
};
