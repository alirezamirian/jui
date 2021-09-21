import { LafIcon } from "../Icon";
import React, { ComponentProps, useMemo } from "react";
import { styled } from "../styled";

export const TREE_ICON_SIZE = 16;
const StyledTreeNodeIcon = styled(LafIcon)`
  margin-left: -20px;
  margin-right: 4px;
  margin-top: -1px; // the svg path seems to have uneven vertical padding. This is to compensate for that.
  flex-shrink: 0;
  align-self: center;
`;

type TreeNodeIconProps = ComponentProps<typeof StyledTreeNodeIcon> & {
  selected: boolean;
  expanded: boolean;
};
const getIcon = (selected: boolean, expanded: boolean) => {
  const modifiers = { Selected: selected };
  if (expanded) {
    return {
      themePath: selected ? "Tree.expandedSelectedIcon" : "Tree.expandedIcon",
      iconPath: { name: "treeExpanded", modifiers },
    };
  }
  if (!expanded) {
    return {
      themePath: selected ? "Tree.collapsedSelectedIcon" : "Tree.collapsedIcon",
      iconPath: { name: "treeCollapsed", modifiers },
    };
  }
};

export function TreeNodeIcon({
  selected,
  expanded,
  ...props
}: TreeNodeIconProps) {
  const icon = useMemo(() => getIcon(selected, expanded), [selected, expanded]);
  return (
    <StyledTreeNodeIcon
      icon={icon?.iconPath}
      themePath={icon?.themePath}
      size={TREE_ICON_SIZE}
      {...props}
    />
  );
}
