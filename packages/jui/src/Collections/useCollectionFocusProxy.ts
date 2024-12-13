import { Key, RefObject, useEffect } from "react";
import { SelectionManager } from "@react-stately/selection";
import { Collection, Node } from "@react-types/shared";

/**
 * interface to be extended by the props of collection components that support focus proxy.
 */
export interface CollectionFocusProxyProps {
  /**
   * ref to an element (typically HTMLInputElement) that should act as a focus
   * proxy that handles ArrowUp, ArrowDown, and Enter keys to allow for
   * navigating the collection and selecting items.
   * Useful for implementing
   * autocompletion or search input connected to a collection element.
   */
  focusProxyRef?: RefObject<HTMLElement>;
}

/**
 * A solution for connecting a collection to a search input so that the collection can still be navigated by keyboard
 * while the input is focused. It works by replaying certain keyboard events on the collection container and focused
 * item. An alternative approach (which is used in react-aria's useCombobox) is to use useSelectableCollection
 * separately for the input, but the biggest issue with that approach is that it's limiting in the following ways:
 * - Rendering input should be a part of the same component that renders the collection. Having specific components
 *   for use cases that require a search input is not flexible enough. For example, one may want to use SpeedSearchList
 *   or List connected to an input. Also, the input and the collection may need to be in different layouts in different
 *   use cases. Decoupling the rendering of the input and collection is a more flexible solution.
 * - The same options used for collection should be passed to the input field for behavior consistency, and that is
 *   prone to error.
 *   Some of these options, like `keyboardDelegate` can even have a default value in hooks like
 *   `useSelectableList`.
 *   It means making sure the same value is passed to the useSelectableCollection for input
 *   would require not using the default value, since the same value can't be accessed.
 *
 * With this event-forwarding approach, it's an arrow up or down event would behave exactly like it was triggered on
 * the collection itself, leaving no room for behavior discrepancies. But it has a few drawbacks:
 * - Although small, there is still some coupling between this code and implementation of the collection component.
 *   More specifically, this implementation assumes the following things:
 *   - "Enter" keys (selection or action) are handled on items, but arrow keys are handled on the collection element.
 *   - "[data-key] attribute is set on items. That is used to find the element for the focused item (which, of course,
 *     is not actually focused while the input is).
 *
 * Note: there has been some addition to react-aria useSelectableCollection and useSelectableItem hooks
 * based on CustomEvent and a similar event reply mechanism in useAutocomplete.
 * It may be possible to replace this hook with built-in functionality in react-aria at some point.
 * But at the moment, it seems like that implementation is too coupled with the autocompletion use case, while
 * what is supported here is more generic and allows for the connected search input use case too.
 */

export const useCollectionFocusProxy = <T>({
  state,
  focusProxyRef,
  collectionRef,
  onAction,
}: {
  focusProxyRef: RefObject<HTMLElement> | undefined;
  collectionRef: RefObject<HTMLElement>;
  state: {
    /** A collection of items in the list. */
    collection: Collection<Node<T>>;
    /** A selection manager to read and update multiple selection state. */
    selectionManager: SelectionManager;
  };
  onAction: ((key: Key) => void) | undefined;
}) => {
  // TODO: focus/blur events should probably be handled as well, to keep the
  //  isFocused state of the collection in sync.
  useEffect(
    () => {
      const proxy = focusProxyRef?.current;
      if (proxy) {
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();

            collectionRef.current?.dispatchEvent(
              new KeyboardEvent(event.type, event)
            );
          } else if (
            event.key === "Enter" &&
            state.selectionManager?.focusedKey != null
          ) {
            event.preventDefault(); // in forms, pressing Enter on input submits the form
            (event.currentTarget as HTMLElement)?.addEventListener(
              "keyup",
              (event: KeyboardEvent) => {
                console.log(
                  "Keyup",
                  event.key,
                  state.selectionManager.focusedKey,
                  "onAction",
                  onAction
                );
                if (
                  event.key === "Enter" &&
                  state.selectionManager.focusedKey != null
                ) {
                  onAction?.(state.selectionManager.focusedKey);
                }
              },
              { once: true, capture: true }
            );
          }
        };
        proxy.addEventListener("keydown", onKeyDown);
        return () => {
          proxy.removeEventListener("keydown", onKeyDown);
        };
      }
    } /* with no dependency here, event listeners are reattached on each render, but that's the case when unmemoized
    event handlers are passed to elements too (e.g., when using any react-aria hook) */
  );
};
