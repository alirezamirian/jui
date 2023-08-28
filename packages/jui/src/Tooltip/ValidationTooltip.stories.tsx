import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
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

export const Default: StoryObj<ValidationTooltipProps> = {};

export const Warning: StoryObj<ValidationTooltipProps> = {
  args: {
    type: "warning",
  },
};

export const MultiLine: StoryObj<ValidationTooltipProps> = {
  args: {
    children: (
      <>
        Branch name foo already exists. <br />
        Change the name or overwrite existing branch
      </>
    ),
  },
};
