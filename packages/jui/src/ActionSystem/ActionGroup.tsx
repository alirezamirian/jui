import {
  Action,
  ActionDefinition,
} from "@intellij-platform/core/ActionSystem/Action";
import { DividerItem } from "@intellij-platform/core/Collections";

export type ActionInResolvedGroup = Action & { parent: ResolvedActionGroup };

/**
 * Different ways to show a group of actions in a menu.
 * - `submenu`: renders children as submenu (corresponding, in the reference impl, to `isPopup` property of ActionGroup
 *   being set to `true` and 'SUPPRESS_SUBMENU' clientProperty not being set)
 * - `none`: renders the action group as a simple menu item, not rendering its children at all.
 *   The action group will be performed, which typically opens a popup (see {@link useCreateDefaultActionGroup}),
 *   showing the children.
 *   (corresponding, in the reference impl, to `isPopup` property and 'SUPPRESS_SUBMENU' clientProperty being set
 *   to true on the ActionGroup)
 * - `section`: renders children in a section with divider, but without section title
 * - `titledSection`: renders children in a section with divider and title.
 */
type ActionGroupMenuPresentation =
  | "section"
  | "titledSection"
  | "none"
  | "submenu";

export interface MutableActionGroup extends Action {
  children: Array<Action | DividerItem>;
  /**
   * Whether the action group is searchable. See {@link getAvailableActionsFor}.
   */
  isSearchable?: boolean;
  /**
   * How the action group should be rendered, in menus.
   */
  menuPresentation?: ActionGroupMenuPresentation;
}
export type ActionGroup = Readonly<MutableActionGroup>;

export interface ResolvedActionGroup extends ActionGroup {
  parent: ResolvedActionGroup | null;
  children: ActionInResolvedGroup[];
}
export interface ActionGroupDefinition extends ActionDefinition {
  children: Array<ActionDefinition | "divider">;
  /**
   * Defines how the action group should be represented in menus.
   * @default 'submenu'
   * @see ActionGroupMenuPresentation
   */
  menuPresentation?: ActionGroupMenuPresentation;
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
