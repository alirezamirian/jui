import React, { useRef } from "react";
import { styled } from "../styled";
import { FocusScope } from "./FocusScope";
import { ToolWindowHeader } from "./ToolWindowHeader";
import { useToolWindow } from "./useToolWindow";

export interface DefaultToolWindowProps {
  /**
   * title to be shown in the left side of the tool window header.
   */
  title?: React.ReactNode;
  additionalActions?: React.ReactNode;
}

const StyledToolWindowContainer = styled.div`
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
 * The header supports showing a title on the left and some default+custom actions on the right.
 *
 * Remaining features:
 * - Gear icon actions + additional actions (when menu component is added)
 * - Multi tab content, with support for tab/dropdown mode in the header. And the action for toggling that.
 *
 */
export const DefaultToolWindow: React.FC<DefaultToolWindowProps> = ({
  title,
  children,
  additionalActions,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const focusableContentRef = useRef<{ focus: () => void }>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    toolWindowProps,
    toolWindowHeaderProps,
    toolWindowContentProps,
  } = useToolWindow(contentRef, focusableContentRef);

  return (
    <StyledToolWindowContainer {...toolWindowProps}>
      <ToolWindowHeader
        additionalActions={additionalActions}
        {...toolWindowHeaderProps}
      >
        {title}
      </ToolWindowHeader>
      <StyledToolWindowContent ref={contentRef} {...toolWindowContentProps}>
        <FocusScope ref={focusableContentRef} autoFocus contain>
          {children}
          <textarea ref={textareaRef} />
        </FocusScope>
      </StyledToolWindowContent>
    </StyledToolWindowContainer>
  );
};
