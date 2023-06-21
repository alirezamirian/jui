import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  ValidationTooltip,
  ValidationTooltipProps,
} from "@intellij-platform/core";

export default {
  title: "Components/Tooltip/Validation",
  component: ValidationTooltip,
  args: {
    children: "The port number should be between 0 and 65535.",
  },
  argTypes: {},
} as Meta<ValidationTooltipProps>;

const Template: Story<ValidationTooltipProps> = (props) => {
  return <ValidationTooltip {...props} />;
};

export const Default: Story<ValidationTooltipProps> = Template.bind({});

export const Warning: Story<ValidationTooltipProps> = Template.bind({});
Warning.args = {
  type: "warning",
};

export const MultiLine: Story<ValidationTooltipProps> = Template.bind({});
MultiLine.args = {
  children: (
    <>
      Branch name foo already exists. <br />
      Change the name or overwrite existing branch
    </>
  ),
};
