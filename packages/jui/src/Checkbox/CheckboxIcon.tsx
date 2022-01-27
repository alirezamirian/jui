import React, { ComponentProps } from "react";
import { LafIcon } from "@intellij-platform/core/Icon";

/**
 * Renders checkbox UI in different states (focused, selected, indeterminate, etc.), without having anything to do
 * with the interactions
 */
export const CheckboxIcon = ({
  isDisabled,
  isFocused,
  isIndeterminate,
  isSelected,
  ...otherProps
}: Omit<ComponentProps<typeof LafIcon>, "size" | "icon"> & {
  isIndeterminate: boolean | undefined;
  isFocused: boolean;
  isDisabled: boolean | undefined;
  isSelected: boolean;
}) => {
  return (
    <LafIcon
      {...otherProps}
      size={20}
      icon={{
        name: isIndeterminate ? "checkBoxIndeterminate" : "checkBox",
        modifiers: {
          Disabled: isDisabled,
          Selected: isSelected || isIndeterminate,
          Focused: isFocused,
        },
      }}
    />
  );
};
