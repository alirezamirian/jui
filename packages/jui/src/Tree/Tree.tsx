import { Node } from "@react-types/shared";
import { Virtualizer } from "@react-aria/virtualizer";
import { TreeProps as StatelyTreeProps } from "@react-stately/tree";
import { TreeRef } from "@intellij-platform/core/Tree/useTreeRef";
import React, { ForwardedRef, Key, useRef } from "react";
import { TreeNode } from "./TreeNode";
import { TreeContext } from "./TreeContext";
import { useTreeState } from "./__tmp__useTreeState";
import { useSelectableTree } from "./useSelectableTree";
import { replaceSelectionManager } from "../selection/replaceSelectionManager";
import { useTreeVirtualizer } from "./useTreeVirtualizer";
import { StyledTree } from "@intellij-platform/core/Tree/StyledTree";

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
 *  - Match select all behaviour. Currently, `getSelectAllKeys` in `SelectionManager` returns
 *   all nested keys too. But it's not aligned with Tree implementation in Intellij Platform. And
 *   beside from that, it seems to be a little inconsistent in some edge cases where you select all,
 *   and then deselect a node. Then all of a sudden, all collapsed nested keys are no longer selected.
 */
export const Tree = React.forwardRef(
  <T extends object>(
    { fillAvailableSpace = false, onAction, ...props }: TreeProps<T>,
    forwardedRef: ForwardedRef<TreeRef>
  ) => {
    const state = replaceSelectionManager(useTreeState(props, forwardedRef));
    const ref = useRef<HTMLDivElement>(null);

    const { treeProps, treeContext } = useSelectableTree(
      {
        isVirtualized: true,
        onAction,
        ...state,
      },
      ref
    );
    const { virtualizerProps } = useTreeVirtualizer({ state });

    const renderNode = (item: Node<T>) => (
      <TreeNode key={item.key} item={item} />
    );

    return (
      <TreeContext.Provider value={treeContext}>
        <StyledTree
          as={Virtualizer}
          ref={ref}
          fillAvailableSpace={fillAvailableSpace}
          {...virtualizerProps}
          {...treeProps}
        >
          {(itemType: string, item: object) => renderNode(item as Node<T>)}
        </StyledTree>
      </TreeContext.Provider>
    );
  }
);
