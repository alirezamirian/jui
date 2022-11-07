import React from "react";
import {
  ActionDefinition,
  ActionsProvider,
} from "@intellij-platform/core/ActionSystem";
import {
  getViewModeType,
  ToolWindowRefValue,
  ToolWindowsState,
} from "@intellij-platform/core";

interface DefaultToolWindowActionsProps {
  toolWindowState: Readonly<ToolWindowsState>;
  toolWindowRef: React.RefObject<ToolWindowRefValue>;
  children: React.ReactNode;
}

/**
 * Provides default tool windows actions:
 * - Hide all tool windows
 *
 * @usage
 * Wrap around ToolWindows, passing toolWindowState and onToolWindowStateChange:
 *
 * ```tsx
 * <DefaultToolWindowActions
 *   toolWindowsState={state}
 *   onToolWindowStateChange={setState}
 * >
 *   <ToolWindows toolWindowsState={state} onToolWindowStateChange={setState} />
 * </DefaultToolWindowActions>;
 * ```
 */
export function DefaultToolWindowActions({
  toolWindowState,
  children,
  toolWindowRef,
}: DefaultToolWindowActionsProps) {
  const isAnySideWindowWindowOpen = (state: Readonly<ToolWindowsState>) =>
    Object.values(state.windows).some(
      ({ isVisible, viewMode }) =>
        isVisible && getViewModeType(viewMode) !== "float"
    );
  const actions: Record<string, ActionDefinition> = {
    HideAllWindows: {
      title: isAnySideWindowWindowOpen(toolWindowState)
        ? "Hide All Windows"
        : "Restore windows",
      actionPerformed: () => {
        toolWindowRef.current?.changeState((state) => {
          if (isAnySideWindowWindowOpen(state)) {
            return state.hideAll();
          } else {
            return state.restoreWindows();
          }
        });
        // Because windows have autofocus behaviour, a timeout is set. Not sure how reliable it is.
        // TODO: replace effect-based auto focus behaviour with something better, maybe controlled by ToolWindows
        //  component, and when a tool window is opened.
        setTimeout(() => {
          toolWindowRef.current?.focusMainContent();
        });
      },
    },
    JumpToLastWindow: {
      title: "Jump to Last Tool Window",
      isDisabled: toolWindowState.lastFocusedKey == null,
      actionPerformed: () => {
        toolWindowRef.current?.focusLastActiveWindow();
      },
    },
  };
  return (
    <ActionsProvider actions={actions}>
      {({ shortcutHandlerProps }) => (
        <div {...shortcutHandlerProps} style={{ all: "unset" }}>
          {children}
        </div>
      )}
    </ActionsProvider>
  );
}
