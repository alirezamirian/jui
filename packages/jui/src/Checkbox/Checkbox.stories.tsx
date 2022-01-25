import { Meta, Story } from "@storybook/react";
import React from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    children: "Enable the awesome settings",
  },
} as Meta;

export const Default: Story<CheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

export const Disabled = Default.bind({});
Disabled.args = { isDisabled: true };

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelected: true };

export const Selected = Default.bind({});
Selected.args = { isSelected: true };

export const Indeterminate = Default.bind({});
Indeterminate.args = { isIndeterminate: true };

export const IndeterminateDisabled = Default.bind({});
IndeterminateDisabled.args = { isIndeterminate: true, isDisabled: true };

export const WithoutLabel = Default.bind({});
WithoutLabel.args = { children: null };

export const PreventFocus = Default.bind({});
PreventFocus.args = { preventFocus: true };

export const ExcludeFromTabOrder = Default.bind({});
ExcludeFromTabOrder.args = { excludeFromTabOrder: true };

export const DisableFocusAlwaysVisible = Default.bind({});
DisableFocusAlwaysVisible.args = { disableFocusAlwaysVisible: true };
