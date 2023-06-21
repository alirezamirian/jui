import React from "react";
import { Tooltip } from "@intellij-platform/core/Tooltip/Tooltip";
import { styled } from "@intellij-platform/core/styled";

export interface ValidationTooltipProps {
  children: React.ReactNode;
  /**
   * @default error
   */
  type?: "error" | "warning";
}

const StyledValidationTooltip = styled(Tooltip)`
  box-shadow: none;
  padding: 0.25rem 0.5rem; // from ComponentValidator class in the reference impl
  max-width: ${({ theme }) =>
    `${theme.value<number>("ValidationTooltip.maxWidth")}px`};
  background: ${({ theme }) =>
    theme.color("ValidationTooltip.errorBackground")};
  border: 1px solid
    ${({ theme }) => theme.color("ValidationTooltip.errorBorderColor")};
`;

const StyledWarningValidationTooltip = styled(StyledValidationTooltip)`
  background: ${({ theme }) =>
    theme.color("ValidationTooltip.warningBackground")};
  border-color: ${({ theme }) =>
    theme.color("ValidationTooltip.warningBorderColor")};
`;

/**
 * Tooltip to be used for validation error messages
 * @see https://jetbrains.github.io/ui/principles/validation_errors/
 */
export const ValidationTooltip = ({
  type = "error",
  children,
}: ValidationTooltipProps): JSX.Element => {
  const Component =
    type === "error" ? StyledValidationTooltip : StyledWarningValidationTooltip;
  return <Component multiline>{children}</Component>;
};
