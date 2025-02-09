import { ForwardedRef, Key, RefObject, useImperativeHandle } from "react";
import { useLatest } from "@intellij-platform/core/utils/useLatest";
import { TreeState } from "./useTreeState";
import { scrollIntoView } from "@react-aria/utils";
import { getItemElement } from "@intellij-platform/core/Collections/getItemElement";

// TODO(api): rename to Tree or ...?
export interface TreeRefValue {
  focus(key: Key): void;
  replaceSelection(key: Key): void;

  /**
   * Extends selection to all siblings of the currently focused node.
   */
  expandSelection(): void;
  /**
   * Shrinks selection towards the currently focused node.
   */
  shrinkSelection(): void;

  expandAll(): void;
  collapseAll(): void;
}

/**
 * Sets up a tree ref for imperatively working with a treeview from outside.
 * For imperatively focusing, expanding to a specific key, etc.
 */
export function useTreeRef<T extends {}>(
  {
    state,
    scrollRef,
  }: {
    state: TreeState<T>;
    scrollRef: RefObject<HTMLElement>;
  },
  forwardedRef?: ForwardedRef<TreeRefValue>
) {
  const latestState = useLatest(state);

  useImperativeHandle(
    forwardedRef,
    () => {
      return {
        replaceSelection: (key: Key) => {
          latestState.current.selectionManager.replaceSelection(key);
        },
        /**
         * Moves focus to the tree and into a given key, scrolling it into view.
         * @param key
         */
        focus: (key: Key) => {
          const selectionManager = latestState.current.selectionManager;
          selectionManager.setFocused(true);
          selectionManager.setFocusedKey(key);

          // When the focus is going to an item not currently rendered due to virtualization,
          // the virtualizer will make sure to render it (through `persistedKeys` being set),
          // but it requires a rerender.
          // setTimeout is used in lack of a cleaner solution.
          // It's covered in an e2e test, so refactoring attempts can be done with confidence.
          setTimeout(() => {
            const element = getItemElement(scrollRef, key);
            if (scrollRef.current && element) {
              // When focusedKey is changed, useSelectableCollection no longer auto scrolls
              // to the new focused key.
              // Not sure what would be a valid case of focused item changing, but
              // scrolling into that item being unwanted behavior, especially
              // with selectOnFocus behavior being on by default in Intellij Platform
              // components.
              // It might be worth opening a discussion or issue in React Spectrum.
              scrollIntoView(scrollRef.current, element);
            } else {
              console.error(
                "could not find element to scroll into",
                scrollRef,
                element
              );
            }
          });
        },
        expandSelection() {
          latestState.current.selectionManager.expandSelection();
        },
        shrinkSelection() {
          latestState.current.selectionManager.shrinkSelection();
        },
        expandAll() {
          latestState.current.setExpandedKeys(
            latestState.current.collection.getAllExpandableKeys()
          );
        },
        collapseAll() {
          const {
            collection: tree,
            setExpandedKeys,
            selectionManager,
          } = latestState.current;
          const focusedKey = selectionManager.focusedKey;
          setExpandedKeys(new Set());

          // Find the root node that is a grandparent of focused node, and focus/select it.
          // NOTE: this behaviour of updating selection when nodes are collapsed is something to be fixed in general,
          // and then this custom logic here would be not necessary.
          if (focusedKey && !tree.rootKeys.includes(focusedKey)) {
            let item = tree.getItem(focusedKey);
            while (item?.parentKey != null) {
              item = tree.getItem(item.parentKey);
            }
            if (item) {
              selectionManager.setFocusedKey(item.key);
              if (selectionManager.isSelected(focusedKey)) {
                selectionManager.select(item.key);
              }
            }
          }
        },
      };
    },
    []
  );
}
