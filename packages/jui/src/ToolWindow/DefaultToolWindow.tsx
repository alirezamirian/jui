import React, { useContext, useMemo, useRef } from "react";
import { styled } from "../styled";
import { FocusScope } from "./FocusScope";
import { DefaultToolWindowHeader } from "./DefaultToolWindowHeader";
import { useToolWindow } from "./useToolWindow";

export interface DefaultToolWindowProps {
  /**
   * title to be shown on the left side of the tool window header.
   */
  headerContent?: React.ReactNode;
  additionalActions?: React.ReactNode;
  onFocusChange?: (focused: boolean) => void;
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

interface DefaultToolWindowContextObj {
  hasFocus?: boolean;
}

const DefaultToolWindowContext = React.createContext<DefaultToolWindowContextObj>(
  {
    hasFocus: false,
  }
);

export const useDefaultToolWindowContext = () =>
  useContext(DefaultToolWindowContext);
/**
 * Default component for rendering the content of a tool window. It supports a header and a scrollable area.
 * The header supports showing a content, and some default+custom actions on the right.
 *
 * @see MultiContentToolWindow
 *
 * Remaining features:
 * - Additional gear menu actions.
 *
 */
export const DefaultToolWindow: React.FC<DefaultToolWindowProps> = ({
  headerContent,
  children,
  additionalActions,
  onFocusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const focusableContentRef = useRef<{ focus: () => void }>(null);
  const {
    // NOTE: we might as well use :focus-within and target StyledToolWindowHeader to set the background, but it's not
    // a clear improvement.
    contentHasFocus,
    toolWindowProps,
    toolWindowContentProps,
    toolWindowHeaderProps,
  } = useToolWindow(
    { containerRef, contentRef, focusableContentRef },
    {
      onFocusChange,
    }
  );

  const defaultToolWindowContext = useMemo(
    () => ({
      hasFocus: contentHasFocus,
    }),
    [contentHasFocus]
  );

  return (
    <StyledToolWindowContainer {...toolWindowProps} ref={containerRef}>
      <DefaultToolWindowContext.Provider value={defaultToolWindowContext}>
        <DefaultToolWindowHeader
          additionalActions={additionalActions}
          contentHasFocus={contentHasFocus}
          {...toolWindowHeaderProps}
        >
          {headerContent}
        </DefaultToolWindowHeader>
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
      </DefaultToolWindowContext.Provider>
    </StyledToolWindowContainer>
  );
};
