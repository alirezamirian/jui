import { TreeState } from "@react-stately/tree";
import { Key, RefObject, useMemo, useState } from "react";
import { useSelectableCollection } from "../selection/useSelectableCollection";
import { TreeKeyboardDelegate } from "./TreeKeyboardDelegate";
import { KeyboardDelegate, KeyboardEvent } from "@react-types/shared";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useCollator } from "@react-aria/i18n";
import { useCollectionAutoScroll } from "../Collections/useCollectionAutoScroll";

export type SelectableTreeProps<T> = TreeState<T> & {
  isVirtualized?: boolean;
  keyboardDelegate?: KeyboardDelegate;
  onAction: undefined | ((key: Key) => void);
};

export function useSelectableTree<T>(
  { onAction, ...props }: SelectableTreeProps<T>,
  ref: RefObject<HTMLElement>
) {
  const collator = useCollator({ usage: "search", sensitivity: "base" });

  const [focused, setFocused] = useState(false);
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
    selectionManager: props.selectionManager,
    selectOnFocus: true,
    keyboardDelegate: useMemo(
      () =>
        props.keyboardDelegate ||
        new TreeKeyboardDelegate(
          props.collection,
          props.disabledKeys,
          ref,
          collator
        ),
      [props.collection, props.disabledKeys, props.keyboardDelegate]
    ),
  });
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  useCollectionAutoScroll(
    {
      isVirtualized: props.isVirtualized,
      selectionManager: props.selectionManager,
    },
    ref
  );

  const onKeyDown = (event: KeyboardEvent) => {
    const focusedKey = props.selectionManager.focusedKey;
    const isExpandable =
      focusedKey != null && props.collection.getItem(focusedKey).hasChildNodes;
    const expanded = focusedKey && props.expandedKeys.has(focusedKey);
    const isDisabled = props.disabledKeys.has(focusedKey);
    if (isDisabled) {
      return;
    }
    const shouldToggle =
      event.key === "Enter" ||
      (event.key === "ArrowLeft" && expanded) ||
      (event.key === "ArrowRight" && !expanded);

    if (isExpandable && shouldToggle) {
      event.preventDefault();
      props.toggleKey(focusedKey);
    } else if (event.key === "Enter") {
      onAction?.(focusedKey);
    } else {
      selectionKeyDown?.(event);
    }
  };
  const { keyboardProps } = useKeyboard({
    onKeyDown,
  });
  return {
    // order of merging here is important. navigation handling should precede selection handling
    treeProps: mergeProps(focusWithinProps, collectionProps, keyboardProps),
    focused,
  };
}
