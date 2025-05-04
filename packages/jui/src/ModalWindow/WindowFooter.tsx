import { styled } from "@intellij-platform/core/styled";
import React from "react";
import { ButtonGroup } from "@intellij-platform/core/ButtonGroup";

const StyledFooter = styled.div<{ $hasBorder?: boolean }>`
  padding: 0.625rem 0.875rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid transparent;
  border-color: ${({ $hasBorder, theme }) =>
    $hasBorder && theme.commonColors.contrastBorder};
`;
const StyledFooterSide = styled.div`
  display: flex;
  gap: 0.75rem;
`;

/**
 * Implements the common layout for window footer, to be used in {@link ModalWindowProps#footer}.
 * Footer has a left and a right side. There is a standard gap between the children of each side.
 */
export function WindowFooter({
  left,
  right,
  hasBorder,
}: {
  /**
   * The content to go to the left side the footer. A help icon button is very common on the left side.
   */
  left?: React.ReactNode;
  /**
   * The content to go to the right side the footer.
   * {@link Button}s are usually used inside the right content.
   * A {@link ButtonGroup} is rendered around the content to allow for keyboard navigation with arrow keys.
   */
  right?: React.ReactNode;
  /**
   * Whether to show top border for footer or not
   */
  hasBorder?: boolean;
}) {
  return (
    <StyledFooter $hasBorder={hasBorder}>
      <StyledFooterSide>{left}</StyledFooterSide>
      <StyledFooterSide>
        <ButtonGroup>{right}</ButtonGroup>
      </StyledFooterSide>
    </StyledFooter>
  );
}
