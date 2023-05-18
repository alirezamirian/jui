import { FocusEventHandler } from "react";
import { getFocusableTreeWalker } from "@react-aria/focus";

/**
 * Provides a focus management mechanism for a container that doesn't retain focus but forwards it to its focusable
 * descendants. More specifically:
 * - When the container gets focused, it automatically focuses the first focusable child element.
 *   The {@param forwardFocus} parameter can be used to customize which element should receive focus.
 * - By default, focus is prevented from returning to the container itself when focus is being moved from a descendant
 *   to the container. {@param ignoreFocusedDescendant} can be set to `true`, to disable this behaviour.
 *   If {@param ignoreFocusedDescendant} is true, focus will be forcibly moved to the first element (or the element
 *   specified by {@param forwardFocus}) when the container gets focused.
 *
 * NOTE: This hook does not make the container element focusable. It only returns the focus event handler that should be
 * passed to the container.
 */
export function useFocusForwarder({
  forwardFocus,
  ignoreFocusedDescendant = false,
}: {
  /**
   * Called when the container gets focused, to forward focus to the appropriate focusable child element.
   * If not passed, focus is forwarded to the first focusable element, by default.
   */
  forwardFocus?: () => void;
  ignoreFocusedDescendant?: boolean;
} = {}) {
  const onFocus: FocusEventHandler = (event) => {
    if (event.target !== event.currentTarget) {
      // only when this container is focused. not when anything inside is focused.
      return;
    }
    const possiblyBlurredElement = event.relatedTarget;
    if (
      possiblyBlurredElement instanceof Element &&
      event.currentTarget?.contains(possiblyBlurredElement) &&
      !ignoreFocusedDescendant
    ) {
      // If anything inside the content is being blurred while the container is getting focused, we don't let focus
      // go from that element, to the container.
      if (possiblyBlurredElement instanceof HTMLElement) {
        possiblyBlurredElement.focus();
      }
      return;
    }
    if (forwardFocus) {
      forwardFocus();
    } else {
      (
        getFocusableTreeWalker(event.currentTarget).firstChild() as HTMLElement
      ).focus();
    }
  };
  return { focusForwarderProps: { onFocus } };
}
