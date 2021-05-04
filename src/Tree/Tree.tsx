import { TreeProps, useTreeState } from "@react-stately/tree";
import React, { useState } from "react";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { StyledList } from "../List/StyledList";
import { TreeNode } from "./TreeNode";

interface Props<T extends object> extends TreeProps<T> {
  fillAvailableSpace?: boolean;
}

export function Tree<T extends object>({
  fillAvailableSpace = false,
  ...props
}: Props<T>) {
  const state = useTreeState(props);
  const [focused, setFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  return (
    <StyledList
      as="div"
      fillAvailableSpace={fillAvailableSpace}
      {...mergeProps(focusWithinProps)}
      tabIndex={-1} // FIXME remove when handled in useTree
    >
      {[...state.collection.getKeys()]
        .map((key) => state.collection.getItem(key))
        .map((item) => {
          return (
            <TreeNode
              key={item.key}
              item={item}
              state={state}
              containerFocused={focused}
            />
          );
        })}
    </StyledList>
  );
}
