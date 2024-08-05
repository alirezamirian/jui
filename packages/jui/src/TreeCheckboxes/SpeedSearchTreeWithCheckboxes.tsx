import React, { ForwardedRef } from "react";
import {
  SpeedSearchTree,
  SpeedSearchTreeProps,
  TreeRefValue,
} from "@intellij-platform/core/Tree";
import { NestedSelectionState } from "./NestedSelection";

/**
 * Experimental wrapper component around SpeedSearchTree, which allows rendering {@link TreeNodeCheckbox} in nodes.
 *
 * See [design-decisions.md](../Tree/design-decisions.md) for more thoughts about how should different features
 * like this be supported.
 *
 * @alpha
 */
export const SpeedSearchTreeWithCheckboxes = React.forwardRef(
  <T extends object>(
    {
      nestedSelection,
      cacheInvalidation,
      onNodeKeyDown,
      ...props
    }: SpeedSearchTreeProps<T> & {
      nestedSelection: NestedSelectionState<T>;
    },
    ref: ForwardedRef<HTMLDivElement>
  ): React.ReactElement => {
    const otherInvalidators =
      typeof cacheInvalidation === "object"
        ? cacheInvalidation.invalidators
        : [];
    return (
      <SpeedSearchTree
        ref={ref}
        {...props}
        // instead of passing cacheInvalidation, a better approach could be to provide nestedSelection as context.
        cacheInvalidation={{
          invalidators: [nestedSelection, ...otherInvalidators],
        }}
        onNodeKeyDown={(event, item) => {
          if (event.key === " " && item.value) {
            nestedSelection.toggle(item.value);
          }
          onNodeKeyDown?.(event, item);
        }}
      />
    );
  }
);
