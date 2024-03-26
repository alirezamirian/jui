import React from "react";
import { Shortcut } from "@intellij-platform/core/ActionSystem/Shortcut";

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

  /**
   * Whether the action is searchable. See {@link ../ActionsProvider.ts#getAvailableActionsFor}.
   */
  isSearchable?: boolean;

  /**
   * Allows reusing the shortcut of another action, if no shortcut is set for this action.
   */
  useShortcutsOf?: string;
}

export interface MutableAction
  extends Pick<
    ActionDefinition,
    "title" | "icon" | "description" | "isDisabled" | "isSearchable"
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
