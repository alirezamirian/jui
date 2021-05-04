import { SelectionManager } from "@react-stately/selection";
import { RefObject, useEffect } from "react";

type CollectionAutoScrollProps = {
  isVirtualized?: boolean;
  selectionManager: SelectionManager;
};

export function useCollectionAutoScroll(
  { isVirtualized, selectionManager }: CollectionAutoScrollProps,
  ref: RefObject<HTMLElement>
) {
  // If not virtualized, scroll the focused element into view when the focusedKey changes.
  // When virtualized, Virtualizer handles this internally.
  useEffect(() => {
    if (!isVirtualized && selectionManager.focusedKey && ref?.current) {
      let element = ref.current.querySelector(
        `[data-key="${selectionManager.focusedKey}"]`
      ) as HTMLElement;
      if (element) {
        scrollIntoView(ref.current, element);
      }
    }
  }, [isVirtualized, ref, selectionManager.focusedKey]);
}

/**
 * Scrolls `scrollView` so that `element` is visible.
 * Similar to `element.scrollIntoView({block: 'nearest'})` (not supported in Edge),
 * but doesn't affect parents above `scrollView`.
 */
function scrollIntoView(scrollView: HTMLElement, element: HTMLElement) {
  let offsetX = element.offsetLeft - scrollView.offsetLeft;
  let offsetY = element.offsetTop - scrollView.offsetTop;
  let width = element.offsetWidth;
  let height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  let maxX = x + scrollView.offsetWidth;
  let maxY = y + scrollView.offsetHeight;

  if (offsetX <= x) {
    x = offsetX;
  } else if (offsetX + width > maxX) {
    x += offsetX + width - maxX;
  }
  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }

  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
