import { Meta, StoryObj } from "@storybook/react";
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

export const PreventFocusOnPress: StoryObj<LinkProps> = {
  args: {
    preventFocusOnPress: true,
  },
};

export const ExcludeFromTabOrder: StoryObj<LinkProps> = {
  args: {
    excludeFromTabOrder: true,
  },
};
