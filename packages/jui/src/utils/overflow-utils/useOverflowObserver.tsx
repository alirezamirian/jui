import { RefObject, useEffect, useState } from "react";
import { OverflowObserver } from "@intellij-platform/core/utils/overflow-utils/OverflowObserver";

/**
 * Given a ref to a scrollable container, returns the child elements that are not completely visible and
 * are off view because of scroll.
 * @param scrollableContainerRef
 * @param threshold
 */
export function useOverflowObserver(
  scrollableContainerRef: RefObject<HTMLElement>,
  {
    threshold = 0.9,
    rootMargin = "0px",
  }: Omit<IntersectionObserverInit, "root"> = {}
) {
  const [overflowedElements, setOverflowedElements] = useState<Element[]>([]);

  useEffect(() => {
    const overflowObserver = new OverflowObserver((change) => {
      setOverflowedElements(change.overflowedElements);
    });
    overflowObserver.observe(scrollableContainerRef.current!, {
      rootMargin,
      threshold,
    });
    return () => {
      overflowObserver.disconnect();
    };
  }, [
    /**
     * It's ok and needed to have the ref value as a dependency here. We don't know if ref is attached to different
     * elements in each render, and it's ok that it's not a state, since we don't change it, and it's not supposed to
     * change without a rerender
     **/
    scrollableContainerRef.current,
  ]);

  return {
    overflowedElements,
  };
}
