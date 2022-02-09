import React, { useContext } from "react";
import { ItemStateContext } from "@intellij-platform/core";

/**
 * Overrides color to a legible one, if the tree/list item (in which this span is rendered) is selected.
 * TODO(lib-candidate)
 * @param children
 * @param className
 * @constructor
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
