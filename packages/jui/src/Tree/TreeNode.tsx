import { usePress } from "@react-aria/interactions";
import { Node } from "@react-types/shared";
import React, { useContext, useRef } from "react";
import { ItemStateContext } from "../Collections/ItemStateContext";
import { TreeNodeIcon } from "./TreeNodeIcon";
import { useTreeNode } from "./useTreeNode";
import { useTreeNodeToggleButton } from "./useTreeNodeToggleButton";
import { TreeContext } from "./TreeContext";
import { StyledTreeNode } from "@intellij-platform/core/Tree/StyledTreeNode";

type TreeNodeProps<T> = {
  item: Node<T>;
  alwaysShowAsFocused?: boolean;
};

export function TreeNode<T>({
  item,
  alwaysShowAsFocused = false,
}: TreeNodeProps<T>) {
  const ref = useRef(null);
  const {
    state: {
      collection,
      selectionManager,
      expandedKeys,
      disabledKeys,
      toggleKey,
    },
    focused: containerFocused,
    onActionRef: { current: onAction },
  } = useContext(TreeContext)!;

  const isSelected = selectionManager.isSelected(item.key);
  const expanded = expandedKeys.has(item.key);
  const isDisabled = disabledKeys.has(item.key);

  const { pressProps: togglePressProps } = usePress({
    ...useTreeNodeToggleButton({
      key: item.key,
      collection,
      selectionManager,
      toggleKey,
    }).treeNodeToggleButtonProps,
    isDisabled,
  });

  const { treeNodeProps } = useTreeNode({
    item,
    ref,
    toggleKey,
    onAction,
    selectionManager,
    disabled: isDisabled,
  });

  /**
   * NOTE: TreeNode intentionally is not designed in a recursive way for two main reasons:
   * - Performance
   * - Better support for virtualization
   * So instead of rendering TreeNode for childNodes, if the node is expanded, we expect parent
   * to render children. It's not a layout issue since we don't need any nesting in terms of
   * layout of nested items. In terms of layout, a tree will be rendered similar to a flat list,
   * but with more indentation for nested nodes.
   */
  return (
    <>
      <StyledTreeNode
        ref={ref}
        {...treeNodeProps}
        containerFocused={containerFocused || alwaysShowAsFocused}
        disabled={isDisabled}
        selected={isSelected}
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        level={item.level}
      >
        {[...item.childNodes].length > 0 && (
          <TreeNodeIcon
            selected={isSelected}
            expanded={expanded}
            {...togglePressProps}
          />
        )}
        <ItemStateContext.Provider
          value={{
            isDisabled,
            isSelected,
            isFocused: containerFocused,
            node: item,
          }}
        >
          {item.rendered}
        </ItemStateContext.Provider>
      </StyledTreeNode>
    </>
  );
}
