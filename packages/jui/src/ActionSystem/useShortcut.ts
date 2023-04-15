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
    args: {
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    }
  ) => void | boolean
) {
  const firstKeyActivatedShortcutsRef = useRef<
    Array<{ actionId: string; shortcut: KeyboardShortcut }>
  >([]);
  const secondStrokeResetTimerIdRef = useRef<number | null>(null);
  const onKeyDown: KeyboardEventHandler<HTMLElement> = useEventCallback((e) => {
    // TODO: repeated key downs can trigger an action repeatedly, in the original impl. Example: expand/shrink selection
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
    /**
     * by setting onKeyDownCapture is set instead of onKeyDown, we can prioritize action event handler over
     * component-specific handlers. That might be useful for some components that aggressively stop propagation of
     * events they handle, if the action is considered of higher priority compared to the conflicting component-internal
     * functionality. So maybe an option would be in order to define whether the shortcut's event handling should be done
     * in capture or bubbling phase.
     * Another thing to get clarified as action system is more used, is to decide if action handler should stop
     * propagation or not. Or should it be an option?
     * UPDATE: Switched to capture, to handle conflicts of Cmd+Shift+O in Monaco.
     * TODO: investigate more if it should be an option or not.
     */
    onKeyDownCapture: onKeyDown,
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
