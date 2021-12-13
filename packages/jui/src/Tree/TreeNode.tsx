import { usePress } from "@react-aria/interactions";
import { Node } from "@react-types/shared";
import React, { useContext, useRef } from "react";
import { ItemStateContext } from "../Collections/ItemStateContext";
import { StyledListItem } from "../List/StyledListItem";
import { styled } from "../styled";
import { TREE_ICON_SIZE, TreeNodeIcon } from "./TreeNodeIcon";
import { useTreeNode } from "./useTreeNode";
import { useTreeNodeToggleButton } from "./useTreeNodeToggleButton";
import { TreeContext } from "./TreeContext";

type TreeNodeProps<T> = {
  item: Node<T>;
};
const StyledTreeNode = styled(StyledListItem).attrs({ as: "div" })<{
  level: number;
}>`
  // There are some theme properties for tree node padding (theme.ui.Tree.leftChildIndent and
  // theme.ui.Tree.leftChildIndent), but they doesn't seem to be applicable.
  padding-left: ${({ level }) => `${(level + 1) * TREE_ICON_SIZE + 8}px`};
`;

export function TreeNode<T>({ item }: TreeNodeProps<T>) {
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
        containerFocused={containerFocused}
        disabled={isDisabled}
        selected={isSelected}
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        level={item.level}
      >
        {item.hasChildNodes && (
          <TreeNodeIcon
            selected={isSelected}
            expanded={expanded}
            {...togglePressProps}
          />
        )}
        <ItemStateContext.Provider
          value={{ isDisabled, isSelected, isFocused: containerFocused }}
        >
          {item.rendered}
        </ItemStateContext.Provider>
      </StyledTreeNode>
    </>
  );
}
