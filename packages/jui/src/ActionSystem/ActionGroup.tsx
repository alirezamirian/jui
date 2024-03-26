import {
  Action,
  ActionDefinition,
} from "@intellij-platform/core/ActionSystem/Action";

export type ActionInResolvedGroup = Action & { parent: ResolvedActionGroup };

/**
 * - `popup`: shown as submenu (isPopup property in ActionGroup in the reference impl)
 * - `section`: a section with divider, but without section title
 * - `titledSection`: a section with divider and title.
 */
type ActionGroupPresentation = "section" | "titledSection" | "popup";

export interface MutableActionGroup extends Action {
  children: Action[];
  /**
   * Whether the action group is searchable. See {@link getAvailableActionsFor}.
   */
  isSearchable?: boolean;
  /**
   * How the action group should be rendered, in menus.
   */
  presentation?: ActionGroupPresentation;
}
export type ActionGroup = Readonly<MutableActionGroup>;

export interface ResolvedActionGroup extends ActionGroup {
  parent: ResolvedActionGroup | null;
  children: ActionInResolvedGroup[];
}
export interface ActionGroupDefinition extends ActionDefinition {
  children: ActionDefinition[]; // Should DividerItem be supported first-class here?
  /**
   * If the action group should be rendered as a popup (submenu), in menus.
   */
  presentation?: ActionGroupPresentation;
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
