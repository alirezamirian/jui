import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { TREE_ICON_SIZE, TreeNodeIcon } from "./TreeNodeIcon";
import React from "react";
import { styled } from "../styled";
import { StyledListItem } from "../List/StyledListItem";

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
  state,
  containerFocused,
}: TreeNodeProps<T>) {
  const selected = state.selectionManager.isSelected(item.key);
  const expanded = state.expandedKeys.has(item.key);
  const disabled = state.disabledKeys.has(item.key);

  return (
    <>
      <StyledTreeNode
        containerFocused={containerFocused}
        disabled={disabled}
        selected={selected}
        level={item.level}
      >
        {item.hasChildNodes && (
          <TreeNodeIcon selected={selected} expanded={expanded} />
        )}
        {item.rendered}
      </StyledTreeNode>
      {expanded &&
        [...item.childNodes].map((childItem) => (
          <TreeNode
            key={childItem.key}
            item={childItem}
            state={state}
            containerFocused={containerFocused}
          />
        ))}
    </>
  );
}
