import { styled } from "@intellij-platform/core/styled";

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => theme.commonColors.label({ disabled })};
`;
