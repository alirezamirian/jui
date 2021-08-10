import { ThemeIcon } from "../Icon/ThemeIcon";
import React, { ComponentProps, useMemo } from "react";
import { styled } from "../styled";

export const TREE_ICON_SIZE = 16;
const StyledTreeNodeIcon = styled(ThemeIcon)`
  margin-left: -20px;
  margin-right: 4px;
`;

type TreeNodeIconProps = ComponentProps<typeof StyledTreeNodeIcon> & {
  selected: boolean;
  expanded: boolean;
};
const getIcon = (selected: boolean, expanded: boolean) => {
  if (expanded) {
    return selected
      ? {
          path: "Tree.expandedSelectedIcon",
          fallback:
            "/com/intellij/ide/ui/laf/icons/intellij/treeExpandedSelected.svg",
        }
      : {
          path: "Tree.expandedIcon",
          fallback: "/com/intellij/ide/ui/laf/icons/intellij/treeExpanded.svg",
        };
  }
  if (!expanded) {
    return selected
      ? {
          path: "Tree.collapsedSelectedIcon",
          fallback:
            "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsedSelected.svg",
        }
      : {
          path: "Tree.collapsedIcon",
          fallback: "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsed.svg",
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
      iconPath={icon?.path}
      fallbackIcon={icon?.fallback}
      size={TREE_ICON_SIZE}
      {...props}
    />
  );
}
