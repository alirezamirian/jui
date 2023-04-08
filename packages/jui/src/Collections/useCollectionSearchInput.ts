import React, { RefObject } from "react";
import { SelectionManager } from "@react-stately/selection";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import { DOMAttributes } from "@react-types/shared";

/**
 * A solution for connecting a collection to a search input, so that collection can still be navigated by keyboard
 * while the input is focused. It works by replaying certain keyboard events on the collection container and focused
 * item. An alternative approach (which is used in react-aria's useCombobox) is to use useSelectableCollection
 * separately for the input, but the biggest issue with that approach is that it's limiting in the following ways:
 * - Rendering input should be a part of the same component that renders the collection. Having specific components
 *   for use cases that requires a search input is not flexible enough. For example one may want to use SpeedSearchList
 *   or List connected to an input. Also, the input and the collection may need to be in different layouts in different
 *   use cases. Decoupling the rendering of the input and collection is a more flexible solution.
 * - The same options used for collection should be passed to the input field for behavior consistency, and that can be
 *   prone to error. Some of these options, like `keyboardDelegate` can even have a default value in hooks like
 *   `useSelectableList`, which means for making sure the same value is passed to the useSelectableCollection for input,
 *   would require to not use the default value, since the same value can't be accessed.
 *
 * With this event forwarding approach, it's an arrow up or down event would behave exactly like it was triggered on
 * the collection itself, leaving no room for behavior discrepancies. But it has a few drawbacks:
 * - Although small, there is still some coupling between this code and implementation of the collection component.
 *   More specifically, the following things are assumed by this implementation:
 *   - "Enter" keys (selection or action) are handled on items, but arrow keys are handled on the collection element.
 *   - "[data-key] attribute is set on items. That is used to find the element for the focused item (which of course is
 *     not actually focused while the input is).
 */
export const useCollectionSearchInput = ({
  collectionRef,
  selectionManager,
}: {
  /**
   * ref to the html element of the collection component
   */
  collectionRef: RefObject<HTMLElement>;
  /**
   * SelectionManager instance, returned from the state management hook for the collection component.
   * {@link CollectionRefProps.selectionManagerRef} can be used on collection components that implement
   * `useCollectionRef`, to get a hold of selection manager, from outside.
   */
  selectionManager: SelectionManager | null | undefined;
}): { collectionSearchInputProps: DOMAttributes<HTMLInputElement> } => {
  const relayEventsToCollection = useEventCallback(
    (event: React.KeyboardEvent) => {
      // Relay ArrowUp and ArrowDown to the container
      if (
        event.type === "keydown" &&
        (event.key === "ArrowUp" || event.key === "ArrowDown")
      ) {
        event.preventDefault();
        event.stopPropagation();
        collectionRef.current?.dispatchEvent(
          new KeyboardEvent(event.type, event.nativeEvent)
        );
      }
      // Relay Enter to the focused item
      else if (event.key === "Enter" && selectionManager?.focusedKey) {
        collectionRef.current
          ?.querySelector(`[data-key="${selectionManager?.focusedKey}"]`)
          ?.dispatchEvent(new KeyboardEvent(event.type, event.nativeEvent));
        event.preventDefault();
      }
    }
  );

  return {
    collectionSearchInputProps: {
      onKeyDown: relayEventsToCollection,
      onKeyUp: relayEventsToCollection,
      onKeyPress: relayEventsToCollection,
    },
  };
};
