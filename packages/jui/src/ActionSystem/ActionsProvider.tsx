import {
  Keymap,
  useKeymap,
} from "@intellij-platform/core/ActionSystem/KeymapProvider";
import { pick, sortBy } from "ramda";
import React, { HTMLAttributes, useContext, useEffect, useState } from "react";
import { shortcutToString } from "@intellij-platform/core/ActionSystem/shortcutToString";
import { useShortcuts } from "@intellij-platform/core/ActionSystem/useShortcut";
import { Shortcut } from "@intellij-platform/core/ActionSystem/Shortcut";
import {
  ActionGroup,
  ActionInResolvedGroup,
  isActionGroup,
  isActionGroupDefinition,
  MutableActionGroup,
} from "./ActionGroup";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import { dfsVisit } from "@intellij-platform/core/utils/tree-utils";

export interface ActionContext {
  element: Element | null;
  /**
   * UI event that triggered the action, if a shortcut triggered the action.
   */
  event:
    | React.MouseEvent<HTMLElement>
    | React.KeyboardEvent<HTMLElement>
    | null;
}

/**
 * Represents the definition of an action.
 * @interface
 */
export interface ActionDefinition {
  /**
   * The unique identifier for the action. Used to assign shortcuts to the action, via a {@link Keymap}.
   */
  id: string;
  /**
   * The title of an action.
   * This value will be used as the text in UI display for the action.
   */
  title: string;
  /**
   * The function that will be executed when the action is performed.
   * @param context It provides further information about the action event.
   */
  actionPerformed: (context: ActionContext) => void;
  /**
   * An optional icon for an action.
   * If provided, it will be displayed along with the title in the UI.
   */
  icon?: React.ReactNode;
  /**
   * An optional description for an action.
   * If provided, it can be displayed as additional information about the action in the UI.
   */
  description?: string;
  /**
   * An optional disable state for an action.
   * If set to `true`, this action would be in disabled state and cannot be performed.
   */
  isDisabled?: boolean;
}

export interface MutableAction
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
export type Action = Readonly<MutableAction>;

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

  const actionIds = actions.map((action) => action.id);
  const shortcuts = pick(actionIds, keymap || {});
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
    const shortcuts = keymap?.[actionDefinition.id];
    const firstShortcut = shortcuts?.[0];
    const action: MutableAction | ActionInResolvedGroup = {
      ...actionDefinition,
      ...(parent ? { parent } : {}),
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
        return actions ? Object.values(actions) : [];
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
