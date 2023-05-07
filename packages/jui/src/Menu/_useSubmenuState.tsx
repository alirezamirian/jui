import { TreeState } from "@react-stately/tree";
import { Key, useRef, useState } from "react";
import {
  MultipleSelectionState,
  SelectionManager,
} from "@react-stately/selection";

/**
 * Creates a TreeState corresponding to the submenu, from the state of a parent (sub)menu.
 * The collection and everything is the same, and the only difference from the parent state is selection manager
 * having a separate focused state to keep the focused state of each menu container separately, as the submenus
 * are usually rendered in separate overlays.
 */
export function useSubmenuState<T>(parentState: TreeState<T>) {
  // We want synchronous updates to `isFocused` and `focusedKey` after their setters are called.
  // But we also need to trigger a re-render. So, we have both a ref (sync) and state (async).
  const [, setFocused] = useState(false);
  const [, setFocusedKey] = useState<Key | null>(null);
  const isFocusedRef = useRef(false);
  const focusedKeyRef = useRef<Key | null>(null);

  const state: MultipleSelectionState = {
    // @ts-expect-error state is private
    ...parentState.selectionManager.state,
    setFocused: (isFocused: boolean) => {
      isFocusedRef.current = isFocused;
      setFocused(isFocused);
    },
    setFocusedKey(key: Key) {
      focusedKeyRef.current = key;
      setFocusedKey(key);
    },
  };
  Object.defineProperties(state, {
    isFocused: {
      get() {
        return isFocusedRef.current;
      },
    },
    focusedKey: {
      get() {
        return focusedKeyRef.current!;
      },
    },
  });

  return {
    ...parentState,
    selectionManager: new SelectionManager(parentState.collection, state),
  };
}
