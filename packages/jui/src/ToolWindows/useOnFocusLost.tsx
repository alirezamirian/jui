import { RefObject, useEffect } from "react";

/**
 * Executes a callback function when focus is lost from the container element. i.e. when the currently focused element
 * was within the container and:
 * - The focus is going to an element outside the container, or
 * - The focus is about to get lost (i.e. go to `document.body`).
 *
 * Note: react-aria's `useFocusWithin` (and it's `onBlurWithin` option) can't be used, since (at least currently) it
 * doesn't cover the scenario where the focus is about to get lost due to the focused element getting unmounted.
 */
export function useOnFocusLost(
  onFocusLost: (args: {
    focusLosingElement: HTMLElement | null;
    focusReceivingElement: Element | null;
  }) => void,
  containerRef: RefObject<HTMLElement>
): void {
  useEffect(() => {
    const handleBodyFocus = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLElement &&
        containerRef.current?.contains(e.target) &&
        (!e.relatedTarget || e.relatedTarget instanceof HTMLElement) &&
        !containerRef.current?.contains(e.relatedTarget)
      ) {
        onFocusLost({
          focusLosingElement: e.target,
          focusReceivingElement: e.relatedTarget,
        });
      }
    };
    containerRef.current?.addEventListener("focusout", handleBodyFocus);
    return () => {
      containerRef.current?.removeEventListener("focusout", handleBodyFocus);
    };
  }, []);
}
