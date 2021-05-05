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

/**
 * TODO:
 *  - virtualization
 *  - Match select all behaviour. Currently, [getSelectAllKeys][1] in `SelectionManager` returns
 * all
 *    nested keys too. But it's not aligned with Tree implementation in Intellij Platform. And
 * beside from that, it seems to be a little inconsistent in some edge cases where you select all,
 * and then deselect a node. hen all of a sudden, all collapsed nested keys are no longer selected.
 *
 *  [1]:
 * https://github.com/adobe/react-spectrum/blob/main/packages/@react-stately/selection/src/SelectionManager.ts#L303-L303
 */
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
