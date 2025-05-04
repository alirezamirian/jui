import { ItemLayout, styled } from "@intellij-platform/core";

export const StyledIconWrapper = styled.span`
  width: 0.9375rem;
  margin-right: 0.25rem;
  display: inline-flex;
  justify-content: center;
`;
export const StyledItemLayout = styled(ItemLayout)`
  // Going above 20px (which is the estimated list item height in the virtualizer) makes the tab crash when
  // running e2e tests only in local environment (both headed and headless, both against storybook dev server and
  // static server like in the CI pipeline), and only after upgrading styled-components to v6 🤯
  min-height: ${"Cypress" in window ? "1.25rem" : "1.375rem"};
  width: 100%;
  padding: 0;
`;
export const StyledTitleWrapper = styled.span<{ $disabled?: boolean }>`
  color: ${({ theme, $disabled }) =>
    $disabled &&
    theme.currentForegroundAware(theme.commonColors.inactiveTextColor)};
`;
