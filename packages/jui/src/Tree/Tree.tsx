import React, { ForwardedRef, RefObject, useRef } from "react";
import { Node } from "@react-types/shared";
import { Virtualizer } from "@react-aria/virtualizer";
import { TreeProps as StatelyTreeProps } from "@react-stately/tree";
import { StyledTree } from "./StyledTree";
import { TreeRefValue } from "./useTreeRef";
import { TreeNode } from "./TreeNode";
import { TreeContext } from "./TreeContext";
import { useTreeState } from "./useTreeState";
import { SelectableTreeProps, useSelectableTree } from "./useSelectableTree";
import { useTreeVirtualizer } from "./useTreeVirtualizer";
import { CollectionCacheInvalidationProps } from "@intellij-platform/core/Collections/useCollectionCacheInvalidation";
import {
  CollectionRefProps,
  useCollectionRef,
} from "@intellij-platform/core/Collections/useCollectionRef";
import { useObjectRef } from "@react-aria/utils";

export interface TreeProps<T extends object>
  extends Omit<StatelyTreeProps<T>, "disallowEmptySelection">,
    CollectionCacheInvalidationProps,
    CollectionRefProps,
    Omit<SelectableTreeProps<T>, "keyboardDelegate" | "isVirtualized"> {
  fillAvailableSpace?: boolean;
  /**
   * When true, shows the tree in focused style, even when it's not focused. A common use case is when the tree
   * is virtually focused. i.e. the focus is physically on some other element (like a search input) which handles
   * keyboard events as if the tree was focused.
   */
  showAsFocused?: boolean;
  treeRef?: RefObject<TreeRefValue>;
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
    { fillAvailableSpace = false, treeRef, ...props }: TreeProps<T>,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const state = useTreeState(props, treeRef);
    useCollectionRef(props, state);
    const ref = useObjectRef(forwardedRef);

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
          as={Virtualizer<Node<any>, unknown>}
          ref={ref}
          fillAvailableSpace={fillAvailableSpace}
          {...virtualizerProps}
          {...treeProps}
        >
          {(itemType: string, item: Node<any>) => (
            <TreeNode key={item.key} item={item as Node<T>} />
          )}
        </StyledTree>
      </TreeContext.Provider>
    );
  }
);
