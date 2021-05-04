import { Theme } from "../Theme/createTheme";
import { Icon } from "../Icon/Icon";
import React from "react";
import { styled } from "../styled";

export const TREE_ICON_SIZE = 16;
const StyledTreeNodeIcon = styled(Icon)`
  margin-left: -20px;
  margin-right: 4px;
`;

export function TreeNodeIcon({
  expanded,
}: {
  selected: boolean;
  expanded: boolean;
}) {
  const getIcon = (theme: Theme) => {
    const {
      expandedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeExpanded.svg",
      collapsedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsed.svg",
      // it seems selected icons are not used. TODO: make sure.
      // expandedSelectedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeExpandedSelected.svg",
      // collapsedSelectedIcon = "/com/intellij/ide/ui/laf/icons/intellij/treeCollapsedSelected.svg",
    } = theme.ui?.Tree || {};

    if (expanded) {
      return expandedIcon;
    }
    if (!expanded) {
      return collapsedIcon;
    }
  };
  return <StyledTreeNodeIcon src={getIcon} size={TREE_ICON_SIZE} />;
}
