import { TreeState } from "@react-stately/tree";
import { RefObject, useMemo } from "react";
import { useSelectableCollection } from "../selection/useSelectableCollection";
import { TreeKeyboardDelegate } from "./TreeKeyboardDelegate";
import { KeyboardEvent } from "@react-types/shared";
import { useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useCollator } from "@react-aria/i18n";

export function useSelectableTree<T>(
  state: TreeState<T>,
  ref: RefObject<HTMLElement>
) {
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const {
    collectionProps: {
      // preventDefault in onMouseDown prevents collection from getting focused.
      // Maybe it should be removed from useSelectableCollection, now that it lives here
      onMouseDown,
      onKeyDown: selectionKeyDown,
      ...collectionProps
    },
  } = useSelectableCollection({
    ref,
    selectionManager: state.selectionManager,
    selectOnFocus: true,
    keyboardDelegate: useMemo(
      () =>
        new TreeKeyboardDelegate(
          state.collection,
          state.disabledKeys,
          ref,
          collator
        ),
      [state.collection, state.disabledKeys]
    ),
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const focusedKey = state.selectionManager.focusedKey;
    const isExpandable =
      focusedKey && state.collection.getItem(focusedKey).hasChildNodes;
    const expanded = focusedKey && state.expandedKeys.has(focusedKey);
    const shouldToggle =
      event.key === "Enter" ||
      (event.key === "ArrowLeft" && expanded) ||
      (event.key === "ArrowRight" && !expanded);
    if (isExpandable && shouldToggle) {
      event.preventDefault();
      state.toggleKey(focusedKey);
    } else {
      selectionKeyDown?.(event);
    }
  };
  const { keyboardProps } = useKeyboard({
    onKeyDown,
  });
  return {
    // order of merging here is important. navigation handling should precede selection handling
    treeProps: mergeProps(collectionProps, keyboardProps),
  };
}
