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
import {
  HIDE_ALL_WINDOWS_ACTION_ID,
  JUMP_TO_LAST_WINDOW_ACTION_ID,
} from "./ToolWindowActionIds";
import { zipObj } from "ramda";

interface DefaultToolWindowActionsProps {
  toolWindowState: Readonly<ToolWindowsState>;
  toolWindowRef: React.RefObject<ToolWindowRefValue>;
  /**
   * Used when creating ActivateToolWindow action for each tool window.
   */
  getPresentation?: (key: React.Key) => {
    title: string;
    icon: React.ReactNode;
  };
  children: React.ReactNode;
}

export const getActivateToolWindowActionId = (id: string) =>
  `Activate${id.replace(" ", "")}Window`;

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
  getPresentation,
}: DefaultToolWindowActionsProps) {
  const isAnySideWindowWindowOpen = (state: Readonly<ToolWindowsState>) =>
    Object.values(state.windows).some(
      ({ isVisible, viewMode }) =>
        isVisible && getViewModeType(viewMode) !== "float"
    );
  const windowIds = Object.keys(toolWindowState.windows).map((key) => `${key}`);
  const actions: Record<string, ActionDefinition> = {
    ...zipObj(
      windowIds.map(getActivateToolWindowActionId),
      windowIds.map((id: string, index): ActionDefinition => {
        const { title, icon } = getPresentation?.(id) || {};
        return {
          title: title || `${getOrdinal(index)} window`,
          icon,
          description: `Activate ${title || getOrdinal(index)} window`,
          actionPerformed: () => {
            if (
              toolWindowState.windows[id]?.isVisible &&
              !toolWindowRef.current?.hasFocus(id)
            ) {
              toolWindowRef.current?.focus(id);
            } else {
              toolWindowRef.current?.changeState((state) => state.toggle(id));
            }
          },
        };
      })
    ),
    [HIDE_ALL_WINDOWS_ACTION_ID]: {
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
    [JUMP_TO_LAST_WINDOW_ACTION_ID]: {
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

function getOrdinal(n: number) {
  let ord = ["st", "nd", "rd"];
  let exceptions = [11, 12, 13];
  let nth =
    ord[(n % 10) - 1] == undefined || exceptions.includes(n % 100)
      ? "th"
      : ord[(n % 10) - 1];
  return n + nth;
}
