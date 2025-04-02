import { css, styled } from "@intellij-platform/core/styled";
import React from "react";
import { DOMAttributes, DOMProps } from "@react-types/shared";

/**
 * Interface to inherit in props of components that support rendering context help.
 */
export interface ContextHelpProps {
  /**
   * Context help, shown below the input.
   * A typical use case is
   * [to provide example values](https://jetbrains.github.io/ui/principles/context_help/#07).
   */
  contextHelp?: React.ReactNode; // TODO: implement
  /**
   * Placement of the contextHelp text with respect to the control.
   * See more: https://plugins.jetbrains.com/docs/intellij/inline-help-text.html#placement
   */
  contextHelpPlacement?: "below" | "after";
}

const StyledContextHelp = styled.div`
  color: ${({ theme }) => theme.commonColors.contextHelpForeground};
`;

const StyledContextHelpWrapper = styled.div<{
  $placement: ContextHelpProps["contextHelpPlacement"];
}>`
  font-size: 0.75rem; // 12px, in new UI. It's 11px in the old UI.
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem; /* Not checked with the reference impl */
  ${({ $placement }) =>
    $placement === "after" &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 1rem; /* Not checked with the reference impl */
    `}
  flex-grow: 1; /* Needed for when the control is inside a flex layout */
`;

/**
 * Implements [inline context help](https://plugins.jetbrains.com/docs/intellij/inline-help-text.html),
 * for its children.
 */
export const WithInlineContextHelp = ({
  children,
  descriptionProps,
  contextHelpPlacement,
  contextHelp,
}: {
  children: React.ReactNode;
  /**
   * Props to apply on the context help wrapper, to make the connected control
   * described by the context help.
   */
  descriptionProps: DOMAttributes;
} & ContextHelpProps) => {
  return (
    <StyledContextHelpWrapper $placement={contextHelpPlacement}>
      {children}
      {contextHelp && (
        <StyledContextHelp {...descriptionProps}>
          {contextHelp}
        </StyledContextHelp>
      )}
    </StyledContextHelpWrapper>
  );
};
