import React, { useContext } from "react";
import {
  Action,
  ItemLayout,
  ItemStateContext,
  TextRange,
  TextWithHighlights,
} from "@intellij-platform/core";
import {
  StyledIconWrapper,
  StyledItemLayout,
  StyledTitleWrapper,
} from "../ItemHelpers";

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
    </StyledItemLayout>
  );
}
