import React, { useContext } from "react";
import {
  Action,
  ItemLayout,
  ItemStateContext,
  styled,
  TextRange,
  TextWithHighlights,
} from "@intellij-platform/core";

const StyledIconWrapper = styled.span`
  width: 1.125rem;
  display: inline-flex;
  justify-content: center;
`;
const StyledItemLayout = styled(ItemLayout)`
  min-height: 1.375rem;
`;
const StyledTitleWrapper = styled.span<{ isDisabled?: boolean }>`
  color: ${({ theme, isDisabled }) =>
    isDisabled &&
    theme.currentForegroundAware(theme.commonColors.inactiveTextColor)};
`;

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
      <ItemLayout.Hint style={{ fontSize: ".9em", fontWeight: "bold" }}>
        {action.shortcut}
      </ItemLayout.Hint>
    </StyledItemLayout>
  );
}
