import { TreeProps as StatelyTreeProps } from "@react-stately/tree";
import React, { Key, useRef } from "react";
import { StyledList } from "../List/StyledList";
import { TreeNode } from "./TreeNode";
import { useTreeState } from "./__tmp__useTreeState";
import { useSelectableTree } from "./useSelectableTree";
import { replaceSelectionManager } from "../selection/replaceSelectionManager";

export interface TreeProps<T extends object> extends StatelyTreeProps<T> {
  fillAvailableSpace?: boolean;
  /**
   * Called when the action associated with a leaf tree node should be taken.
   * The exact UI interaction is abstracted away, but it's either Enter key or double click.
   */
  onAction?: (key: Key) => void;
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
  onAction,
  ...props
}: TreeProps<T>) {
  const state = replaceSelectionManager(useTreeState(props));
  const ref = useRef<HTMLDivElement>(null);

  const { treeProps, focused } = useSelectableTree(
    {
      onAction,
      ...state,
    },
    ref
  );
  return (
    <StyledList
      as="div"
      ref={ref}
      fillAvailableSpace={fillAvailableSpace}
      {...treeProps}
    >
      {[...state.collection.getKeys()]
        .map((key) => state.collection.getItem(key))
        .map((item) => {
          return (
            <TreeNode
              key={item.key}
              item={item}
              state={state}
              onAction={onAction}
              containerFocused={focused}
            />
          );
        })}
    </StyledList>
  );
}
