import React, { useRef } from "react";
import { styled } from "../styled";
import { FocusScope } from "./FocusScope";
import { ToolWindowHeader } from "./ToolWindowHeader";
import { useToolWindow } from "./useToolWindow";

export interface DefaultToolWindowProps {
  /**
   * title to be shown in the left side of the tool window header.
   */
  headerContent?: React.ReactNode;
  additionalActions?: React.ReactNode;
}

const StyledToolWindowContainer = styled.div`
  outline: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
`;
const StyledToolWindowContent = styled.div`
  flex: 1;
  overflow: auto;
`;

/**
 * Default component for rendering the content of a tool window. It supports a header and a scrollable area.
 * The header supports showing a content, and some default+custom actions on the right.
 *
 * Remaining features:
 * - Gear icon actions + additional actions (when menu component is added)
 * - Multi tab content, with support for tab/dropdown mode in the header. And the action for toggling that.
 *
 */
export const DefaultToolWindow: React.FC<DefaultToolWindowProps> = ({
  headerContent,
  children,
  additionalActions,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const focusableContentRef = useRef<{ focus: () => void }>(null);
  const {
    // NOTE: we might as well use :focus-within and target StyledToolWindowHeader to set the background, but it's not
    // a clear improvement.
    contentHasFocus,
    toolWindowProps,
    toolWindowContentProps,
    toolWindowHeaderProps,
  } = useToolWindow(contentRef, focusableContentRef);

  return (
    <StyledToolWindowContainer {...toolWindowProps}>
      <ToolWindowHeader
        additionalActions={additionalActions}
        contentHasFocus={contentHasFocus}
        {...toolWindowHeaderProps}
      >
        {headerContent}
      </ToolWindowHeader>
      <StyledToolWindowContent ref={contentRef} {...toolWindowContentProps}>
        {/**
         * FIXME: adding `contain` prevents focus from moving to another focus scope both with mouse and keyboard.
         * If we want to follow the Intellij Platform behaviour exactly, we need a kind of focus containment, where
         * focus is trapped only for keyboard interaction, and user can still move focus by clicking another scope.
         * Maybe a custom useFocusContainment hook and a separate option for activating it on our own FocusScope.
         */}
        <FocusScope ref={focusableContentRef} autoFocus>
          {children}
        </FocusScope>
      </StyledToolWindowContent>
    </StyledToolWindowContainer>
  );
};
