import { styled, UnknownThemeProp } from "@intellij-platform/core";
import { StyledListItem } from "@intellij-platform/core/List/StyledListItem";
import { TREE_ICON_SIZE } from "@intellij-platform/core/Tree/TreeNodeIcon";

export const StyledTreeNode = styled(StyledListItem).attrs({ as: "div" })<{
  level: number;
}>`
  // There are some theme properties for tree node padding (theme.ui.Tree.leftChildIndent and
  // theme.ui.Tree.leftChildIndent), but they doesn't seem to be applicable.
  padding-left: ${({ level }) => `${(level + 1) * TREE_ICON_SIZE + 8}px`};
  ${({ containerFocused, selected, disabled, theme }) => {
    let backgroundColor;
    let color = disabled
      ? theme.color("*.disabledForeground")
      : theme.color(
          "Tree.foreground" as UnknownThemeProp<"Tree.foreground">,
          theme.commonColors.labelForeground
        );
    if (selected) {
      if (containerFocused) {
        color =
          theme.color(
            "Tree.selectionForeground" as UnknownThemeProp<"Tree.selectionForeground">
          ) ||
          theme.commonColors
            .labelSelectedForeground /* Prioritizing "*.selectionForeground" over labelSelectedForeground*/;
        backgroundColor = theme.color(
          "Tree.selectionBackground" as UnknownThemeProp<"Tree.selectionBackground">
        );
      } else {
        color = theme.color(
          "Tree.selectionInactiveForeground" as UnknownThemeProp<"Tree.selectionInactiveForeground">,
          color
        );
        backgroundColor = theme.color(
          "Tree.selectionBackgroundInactive" as UnknownThemeProp<"Tree.selectionBackgroundInactive">
        );
      }
    }
    return {
      backgroundColor,
      color,
    };
  }}
`;
