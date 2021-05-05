import { Theme } from "../Theme/createTheme";
import { Icon } from "../Icon/Icon";
import React, { ComponentProps } from "react";
import { styled } from "../styled";

export const TREE_ICON_SIZE = 16;
const StyledTreeNodeIcon = styled(Icon)`
  margin-left: -20px;
  margin-right: 4px;
`;

type TreeNodeIconProps = ComponentProps<typeof StyledTreeNodeIcon> & {
  selected: boolean;
  expanded: boolean;
};

export function TreeNodeIcon({
  selected,
  expanded,
  ...props
}: TreeNodeIconProps) {
  const getIcon = (theme: Theme) => {
    const {
      expandedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeExpanded.svg",
      collapsedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsed.svg",
      expandedSelectedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeExpandedSelected.svg",
      collapsedSelectedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsedSelected.svg",
    } = theme.ui?.Tree || {};

    if (expanded) {
      return selected ? expandedSelectedIcon : expandedIcon;
    }
    if (!expanded) {
      return selected ? collapsedSelectedIcon : collapsedIcon;
    }
  };
  return <StyledTreeNodeIcon icon={getIcon} size={TREE_ICON_SIZE} {...props} />;
}
