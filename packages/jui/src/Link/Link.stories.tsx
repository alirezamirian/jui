import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { Link, LinkProps } from "./Link";

export default {
  title: "Components/Link",
  component: Link,
  args: {
    children: "Open something something",
    href: "",
  } as LinkProps,
  argTypes: { onPress: { action: "pressed" } },
} as Meta;

export const Default: StoryObj<LinkProps> = {};

export const Disabled: StoryObj<LinkProps> = {
  args: {
    isDisabled: true,
  },
};
