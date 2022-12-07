type ShortcutType = "mouse" | "keyboard";
export type KeyStrokeModifier = "Alt" | "Shift" | "Meta" | "Control";

export interface KeyStroke {
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key}
   */
  code: string;
  modifiers?: Array<KeyStrokeModifier>;
}

interface ShortcutBase {
  type: ShortcutType;
}

interface MouseShortcut extends ShortcutBase {
  type: "mouse";
}

export interface KeyboardShortcut extends ShortcutBase {
  type: "keyboard";
  firstKeyStroke: KeyStroke;
  secondKeyStroke?: KeyStroke;
}

export type Shortcut = MouseShortcut | KeyboardShortcut;

export const isKeyboardShortcut = (
  shortcut: Shortcut
): shortcut is KeyboardShortcut => shortcut.type === "keyboard";

export const supportedModifiers: KeyStrokeModifier[] = [
  "Alt",
  "Meta",
  "Shift",
  "Control",
];
