import { Meta, Story } from "@storybook/react";
import React from "react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: { onPress: { action: "pressed" } },
} as Meta;

const Template: Story<ButtonProps> = (props) => {
  return <Button {...props} />;
};

export const SimpleUsage: Story<ButtonProps> = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, children: "Disabled" };

export const Default = Template.bind({});
Default.args = { isDefault: true, children: "Default" };

export const PreventFocusOnPress = (props: ButtonProps) => (
  <div>
    <input autoFocus /> <br />
    <br />
    <Button {...props} />
  </div>
);
PreventFocusOnPress.args = {
  preventFocusOnPress: true,
  children: "Not focusable on press",
};

export const ExcludeFromTabOrder = (props: ButtonProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      alignItems: "start",
    }}
  >
    <input autoFocus placeholder="Press tab..." />
    <Button {...props} />
    <input />
  </div>
);

ExcludeFromTabOrder.args = {
  excludeFromTabOrder: true,
  children: "Not focusable by tab",
};

export const NotFocusable = Template.bind({});
NotFocusable.args = {
  excludeFromTabOrder: true,
  preventFocusOnPress: true,
  children: "Not focusable",
};
