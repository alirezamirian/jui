import { Meta, Story } from "@storybook/react";
import { HelpTooltip, HelpTooltipProps, Link } from "@intellij-platform/core";
import React from "react";

export default {
  title: "Components/Tooltip/Help",
  component: HelpTooltip,
  args: {
    helpText:
      "Useful when moving constants (static final fields) to an enum type in cases when the enum type has a constructor with one parameter of the suitable type.",
  },
  argTypes: {},
} as Meta<HelpTooltipProps>;

const Template: Story<HelpTooltipProps> = (props) => {
  return <HelpTooltip {...props} />;
};

export const Default: Story<HelpTooltipProps> = Template.bind({});

export const WithShortcut: Story<HelpTooltipProps> = Template.bind({});
WithShortcut.args = {
  shortcut: "⌘M",
};

export const WithLink: Story<HelpTooltipProps> = Template.bind({});
WithLink.args = {
  link: <Link>Example</Link>,
};

export const WithShortcutAndLink: Story<HelpTooltipProps> = Template.bind({});

WithShortcutAndLink.args = {
  shortcut: "⌘M",
  link: <Link>Example</Link>,
};
