import React, { Key } from "react";
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
  matches: Map<Key, unknown /*We don't care what a match is, here*/> | null
): KeyboardDelegate {
  // TODO: page up and down deactivate speed search. If we want that, we can pass the speedSearch
  //  object too. but doesn't seem like the best way to do it, even it the same behavior is expected
  const findFirstMatch = <T extends React.Key | undefined, K>(
    fromKey: React.Key | undefined | null,
    direction: "up" | "down"
  ) => {
    let currentKey: React.Key | undefined | null = fromKey;
    while (currentKey != null) {
      if (!matches || matches.has(currentKey)) {
        return currentKey;
      }
      currentKey =
        direction === "up"
          ? wrappedKeyboardDelegate.getKeyAbove?.(currentKey)
          : wrappedKeyboardDelegate.getKeyBelow?.(currentKey);
    }
    return currentKey ?? undefined;
  };
  return Object.create(wrappedKeyboardDelegate, {
    getKeyBelow: {
      value: (key) =>
        findFirstMatch(wrappedKeyboardDelegate.getKeyBelow?.(key), "down"),
    },
    getKeyAbove: {
      value: (key) =>
        findFirstMatch(wrappedKeyboardDelegate.getKeyAbove?.(key), "up"),
    },
    getFirstKey: {
      value: (key?: React.Key, global?: boolean): React.Key | null => {
        const firstKey = findFirstMatch(
          wrappedKeyboardDelegate.getFirstKey?.(key, global),
          "down"
        );
        return firstKey == null ? matches?.values().next().value : firstKey;
      },
    },
    getLastKey: {
      value: (key?: React.Key, global?: boolean): React.Key | null => {
        const lastKey = findFirstMatch(
          wrappedKeyboardDelegate.getLastKey?.(key, global),
          "down"
        );
        return lastKey == null
          ? [...(matches?.keys() || [])].pop() ?? null
          : lastKey;
      },
    },
  } as { [key in keyof KeyboardDelegate]: { value: KeyboardDelegate[key] } });
}
