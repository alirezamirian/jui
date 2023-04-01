import { useKeymap } from "@intellij-platform/core/ActionSystem/KeymapProvider";
import { mapObjIndexed, pick } from "ramda";
import React, { HTMLAttributes, useContext } from "react";
import { shortcutToString } from "@intellij-platform/core/ActionSystem/shortcutToString";
import { useShortcuts } from "@intellij-platform/core/ActionSystem/useShortcut";
import { Shortcut } from "@intellij-platform/core/ActionSystem/Shortcut";

export interface ActionDefinition {
  title: string;
  actionPerformed: (
    /**
     * UI event that triggered the action, if a shortcut triggered the action.
     */
    event?:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | undefined
  ) => void;
  icon?: React.ReactNode;
  description?: string;
  isDisabled?: boolean;
}
export interface Action extends ActionDefinition {
  id: string;
  /**
   * shortcuts assigned to this action based on the keymap context
   */
  shortcuts: readonly Shortcut[] | undefined;
  /**
   * string representation of the shortcuts
   */
  shortcut: string | undefined;
}

interface ActionsProviderProps {
  actions: {
    [actionId: string]: ActionDefinition;
  };
  children: (args: {
    shortcutHandlerProps: HTMLAttributes<HTMLElement>;
  }) => React.ReactElement;
}

const ActionsContext = React.createContext<{
  [actionId: string]: Action;
}>({});

export function ActionsProvider(props: ActionsProviderProps): JSX.Element {
  const parentContext = useContext(ActionsContext);
  const keymap = useKeymap();
  const actionIds = Object.keys(props.actions);
  const shortcuts = pick(actionIds, keymap || {});

  const { shortcutHandlerProps } = useShortcuts(
    shortcuts,
    (actionId, { event }) => {
      props.actions[actionId]?.actionPerformed(event);
    }
  );

  const actions = mapObjIndexed((value, actionId): Action => {
    const shortcuts = keymap?.[actionId];
    const firstShortcut = shortcuts?.[0];
    return {
      id: actionId,
      ...value,
      shortcuts,
      shortcut: firstShortcut ? shortcutToString(firstShortcut) : undefined, // Maybe it should be all shortcuts?
    };
  }, props.actions);
  return (
    <ActionsContext.Provider value={{ ...parentContext, ...actions }}>
      {props.children({ shortcutHandlerProps })}
    </ActionsContext.Provider>
  );
}

export function useActions(): Record<string, Action> {
  return useContext(ActionsContext);
}

export const useAction = (actionId: string): Action | null => {
  return useActions()[actionId];
};
