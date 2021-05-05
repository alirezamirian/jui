import React, { Key } from "react";
import { TextRange } from "../TextRange";
import { KeyboardDelegate } from "@react-types/shared";

/**
 * Creates a new KeyboardDelegate in which keyKeyBelow and getKeyAbove are overridden in a way that
 * navigation is limited to matched items.
 * Note: select all action is not handled in KeyboardDelegate.
 * Note: when virtualization is added, this probably need to change, like how it's handled
 * in `useListBoxLayout` in react spectrum.
 */
export function createSpeedSearchKeyboardDelegate(
  wrappedKeyboardDelegate: KeyboardDelegate,
  matches: Map<Key, TextRange[]> | null
): KeyboardDelegate {
  // TODO: page up and down deactivate speed search. If we want that, we can pass the speedSearch
  //  object too. but doesn't seem like the best way to do it, even it the same behavior is expected
  return Object.create(wrappedKeyboardDelegate, {
    getKeyBelow: {
      value: (key: React.Key): React.Key | undefined => {
        let keyBelow = wrappedKeyboardDelegate.getKeyBelow?.(key);
        while (keyBelow != null) {
          if (!matches || matches.has(keyBelow)) {
            return keyBelow;
          }
          keyBelow = wrappedKeyboardDelegate.getKeyBelow?.(keyBelow);
        }
        return key;
      },
    },
    getKeyAbove: {
      value: (key: React.Key): React.Key | undefined => {
        let keyAfter = wrappedKeyboardDelegate.getKeyAbove?.(key);
        while (keyAfter != null) {
          if (!matches || matches.has(keyAfter)) {
            return keyAfter;
          }
          keyAfter = wrappedKeyboardDelegate.getKeyAbove?.(keyAfter);
        }
        return key;
      },
    },
  });
}
