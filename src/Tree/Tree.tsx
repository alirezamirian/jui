import { TreeProps } from "@react-stately/tree";
import React, { useRef, useState } from "react";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { StyledList } from "../List/StyledList";
import { TreeNode } from "./TreeNode";
import { useTreeState } from "./__tmp__useTreeState";
import { useSelectableTree } from "./useSelectableTree";

interface Props<T extends object> extends TreeProps<T> {
  fillAvailableSpace?: boolean;
}

export function Tree<T extends object>({
  fillAvailableSpace = false,
  ...props
}: Props<T>) {
  const state = useTreeState(props);
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  const { treeProps } = useSelectableTree(state, ref);

  return (
    <StyledList
      as="div"
      ref={ref}
      fillAvailableSpace={fillAvailableSpace}
      {...mergeProps(focusWithinProps, treeProps)}
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
