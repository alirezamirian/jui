import { TreeProps } from "@react-stately/tree";
import React, { useRef, useState } from "react";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { StyledList } from "../List/StyledList";
import { TreeNode } from "./TreeNode";
import { useTreeState } from "./__tmp__useTreeState";
import { useCollectionAutoScroll } from "../Collections/useCollectionAutoScroll";
import { SelectionManager } from "@react-stately/selection";
import { useSelectableTree } from "./useSelectableTree";
import { replaceSelectionManager } from "../selection/replaceSelectionManager";

interface Props<T extends object> extends TreeProps<T> {
  fillAvailableSpace?: boolean;
}

export function Tree<T extends object>({
  fillAvailableSpace = false,
  ...props
}: Props<T>) {
  const state = replaceSelectionManager(useTreeState(props));
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  const { treeProps } = useSelectableTree(state, ref);
  useCollectionAutoScroll(
    {
      isVirtualized: false,
      selectionManager: state.selectionManager as SelectionManager,
    },
    ref
  );
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
