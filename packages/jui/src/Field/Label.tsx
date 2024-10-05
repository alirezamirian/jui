import { styled } from "@intellij-platform/core/styled";
import React, { ForwardedRef, forwardRef } from "react";
import { DOMAttributes } from "@react-types/shared";

export type LabelPlacement = "above" | "before";

const StyledLabelContainer = styled.div<{
  labelPlacement?: LabelPlacement;
}>`
  display: inline-flex;
  flex-direction: ${({ labelPlacement }) =>
    labelPlacement === "above" ? "column" : "row"};
  align-items: start;
  gap: 0.375rem;
`;

const StyledLabel = styled.label<{ isDisabled?: boolean }>`
  color: ${({ theme, isDisabled: disabled }) =>
    theme.commonColors.label({ disabled })};
  margin-top: 0.25rem;
  line-height: 1.2;
`;

/**
 * Implements [label](https://jetbrains.github.io/ui/controls/input_field/#label),
 * for elements like Input, Dropdown, etc.
 */
export const WithLabel = forwardRef(function WithLabel(
  {
    label,
    labelPlacement,
    labelProps,
    children,
    isDisabled,
    ...props
  }: {
    isDisabled: boolean | undefined;
    label: React.ReactNode;
    labelPlacement: LabelPlacement | undefined /* intentionally not optional */;
    labelProps?: DOMAttributes;
  } & DOMAttributes,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledLabelContainer
      {...props}
      labelPlacement={labelPlacement}
      ref={forwardedRef}
    >
      {label && (
        <StyledLabel {...labelProps} isDisabled={isDisabled}>
          {label}
        </StyledLabel>
      )}
      {children}
    </StyledLabelContainer>
  );
});
