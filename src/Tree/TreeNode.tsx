import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { TREE_ICON_SIZE, TreeNodeIcon } from "./TreeNodeIcon";
import React, { useRef } from "react";
import { styled } from "../styled";
import { StyledListItem } from "../List/StyledListItem";
import { useSelectableItem } from "@react-aria/selection";
import { usePress } from "@react-aria/interactions";

type TreeNodeProps<T> = {
  item: Node<T>;
  state: TreeState<T>;
  containerFocused: boolean;
};
const StyledTreeNode = styled(StyledListItem).attrs({ as: "div" })<{
  level: number;
}>`
  // There are some theme properties for tree node padding (theme.ui.Tree.leftChildIndent and
  // theme.ui.Tree.leftChildIndent), but they doesn't seem to be applicable.
  padding-left: ${({ level }) => `${(level + 1) * TREE_ICON_SIZE + 8}px`};
`;

export function TreeNode<T>({
  item,
  state: { selectionManager, expandedKeys, disabledKeys },
  containerFocused,
}: TreeNodeProps<T>) {
  const ref = useRef(null);
  const selected = selectionManager.isSelected(item.key);
  const expanded = expandedKeys.has(item.key);
  const disabled = disabledKeys.has(item.key);
  const { itemProps } = useSelectableItem({
    key: item.key,
    ref,
    selectionManager,
    isVirtualized: false,
  });
  let { pressProps } = usePress({
    ...itemProps,
    isDisabled: disabled,
    preventFocusOnPress: false,
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
        {...pressProps}
        containerFocused={containerFocused}
        disabled={disabled}
        selected={selected}
        aria-disabled={disabled}
        aria-selected={selected}
        level={item.level}
      >
        {item.hasChildNodes && (
          <TreeNodeIcon selected={selected} expanded={expanded} />
        )}
        {item.rendered}
      </StyledTreeNode>
    </>
  );
}
