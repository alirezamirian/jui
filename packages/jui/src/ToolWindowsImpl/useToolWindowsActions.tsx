import React from "react";
import { ActionDefinition } from "@intellij-platform/core/ActionSystem";
import {
  getViewModeType,
  ToolWindowRefValue,
  ToolWindowsState,
} from "@intellij-platform/core/ToolWindows";
import {
  HIDE_ALL_WINDOWS_ACTION_ID,
  JUMP_TO_LAST_WINDOW_ACTION_ID,
} from "./ToolWindowActionIds";
import { zipObj } from "ramda";

interface DefaultToolWindowActionsProps {
  toolWindowsState: Readonly<ToolWindowsState>;
  toolWindowsRef: React.RefObject<ToolWindowRefValue>;
  /**
   * Used when creating ActivateToolWindow action for each tool window.
   */
  getPresentation?: (key: React.Key) =>
    | {
        title: string;
        icon: React.ReactNode;
      }
    | undefined;
}

export const getActivateToolWindowActionId = (id: string) =>
  `Activate${id.replace(" ", "")}Window`;

/**
 * Provides default tool windows actions:
 * - Hide all tool windows
 * - Activate{id}Window action for each window
 * - Jump to last tool window
 *
 * @see also {@link DefaultToolWindows}
 */
export function useToolWindowsActions({
  toolWindowsState,
  toolWindowsRef,
  getPresentation,
}: DefaultToolWindowActionsProps) {
  const isAnySideWindowWindowOpen = (state: Readonly<ToolWindowsState>) =>
    Object.values(state.windows).some(
      ({ isVisible, viewMode }) =>
        isVisible && getViewModeType(viewMode) !== "float"
    );
  const windowIds = Object.keys(toolWindowsState.windows).map(
    (key) => `${key}`
  );
  const activateToolWindowActions = windowIds.map(
    (id: string, index): ActionDefinition => {
      const { title, icon } = getPresentation?.(id) || {};
      return {
        id: getActivateToolWindowActionId(id),
        title: title || `${getOrdinal(index)} window`,
        icon,
        description: `Activate ${title || getOrdinal(index)} window`,
        actionPerformed: () => {
          if (
            toolWindowsState.windows[id]?.isVisible &&
            !toolWindowsRef.current?.hasFocus(id)
          ) {
            toolWindowsRef.current?.focus(id);
          } else {
            toolWindowsRef.current?.changeState((state) => state.toggle(id));
          }
        },
      };
    }
  );
  const actions: ActionDefinition[] = [
    ...activateToolWindowActions,
    {
      id: HIDE_ALL_WINDOWS_ACTION_ID,
      title: isAnySideWindowWindowOpen(toolWindowsState)
        ? "Hide All Windows"
        : "Restore windows",
      actionPerformed: () => {
        toolWindowsRef.current?.changeState((state) => {
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
          toolWindowsRef.current?.focusMainContent();
        });
      },
    },
    {
      id: JUMP_TO_LAST_WINDOW_ACTION_ID,
      title: "Jump to Last Tool Window",
      isDisabled: toolWindowsState.lastFocusedKey == null,
      actionPerformed: () => {
        toolWindowsRef.current?.focusLastActiveWindow();
      },
    },
  ];
  return actions;
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
