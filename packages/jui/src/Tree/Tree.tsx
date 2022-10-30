import React, { ForwardedRef, useRef } from "react";
import { Node } from "@react-types/shared";
import { Virtualizer } from "@react-aria/virtualizer";
import { TreeProps as StatelyTreeProps } from "@react-stately/tree";
import { replaceSelectionManager } from "@intellij-platform/core/selection";
import { StyledTree } from "./StyledTree";
import { TreeRef } from "./useTreeRef";
import { TreeNode } from "./TreeNode";
import { TreeContext } from "./TreeContext";
import { useTreeState } from "./__tmp__useTreeState";
import { SelectableTreeProps, useSelectableTree } from "./useSelectableTree";
import { useTreeVirtualizer } from "./useTreeVirtualizer";
import { CollectionCacheInvalidationProps } from "@intellij-platform/core/Collections/useCollectionCacheInvalidation";

export interface TreeProps<T extends object>
  extends Omit<StatelyTreeProps<T>, "disallowEmptySelection">,
    CollectionCacheInvalidationProps,
    Omit<SelectableTreeProps<T>, "keyboardDelegate" | "isVirtualized"> {
  fillAvailableSpace?: boolean;
  /**
   * Shows the tree in focused style, even when it's not focused. Should be avoided in general, but there might be
   * special valid use cases.
   */
  alwaysShowAsFocused?: boolean;
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
    {
      fillAvailableSpace = false,
      alwaysShowAsFocused = false,
      ...props
    }: TreeProps<T>,
    forwardedRef: ForwardedRef<TreeRef>
  ) => {
    const state = replaceSelectionManager(useTreeState(props, forwardedRef));
    const ref = useRef<HTMLDivElement>(null);

    const { treeProps, treeContext } = useSelectableTree(
      {
        ...props,
        isVirtualized: true,
      },
      state,
      ref
    );
    const { virtualizerProps } = useTreeVirtualizer({ state });

    return (
      <TreeContext.Provider value={treeContext}>
        <StyledTree
          as={Virtualizer}
          ref={ref}
          fillAvailableSpace={fillAvailableSpace}
          {...virtualizerProps}
          {...treeProps}
        >
          {(itemType: string, item: object) => (
            <TreeNode
              key={(item as Node<T>).key}
              item={item as Node<T>}
              alwaysShowAsFocused={alwaysShowAsFocused}
            />
          )}
        </StyledTree>
      </TreeContext.Provider>
    );
  }
);
