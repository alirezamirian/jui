import { styled } from "@intellij-platform/core";

export const StyledHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 2.0625rem;
  border-bottom: 1px solid ${({ theme }) => theme.commonColors.borderColor};
`;
export const StyledSpacer = styled.div`
  flex-grow: 1;
`;
export const StyledPlaceholderContainer = styled.div`
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 0.25rem;
  min-height: 37%;
`;
