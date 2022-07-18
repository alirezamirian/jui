import React, { useContext } from "react";
import { ItemStateContext } from "@intellij-platform/core/Collections/ItemStateContext";

/**
 * Overrides color to a legible one, if the tree/list item (in which this span is rendered) is selected.
 * Can be used as base of styled components for specific item parts in lists and tree with a custom color.
 * @alpha
 */
export const SelectionAwareSpan: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  const { isSelected, isFocused } = useContext(ItemStateContext) || {
    isSelected: false,
    isFocused: false,
  };
  return (
    <span
      className={className}
      style={{ color: isSelected && isFocused ? "inherit" : undefined }}
    >
      {children}
    </span>
  );
};
