import React, { useContext } from "react";
import { ItemStateContext, styled } from "@intellij-platform/core";

const StyledTreeNodeHint = styled.span<{ inheritColor: boolean }>`
  display: inline-flex;
  color: ${({ theme, inheritColor }) =>
    inheritColor ? "inherit" : theme.commonColors.inactiveTextColor};
  padding-left: 0.35rem;
`;

export const TreeNodeHint: React.FC = ({ children }) => {
  const { isSelected, isFocused } = useContext(ItemStateContext) || {
    isSelected: false,
    isFocused: false,
  };
  return (
    <StyledTreeNodeHint inheritColor={isSelected && isFocused}>
      {children}
    </StyledTreeNodeHint>
  );
};
