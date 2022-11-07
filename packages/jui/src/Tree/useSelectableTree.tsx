import React, { Key, RefObject, useMemo, useState } from "react";
import {
  DOMProps,
  KeyboardDelegate,
  KeyboardEvent,
  Node,
} from "@react-types/shared";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import { useCollator } from "@react-aria/i18n";
import { useSelectableCollection } from "@intellij-platform/core/selection";
import { TreeKeyboardDelegate } from "./TreeKeyboardDelegate";
import { useCollectionAutoScroll } from "../Collections/useCollectionAutoScroll";
import { TreeState } from "./__tmp__useTreeState";
import { useLatest } from "@intellij-platform/core/utils/useLatest";
import { TreeContextType } from "./TreeContext";
import { hasAnyModifier } from "@intellij-platform/core/utils/keyboard-utils";

export interface SelectableTreeProps<T> extends DOMProps {
  isVirtualized?: boolean;
  keyboardDelegate?: KeyboardDelegate;
  /**
   * Called when the action associated with a leaf tree node should be taken.
   * The exact UI interaction is abstracted away, but it's either Enter key or double click.
   */
  onAction?: (key: Key) => void;
  onNodeKeyDown?: (event: KeyboardEvent, node: Node<T>) => void;

  allowEmptySelection?: boolean;
}

/**
 * NOTE: at the time of writing this hook, react-aria didn't have support for Tree. When useTree is implemented in
 * react-aria, it makes sense to refactor this and use that. There will still be something on top of it here.
 */
export function useSelectableTree<T>(
  { onAction, ...props }: SelectableTreeProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLElement>
) {
  const domProps = filterDOMProps(props);
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
    selectionManager: state.selectionManager,
    disallowEmptySelection: !props.allowEmptySelection,
    selectOnFocus: true,
    keyboardDelegate: useMemo(
      () =>
        props.keyboardDelegate ||
        new TreeKeyboardDelegate(
          state.collection,
          state.disabledKeys,
          ref,
          collator
        ),
      [state.collection, state.disabledKeys, props.keyboardDelegate]
    ),
  });
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  useCollectionAutoScroll(
    {
      isVirtualized: props.isVirtualized,
      selectionManager: state.selectionManager,
    },
    ref
  );

  const onKeyDown = (event: KeyboardEvent) => {
    const focusedKey = state.selectionManager.focusedKey;
    if (focusedKey == null) {
      return;
    }
    const item = state.collection.getItem(focusedKey);
    const isExpandable = item.hasChildNodes;
    const expanded = state.expandedKeys.has(focusedKey);
    const isDisabled = state.disabledKeys.has(focusedKey);
    if (isDisabled || hasAnyModifier(event)) {
      event.continuePropagation();
      return;
    }

    props?.onNodeKeyDown?.(event, item);

    const shouldToggle =
      event.key === "Enter" ||
      (event.key === "ArrowLeft" && expanded) ||
      (event.key === "ArrowRight" && !expanded);

    if (isExpandable && shouldToggle) {
      event.preventDefault();
      state.toggleKey(focusedKey);
    } else if (event.key === "Enter") {
      onAction?.(focusedKey);
    } else {
      // selectionKeyDown currently doesn't report back if it handled the event or not. We could have conditionally
      // continued propagation if the event was not handled. Then we could change Speed Search impl to only handle
      // inputs when the propagation is not prevented.
      selectionKeyDown?.(event);
      event.continuePropagation();
    }
  };
  const { keyboardProps } = useKeyboard({
    onKeyDown,
  });

  //////////////////////////////// providing context value ////////////////////////////////
  const onActionRef = useLatest(onAction);

  const {
    selectionManager,
    collection,
    expandedKeys,
    disabledKeys,
    toggleKey,
  } = state;
  const treeContext = useMemo<TreeContextType<T>>(
    () => ({
      state: {
        collection,
        selectionManager,
        expandedKeys,
        disabledKeys,
        toggleKey,
      },
      focused,
      onActionRef,
    }),
    [
      selectionManager,
      collection,
      expandedKeys,
      disabledKeys,
      toggleKey,
      focused,
      onActionRef,
    ]
  );
  ////////////////////////////////////////////////////////////////////////////////////////

  return {
    // order of merging here is important. navigation handling should precede selection handling
    treeProps: mergeProps(
      focusWithinProps,
      collectionProps,
      keyboardProps,
      domProps
    ),
    treeContext,
    focused,
  };
}
