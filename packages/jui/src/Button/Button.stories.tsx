import { Meta, StoryFn, StoryObj } from "@storybook/react";
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

const render: StoryFn<ButtonProps> = (props) => {
  return <Button {...props} />;
};

export const SimpleUsage: StoryObj<ButtonProps> = {};

export const Disabled = {
  args: { isDisabled: true, children: "Disabled" },
};

export const Default = {
  args: { variant: "default", children: "Default" },
};

export const PreventFocusOnPress = {
  render: (props: ButtonProps) => (
    <div>
      <input autoFocus /> <br />
      <br />
      <Button {...props} />
    </div>
  ),

  args: {
    preventFocusOnPress: true,
    children: "Not focusable on press",
  },
};

export const ExcludeFromTabOrder = {
  render: (props: ButtonProps) => (
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
  ),

  args: {
    excludeFromTabOrder: true,
    children: "Not focusable by tab",
  },
};

export const NotFocusable = {
  args: {
    excludeFromTabOrder: true,
    preventFocusOnPress: true,
    children: "Not focusable",
  },
};

export const AutoFocus = {
  args: {
    autoFocus: true,
  },
};
