import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    children: "Enable the awesome settings",
  },
} as Meta<CheckboxProps>;

export const Default: StoryObj<CheckboxProps> = {};

export const Disabled: StoryObj<CheckboxProps> = {
  args: { isDisabled: true },
};

export const DefaultSelected: StoryObj<CheckboxProps> = {
  args: { defaultSelected: true },
};

export const Selected: StoryObj<CheckboxProps> = {
  args: { isSelected: true },
};

export const Indeterminate: StoryObj<CheckboxProps> = {
  args: { isIndeterminate: true },
};

export const IndeterminateDisabled: StoryObj<CheckboxProps> = {
  args: { isIndeterminate: true, isDisabled: true },
};

export const WithoutLabel: StoryObj<CheckboxProps> = {
  args: { children: null },
};

export const PreventFocus: StoryObj<CheckboxProps> = {
  args: { preventFocus: true },
};

export const ExcludeFromTabOrder: StoryObj<CheckboxProps> = {
  args: { excludeFromTabOrder: true },
};

export const DisableFocusAlwaysVisible: StoryObj<CheckboxProps> = {
  args: { disableFocusAlwaysVisible: true },
};
