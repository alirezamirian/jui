import { Key, RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  DOMProps,
  KeyboardDelegate,
  KeyboardEvent,
  Node,
} from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
import { useFocusWithin, useKeyboard } from "@react-aria/interactions";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import { useCollator } from "@react-aria/i18n";
import { useSelectableCollection } from "@intellij-platform/core/selection";
import { TreeKeyboardDelegate } from "./TreeKeyboardDelegate";
import { useCollectionAutoScroll } from "../Collections/useCollectionAutoScroll";
import { useLatest } from "@intellij-platform/core/utils/useLatest";
import { TreeContextType } from "./TreeContext";
import { hasAnyModifier } from "@intellij-platform/core/utils/keyboard-utils";
import { FocusEvents } from "@react-types/shared/src/events";
import { FocusStrategy } from "@react-types/shared/src/selection";
import { groupBy } from "ramda";
import {
  CollectionFocusProxyProps,
  useCollectionFocusProxy,
} from "@intellij-platform/core/Collections";

export interface SelectableTreeProps<T>
  extends DOMProps,
    Omit<FocusEvents, "onFocusChange">,
    CollectionFocusProxyProps {
  isVirtualized?: boolean;
  keyboardDelegate?: KeyboardDelegate;
  /**
   * Called when the action associated with a leaf tree node should be taken.
   * The exact UI interaction is abstracted away, but it's either Enter key or double click.
   */
  onAction?: (key: Key) => void;
  onNodeKeyDown?: (event: KeyboardEvent, node: Node<T>) => void;

  allowEmptySelection?: boolean;

  autoFocus?: boolean | FocusStrategy;

  showAsFocused?: boolean;
}

/**
 * NOTE: at the time of writing this hook, react-aria didn't have support for Tree. When useTree is implemented in
 * react-aria, it makes sense to refactor this and use that. There will still be something on top of it here.
 */
export function useSelectableTree<T>(
  {
    onAction,
    onFocus,
    onBlur,
    autoFocus,
    showAsFocused,
    focusProxyRef,
    ...props
  }: SelectableTreeProps<T>,
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
    autoFocus,
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

  useCollectionFocusProxy({
    collectionRef: ref,
    state,
    onAction,
    focusProxyRef,
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
    const focusedItem = focusedKey
      ? state.collection.getItem(focusedKey)
      : null;
    if (focusedItem) {
      const isExpandable = Boolean(focusedItem?.hasChildNodes);
      const expanded = focusedKey != null && state.expandedKeys.has(focusedKey);
      const isDisabled =
        focusedKey != null && state.disabledKeys.has(focusedKey);
      if (isDisabled) {
        event.continuePropagation();
        return;
      }
      props?.onNodeKeyDown?.(event, focusedItem);
      const shouldToggle =
        !hasAnyModifier(event) &&
        (event.key === "Enter" ||
          (event.key === "ArrowLeft" && expanded) ||
          (event.key === "ArrowRight" && !expanded));
      if (isExpandable && shouldToggle && focusedKey != null) {
        event.preventDefault();
        state.toggleKey(focusedKey);
        return;
      } else if (event.key === "Enter" && focusedKey != null) {
        onAction?.(focusedKey);
        return;
      }
    }
    // selectionKeyDown currently doesn't report back if it handled the event or not. We could have conditionally
    // continued propagation if the event was not handled. Then we could change Speed Search impl to only handle
    // inputs when the propagation is not prevented.
    // Also, selectionKeyDown is not accurate in handling actions like "select all". e.g. it takes 'cmd+shift+a' too,
    // as select all which can conflict with action system. So we don't call it if there are multiple modifiers.
    const hasAtMostOneModifier =
      [event.metaKey, event.ctrlKey, event.shiftKey, event.altKey].filter(
        (i) => i
      ).length < 2;
    if (hasAtMostOneModifier) {
      selectionKeyDown?.(event);
    }
    event.continuePropagation();
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
      focused: Boolean(focused || showAsFocused),
      onActionRef,
    }),
    [
      selectionManager,
      collection,
      expandedKeys,
      disabledKeys,
      toggleKey,
      focused,
      showAsFocused,
      onActionRef,
    ]
  );
  ////////////////////////////////////////////////////////////////////////////////////////
  useSelectParentOfRemovedSelectedNode(state);

  return {
    // order of merging here is important. navigation handling should precede selection handling
    treeProps: mergeProps(
      focusWithinProps,
      collectionProps,
      keyboardProps,
      domProps,
      { onFocus, onBlur, role: "tree" }
    ),
    treeContext,
    focused,
  };
}

/**
 * When a selected node is removed from the tree, selects the parent of the removed node
 * if no other node is selected.
 *
 * Note: this behavior is observed in a couple of tree views, including project files tree.
 * There could be an option for disabling/enabling it, if use cases comes up in future
 * where this behavior causes issues.
 */
const useSelectParentOfRemovedSelectedNode = (state: TreeState<unknown>) => {
  const previousCollectionRef = useRef(state.collection);
  useEffect(() => {
    if (state.selectionManager.rawSelection !== "all") {
      const keys = [...state.collection.getKeys()];

      const { invalid = [], valid = [] } = groupBy(
        (selectedKey) => (keys.includes(selectedKey) ? "valid" : "invalid"),
        [...state.selectionManager.selectedKeys]
      );
      if (valid.length === 0 && invalid.length > 0) {
        for (let invalidKey of invalid) {
          let key: Key | undefined = invalidKey;
          while (key != undefined) {
            if (keys.includes(key)) {
              state.selectionManager.setSelectedKeys(valid.concat(key));
              state.selectionManager.setFocusedKey(key);
              return;
            }
            key =
              previousCollectionRef.current.getItem(key)?.parentKey ??
              undefined;
          }
        }
      }
    }
    previousCollectionRef.current = state.collection;
  }, [state.collection]);
};
