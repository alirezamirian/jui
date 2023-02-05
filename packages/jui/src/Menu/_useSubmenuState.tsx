import { TreeState } from "@react-stately/tree";
import { useState } from "react";
import { SelectionManager } from "@react-stately/selection";

/**
 * Creates a TreeState corresponding to the submenu, from the state of a parent (sub)menu.
 * The collection and everything is the same, and the only difference from the parent state is selection manager
 * having a separate focused state to keep the focused state of each menu container separately, as the submenus
 * are usually rendered in separate overlays.
 */
export function useSubmenuState<T>(parentState: TreeState<T>) {
  const [isFocused, setFocused] = useState(false);
  return {
    ...parentState,
    selectionManager: new SelectionManager(parentState.collection, {
      // @ts-expect-error state is private
      ...parentState.selectionManager.state,
      isFocused,
      setFocused,
    }),
  };
}
