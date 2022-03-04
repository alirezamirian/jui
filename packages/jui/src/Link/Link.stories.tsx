import { Meta, Story } from "@storybook/react";
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

const Template: Story<LinkProps> = (props) => {
  return <Link {...props} />;
};

export const Default: Story<LinkProps> = Template.bind({});

export const Disabled: Story<LinkProps> = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
