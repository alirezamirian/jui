import React, { useContext } from "react";
import {
  Action,
  ActionGroup,
  ItemLayout,
  ItemStateContext,
  TextRange,
  TextWithHighlights,
  isInResolvedActionGroup,
  styled,
} from "@intellij-platform/core";
import {
  StyledIconWrapper,
  StyledItemLayout,
  StyledTitleWrapper,
} from "../ItemHelpers";

const StyledSpacer = styled.div`
  flex: 1;
`;
/**
 * UI of actions in SearchEverywhere list
 */
export function ActionItem({
  action,
  highlights,
}: {
  action: Action;
  highlights: null | TextRange[];
}) {
  const { isSelected } = useContext(ItemStateContext) || {};
  return (
    <StyledItemLayout>
      <StyledIconWrapper>{action.icon}</StyledIconWrapper>
      <StyledTitleWrapper isDisabled={action.isDisabled}>
        {isSelected ? (
          <TextWithHighlights highlights={highlights}>
            {action.title}
          </TextWithHighlights>
        ) : (
          action.title
        )}
      </StyledTitleWrapper>
      <ItemLayout.Hint style={{ fontSize: ".85em", fontWeight: "bold" }}>
        {action.shortcut}
      </ItemLayout.Hint>
      <StyledSpacer />
      <ItemLayout.Hint
        style={{
          marginRight:
            "-0.375rem" /* to kill the default list padding on right. */,
        }}
      >
        {getActionBreadcrumb(action, "title").join(" | ")}
      </ItemLayout.Hint>
    </StyledItemLayout>
  );
}

function getActionBreadcrumb<T extends keyof ActionGroup>(
  action: Action,
  field: T
): Array<ActionGroup[T]>;
function getActionBreadcrumb(action: Action): Array<ActionGroup>;
function getActionBreadcrumb(action: Action, field?: keyof ActionGroup) {
  let parent = isInResolvedActionGroup(action) ? action.parent : null;
  const breadcrumb: Array<ActionGroup | ActionGroup[keyof ActionGroup]> = [];
  while (parent) {
    breadcrumb.unshift(field ? parent[field] : parent);
    parent = parent.parent;
  }
  return breadcrumb;
}
