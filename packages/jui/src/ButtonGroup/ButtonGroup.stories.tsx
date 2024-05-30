import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button, BareButton } from "@intellij-platform/core/Button";
import {
  ButtonGroup,
  ButtonGroupProps,
} from "@intellij-platform/core/ButtonGroup";
import { IconButton, PlatformIcon } from "@intellij-platform/core";

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  args: {
    children: (
      <>
        <Button>Cancel</Button>
        <Button variant="default">Ok</Button>
      </>
    ),
  },
} as Meta<ButtonGroupProps>;

export const Default: StoryObj = {};

export const WithOtherButtons: StoryObj = {
  args: {
    children: (
      <>
        <Button>Button</Button>
        <BareButton>
          <button>button</button>
        </BareButton>
        <IconButton aria-label="Search">
          <PlatformIcon icon="actions/search" />
        </IconButton>
      </>
    ),
  },
};
