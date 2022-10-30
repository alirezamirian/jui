import { fromPairs } from "ramda";
import { isMac } from "@react-aria/utils";
import {
  isKeyboardShortcut,
  KeyStroke,
  KeyStrokeModifier,
  Shortcut,
} from "./Shortcut";
import {
  KeyboardEventKey,
  LinuxDeadKeys,
  NumericKeypadKeys,
  UpperAlpha,
} from "./KeyboardEventKey";

const defaultKeyToStr: {
  [key in Exclude<
    KeyStrokeModifier | KeyboardEventKey,
    LinuxDeadKeys | UpperAlpha | NumericKeypadKeys
  >]: string;
} = {
  Control: "Ctrl",
  " ": "Space",
  ArrowDown: "↓",
  ArrowUp: "↑",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "⏎",
  // lowercase to uppercase map
  ...fromPairs(
    Array.from(Array(26))
      .map((e, i) => i + "a".charCodeAt(0))
      .map((x) => String.fromCharCode(x))
      .map((a) => [a, a.toUpperCase()])
  ),
};
const KeystrokeToString: {
  separator: string;
  keyToStr: Record<KeyStrokeModifier | KeyboardEventKey, string>;
} = isMac()
  ? {
      separator: "",
      keyToStr: {
        ...defaultKeyToStr,
        Alt: "⌥",
        Shift: "⇧",
        Meta: "⌘",
        Control: "^",
        Escape: "⎋",
      },
    }
  : {
      separator: "+",
      keyToStr: defaultKeyToStr,
    };
export const keystrokeToString = (keystroke: KeyStroke) => {
  return [...(keystroke.modifiers || []), keystroke.key]
    .map((key) => KeystrokeToString.keyToStr[key] || key)
    .join(KeystrokeToString.separator);
};
export const shortcutToString = (shortcut: Shortcut) => {
  if (isKeyboardShortcut(shortcut)) {
    return [shortcut.firstKeyStroke, shortcut.secondKeyStroke]
      .filter((i): i is KeyStroke => i != undefined)
      .map(keystrokeToString)
      .join(", ");
  }
  throw new Error("Not implemented yet");
};
