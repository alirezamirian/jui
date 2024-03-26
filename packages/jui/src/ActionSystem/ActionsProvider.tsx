import { sortBy } from "ramda";
import React, { HTMLAttributes, useContext, useEffect, useState } from "react";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import { dfsVisit } from "@intellij-platform/core/utils/tree-utils";

import { Keymap, useKeymap } from "./KeymapProvider";
import { shortcutToString } from "./shortcutToString";
import { useShortcuts } from "./useShortcut";
import {
  ActionGroup,
  ActionInResolvedGroup,
  isActionGroup,
  isActionGroupDefinition,
  MutableActionGroup,
} from "./ActionGroup";
import {
  Action,
  ActionContext,
  ActionDefinition,
  MutableAction,
} from "./Action";

/**
 * Represents the properties required for the ActionsProvider component.
 */
interface ActionsProviderProps {
  /**
   * A collection of action definitions.
   */
  actions: ActionDefinition[];
  children: (args: {
    shortcutHandlerProps: HTMLAttributes<HTMLElement>;
  }) => React.ReactElement;

  /**
   * Experimental option to determine if event handling should be done on capture phase. Useful for cases where
   * a descendant element handles events in capture phase, and that conflicts with an action.
   */
  useCapture?: boolean;
}

const ActionsContext = React.createContext<Action[]>([]);

function generateId() {
  return `jui-${Math.floor(Math.random() * 10000000)}`;
}

const ACTION_PROVIDER_ID_ATTRIBUTE = "data-action-provider";
const ACTION_PROVIDER_ID_DATA_PREFIX = "action_provider_id_";
const actionProvidersMap = new Map<string, Action[]>();

/**
 * Provides a set of actions for the wrapped UI. Uses the currently provided keymap to find the shortcuts
 * for each action, and passes the necessary event handlers for the shortcuts, to the `children` render function.
 *
 * @param {Array<Action>} props.actions - The actions to be provided.
 * @param {boolean} [props.useCapture] - Specifies whether to use capture phase for event handling.
 * @param {Function} props.children - Render function that accepts shortcutHandlerProps as argument.
 */
export function ActionsProvider(props: ActionsProviderProps): JSX.Element {
  const parentContext = useContext(ActionsContext);
  const keymap = useKeymap();
  const actions: Action[] = [];
  dfsVisit(
    (action: Action | null) =>
      action && isActionGroup(action) ? action.children : null,
    (action) => actions.push(action),
    recursivelyCreateActions(keymap, props.actions)
  );

  const shortcuts = Object.fromEntries(
    actions.map((action) => [action.id, action.shortcuts || []])
  );
  const [actionProviderId] = useState(generateId);

  const { shortcutHandlerProps } = useShortcuts(
    shortcuts,
    (actionId, { event }) => {
      actions
        .find((action) => action.id === actionId)
        ?.perform({
          event,
          // it's important to use target and not currentTarget
          element: event.target instanceof Element ? event.target : null,
        });
    },
    { useCapture: props.useCapture }
  );

  const allActions = [...parentContext, ...actions]; // Maybe warn overrides?

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

function isMutableActionGroup(
  action: MutableAction
): action is MutableActionGroup {
  return "children" in action; // probably better to use a discriminator field like `type`
}

function recursivelyCreateActions(
  keymap: Keymap | null,
  actionDefinitions: ActionDefinition[],
  parent: ActionGroup
): Array<ActionInResolvedGroup>;
function recursivelyCreateActions(
  keymap: Keymap | null,
  actionDefinitions: ActionDefinition[]
): Array<Action | ActionGroup>;
function recursivelyCreateActions(
  keymap: Keymap | null,
  actionDefinitions: ActionDefinition[],
  parent?: ActionGroup
): Array<Action | ActionInResolvedGroup | ActionGroup> {
  return actionDefinitions.map((actionDefinition: ActionDefinition): Action => {
    const shortcuts =
      keymap?.[actionDefinition.id] ??
      (actionDefinition.useShortcutsOf
        ? keymap?.[actionDefinition.useShortcutsOf]
        : undefined);
    const firstShortcut = shortcuts?.[0];
    const action: MutableAction | ActionInResolvedGroup = {
      ...actionDefinition,
      ...(isActionGroupDefinition(actionDefinition)
        ? { parent: parent ?? null }
        : {}),
      shortcuts,
      shortcut: firstShortcut ? shortcutToString(firstShortcut) : undefined, // Maybe it should be all shortcuts?
      perform: (context) => {
        if (!action.isDisabled) {
          actionDefinition.actionPerformed(
            context || { event: null, element: null }
          );
        }
      },
    };
    if (
      isMutableActionGroup(action) &&
      isActionGroupDefinition(actionDefinition)
    ) {
      action.children = recursivelyCreateActions(
        keymap,
        actionDefinition.children,
        action
      );
    }
    return action;
  });
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
        // noinspection PointlessBooleanExpressionJS
        return actions
          ? Object.values(actions).filter(
              ({ isSearchable }) => isSearchable !== false
            )
          : [];
      })
      .concat();
    return sortBy((actionSet) => -actionSet.length, actionSets)[0] || [];
  }
  return [];
}

export function useActions(): Action[] {
  return useContext(ActionsContext);
}

export const useAction = (actionId: string): Action | null => {
  return useActions().find(({ id }) => id === actionId) ?? null;
};

export const usePerformAction = (): ((
  actionId: string,
  context?: ActionContext
) => void) => {
  const actions = useActions();
  return useEventCallback((actionId: string, context?: ActionContext) => {
    const action = actions.find(({ id }) => id === actionId);
    if (action) {
      action.perform(context);
    } else {
      console.error(
        `An attempt to perform action with id ${actionId} failed because action was not found`
      );
    }
  });
};
