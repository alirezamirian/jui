import React, { useContext, useMemo, useRef } from "react";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import { DOMProps } from "@react-types/shared";
import { styled } from "@intellij-platform/core/styled";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import {
  ActionDefinition,
  ActionsProvider,
} from "@intellij-platform/core/ActionSystem";
import { useToolWindow } from "./useToolWindow";
import { DefaultToolWindowHeader } from "./DefaultToolWindowHeader";
import { useToolWindowActions } from "./useToolWindowActions";

export interface DefaultToolWindowProps extends DOMProps {
  /**
   * title to be shown on the left side of the tool window header.
   */
  headerContent?: React.ReactNode;
  /**
   * additional action buttons to be rendered before the default gear and hide buttons.
   */
  additionalActions?: React.ReactNode;
  /**
   * Actions to be provided in the tool window, in addition to the default tool window actions.
   */
  actions?: ActionDefinition[];
  /**
   * The title of main part of the tool windows component. Used in tool window actions.
   * @default "Editor"
   */
  mainContentTitle?: string;
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

const DefaultToolWindowContext =
  React.createContext<DefaultToolWindowContextObj>({
    hasFocus: false,
  });

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
  actions,
  mainContentTitle = "Editor",
  ...otherProps
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
  const toolWindowActions = useToolWindowActions({
    mainContentTitle,
  });
  const allActions = [...toolWindowActions, ...(actions || [])];

  return (
    <ActionsProvider actions={allActions}>
      {({ shortcutHandlerProps }) => (
        <StyledToolWindowContainer
          {...mergeProps(
            toolWindowProps,
            shortcutHandlerProps,
            filterDOMProps(otherProps)
          )}
          ref={containerRef}
        >
          <DefaultToolWindowContext.Provider value={defaultToolWindowContext}>
            <DefaultToolWindowHeader
              additionalActions={additionalActions}
              contentHasFocus={contentHasFocus}
              {...toolWindowHeaderProps}
            >
              {headerContent}
            </DefaultToolWindowHeader>
            <StyledToolWindowContent
              ref={contentRef}
              {...toolWindowContentProps}
            >
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
      )}
    </ActionsProvider>
  );
};
