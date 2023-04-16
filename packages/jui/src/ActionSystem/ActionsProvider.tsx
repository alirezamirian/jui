import { useKeymap } from "@intellij-platform/core/ActionSystem/KeymapProvider";
import { mapObjIndexed, pick, sortBy } from "ramda";
import React, { HTMLAttributes, useContext, useEffect, useState } from "react";
import { shortcutToString } from "@intellij-platform/core/ActionSystem/shortcutToString";
import { useShortcuts } from "@intellij-platform/core/ActionSystem/useShortcut";
import { Shortcut } from "@intellij-platform/core/ActionSystem/Shortcut";

export interface ActionContext {
  element: Element | null;
  event:
    | React.MouseEvent<HTMLElement>
    | React.KeyboardEvent<HTMLElement>
    | null;
}

export interface ActionDefinition {
  title: string;
  actionPerformed: (
    /**
     * UI event that triggered the action, if a shortcut triggered the action.
     */
    context: ActionContext
  ) => void;
  icon?: React.ReactNode;
  description?: string;
  isDisabled?: boolean;
}
export interface Action
  extends Pick<
    ActionDefinition,
    "title" | "icon" | "description" | "isDisabled"
  > {
  id: string;
  /**
   * shortcuts assigned to this action based on the keymap context
   */
  shortcuts: readonly Shortcut[] | undefined;
  /**
   * string representation of the shortcuts
   */
  shortcut: string | undefined;

  /**
   * Performs the action, if it's enabled.
   */
  perform: (context?: ActionContext) => void;
}

interface ActionsProviderProps {
  actions: {
    [actionId: string]: ActionDefinition;
  };
  children: (args: {
    shortcutHandlerProps: HTMLAttributes<HTMLElement>;
  }) => React.ReactElement;

  /**
   * Experimental option to determine if event handling should be done on capture phase. Useful for cases where
   * a descendant element handles events in capture phase, and that conflicts with an action.
   */
  useCapture?: boolean;
}

const ActionsContext = React.createContext<{
  [actionId: string]: Action;
}>({});

function generateId() {
  return `jui-${Math.floor(Math.random() * 10000000)}`;
}

const ACTION_PROVIDER_ID_ATTRIBUTE = "data-action-provider";
const ACTION_PROVIDER_ID_DATA_PREFIX = "action_provider_id_";
const actionProvidersMap = new Map<string, { [id: string]: Action }>();
export function ActionsProvider(props: ActionsProviderProps): JSX.Element {
  const parentContext = useContext(ActionsContext);
  const keymap = useKeymap();
  const actionIds = Object.keys(props.actions);
  const shortcuts = pick(actionIds, keymap || {});
  const [actionProviderId] = useState(generateId);

  const { shortcutHandlerProps } = useShortcuts(
    shortcuts,
    (actionId, { event }) => {
      props.actions[actionId]?.actionPerformed({
        event,
        // it's important to use target and not currentTarget
        element: event.target instanceof Element ? event.target : null,
      });
    },
    { useCapture: props.useCapture }
  );

  const actions = mapObjIndexed((value, actionId): Action => {
    const shortcuts = keymap?.[actionId];
    const firstShortcut = shortcuts?.[0];
    return {
      id: actionId,
      ...value,
      shortcuts,
      shortcut: firstShortcut ? shortcutToString(firstShortcut) : undefined, // Maybe it should be all shortcuts?
      perform: (context) => {
        if (!value.isDisabled) {
          value.actionPerformed(context || { event: null, element: null });
        }
      },
    };
  }, props.actions);
  const allActions = { ...parentContext, ...actions };
  // @ts-expect-error: not sure why data-* attribute is not accepted.
  shortcutHandlerProps[ACTION_PROVIDER_ID_ATTRIBUTE] = actionProviderId;
  // @ts-expect-error: not sure why data-* attribute is not accepted.
  shortcutHandlerProps[
    `data-${ACTION_PROVIDER_ID_DATA_PREFIX}${actionProviderId}`
  ] = "";

  useEffect(() => {
    actionProvidersMap.set(actionProviderId, allActions);
  });
  useEffect(() => {
    return () => {
      actionProvidersMap.delete(actionProviderId);
    };
  }, []);
  return (
    <ActionsContext.Provider value={allActions}>
      {props.children({ shortcutHandlerProps })}
    </ActionsContext.Provider>
  );
}

/**
 * Experimental function to get list of all actions available from a given html elements. Useful for implementing
 * action search UI.
 * @experimental
 */
export function getAvailableActionsFor(element: Element): Action[] {
  const closestActionProvider = element.closest(
    `[${ACTION_PROVIDER_ID_ATTRIBUTE}]`
  );
  if (closestActionProvider instanceof HTMLElement) {
    /**
     * NOTE: initially, only one data attribute was used to hold the action provider id. Although simpler, that approach
     * is subject to bug in some edge cases, where multiple nested action providers are rendered, but `actionProviderProps`
     * is merged on a single dom element. In such cases, it's important that the props from the innermost action provider
     * is merged last, overwriting other values for data-action-provider-id.
     * Because that's error-prone, we keep unique data attributes (`data-action_provider_id_...`} for each action
     * provider id, and to simplify querying part, we also add a constant data attribute (data-action-provider).
     * This way we can read all action providers applied on the same dom element. Since action providers inherit actions
     * from parent action providers, we can reliably pick the actions from the one with the highest number of actions.
     */
    const actionSets = Object.keys(closestActionProvider.dataset)
      .filter((dataKey) => dataKey.startsWith(ACTION_PROVIDER_ID_DATA_PREFIX))
      .map((dataKey) => {
        const id = dataKey?.replace(ACTION_PROVIDER_ID_DATA_PREFIX, "");
        const actions = id && actionProvidersMap.get(id);
        return actions ? Object.values(actions) : [];
      })
      .concat();
    return sortBy((actionSet) => -actionSet.length, actionSets)[0] || [];
  }
  return [];
}

export function useActions(): Record<string, Action> {
  return useContext(ActionsContext);
}

export const useAction = (actionId: string): Action | null => {
  return useActions()[actionId];
};
