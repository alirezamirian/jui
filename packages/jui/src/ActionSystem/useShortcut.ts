import React, { KeyboardEventHandler, useRef } from "react";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import {
  isKeyboardShortcut,
  KeyboardShortcut,
  KeyStroke,
  Shortcut,
  supportedModifiers,
} from "./Shortcut";

export function useShortcuts(
  shortcuts: { [actionId: string]: ReadonlyArray<Shortcut> },
  onAction: (
    actionId: string,
    args: { event: React.MouseEvent | React.KeyboardEvent }
  ) => void | boolean
) {
  const firstKeyActivatedShortcutsRef = useRef<
    Array<{ actionId: string; shortcut: KeyboardShortcut }>
  >([]);
  const secondStrokeResetTimerIdRef = useRef<number | null>(null);
  const onKeyDown: KeyboardEventHandler = useEventCallback((e) => {
    if (isModifierOnly(e.nativeEvent) || e.repeat) {
      return;
    }
    // firstKeyActivatedShortcutsRef will be re-adjusted in any case. Cleaning whatever scheduled reset
    if (secondStrokeResetTimerIdRef.current !== null) {
      window.clearTimeout(secondStrokeResetTimerIdRef.current);
    }

    function triggerAction(actionId: string) {
      const result = onAction(actionId, { event: e });
      if (result !== false) {
        // TODO: make sure about how propagation should be stopped and/or controlled
        e.stopPropagation();
        e.preventDefault();
      }
    }
    // If there are keyboard shortcuts that are half way handled (first keystroke triggered already, and we are within
    // the valid wait for the second keystroke), they should be prioritized over first keystroke matching.
    if (firstKeyActivatedShortcutsRef.current.length > 0) {
      firstKeyActivatedShortcutsRef.current.some(({ shortcut, actionId }) => {
        if (isKeyMatch(shortcut.secondKeyStroke, e, true)) {
          triggerAction(actionId);
          return true;
        }
      });
      firstKeyActivatedShortcutsRef.current = [];
    } else {
      const firstKeyMatches = Object.entries(shortcuts)
        .flatMap(([actionId, shortcuts]) =>
          shortcuts.map((shortcut) => ({ actionId, shortcut }))
        )
        .filter(
          (
            input
          ): input is {
            actionId: string;
            shortcut: KeyboardShortcut;
          } => isKeyboardShortcut(input.shortcut)
        )
        .filter(({ shortcut }) => isKeyMatch(shortcut.firstKeyStroke, e));

      firstKeyActivatedShortcutsRef.current = firstKeyMatches.filter(
        ({ shortcut, actionId }) => shortcut.secondKeyStroke
      );

      if (firstKeyActivatedShortcutsRef.current.length > 0) {
        secondStrokeResetTimerIdRef.current = window.setTimeout(() => {
          firstKeyActivatedShortcutsRef.current = [];
        }, 2000);
        document.addEventListener(
          "keydown",
          () => {
            document.addEventListener(
              "keyup",
              () => {
                firstKeyActivatedShortcutsRef.current = [];
              },
              { once: true }
            );
          },
          //  by passing capture: true, we skip the current keydown event, since it's already passed capture phase
          { once: true, capture: true }
        );
      } else if (firstKeyMatches.length > 0) {
        triggerAction(firstKeyMatches[0].actionId);
      }
    }
  });
  const shortcutHandlerProps = {
    onKeyDown,
  };
  return { shortcutHandlerProps };
}

const isKeyMatch = (
  keyStroke: KeyStroke | undefined,
  e: React.KeyboardEvent,
  loose?: boolean
) =>
  e.code === keyStroke?.code &&
  (loose ? keyStroke.modifiers || [] : supportedModifiers).every(
    (modifier) =>
      e.getModifierState(modifier) ===
      Boolean(keyStroke.modifiers?.includes(modifier))
  );

function isModifierOnly(event: KeyboardEvent) {
  return event.location === 1 || event.location === 2;
}
