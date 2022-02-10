import {
  SpeedSearchTree,
  SpeedSearchTreeProps,
} from "@intellij-platform/core/Tree";
import React from "react";
import { NestedSelectionState } from "./NestedSelection";

/**
 * Experimental wrapper component around SpeedSearchTree, which allows rendering {@link TreeNodeCheckbox} in nodes.
 *
 * See [design-decisions.md](../Tree/design-decisions.md) for more thoughts about how should different features
 * like this be supported.
 *
 */
export const SpeedSearchTreeWithCheckboxes = <T extends object>({
  nestedSelection,
  cacheInvalidation,
  onNodeKeyDown,
  ...props
}: SpeedSearchTreeProps<T> & {
  nestedSelection: NestedSelectionState<T>;
}): React.ReactElement => {
  const otherInvalidators =
    typeof cacheInvalidation === "object" ? cacheInvalidation.invalidators : [];
  return (
    <SpeedSearchTree
      {...props}
      // instead of passing cacheInvalidation, a better approach could be to provide nestedSelection as context.
      cacheInvalidation={{
        invalidators: [nestedSelection, ...otherInvalidators],
      }}
      onNodeKeyDown={(event, item) => {
        if (event.key === " ") {
          nestedSelection.toggle(item.value);
        }
        onNodeKeyDown?.(event, item);
      }}
    />
  );
};
