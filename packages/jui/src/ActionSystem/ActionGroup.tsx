import {
  Action,
  ActionDefinition,
} from "@intellij-platform/core/ActionSystem/ActionsProvider";

export type ActionInResolvedGroup = Action & { parent: ResolvedActionGroup };

export interface MutableActionGroup extends Action {
  children: Action[];
  /**
   * Whether the action group is searchable. See {@link getAvailableActionsFor}.
   */
  isSearchable?: boolean;
  /**
   * If the action group should be rendered as a popup (submenu), in menus.
   */
  isPopup?: boolean;
}
export type ActionGroup = Readonly<MutableActionGroup>;
export interface ResolvedActionGroup extends ActionGroup {
  parent: ResolvedActionGroup | null;
  children: ActionInResolvedGroup[];
}
export interface ActionGroupDefinition extends ActionDefinition {
  children: ActionDefinition[]; // Should DividerItem be supported first-class here?
  /**
   * Whether the action group is searchable. See {@link getAvailableActionsFor}.
   */
  isSearchable?: boolean;
  /**
   * If the action group should be rendered as a popup (submenu), in menus.
   */
  isPopup?: boolean;
}

export function isInResolvedActionGroup(
  action: Action
): action is ActionInResolvedGroup {
  return "parent" in action;
}
export function isActionGroup(action: Action): action is ActionGroup {
  return "children" in action; // probably better to use a discriminator field like `type`
}

export function isResolvedActionGroup<T extends Action>(
  action: Action
): action is ResolvedActionGroup {
  return "children" in action && "parent" in action; // probably better to use a discriminator field like `type`
}

export function isActionGroupDefinition(
  action: ActionDefinition
): action is ActionGroupDefinition {
  return "children" in action; // probably better to use a discriminator field like `type`
}
