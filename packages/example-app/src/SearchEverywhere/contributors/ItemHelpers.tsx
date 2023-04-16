import { ItemLayout, styled } from "@intellij-platform/core";

export const StyledIconWrapper = styled.span`
  width: 1.125rem;
  display: inline-flex;
  justify-content: center;
`;
export const StyledItemLayout = styled(ItemLayout)`
  min-height: 1.375rem;
`;
export const StyledTitleWrapper = styled.span<{ isDisabled?: boolean }>`
  color: ${({ theme, isDisabled }) =>
    isDisabled &&
    theme.currentForegroundAware(theme.commonColors.inactiveTextColor)};
`;
