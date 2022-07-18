import { RefObject, useEffect } from "react";
import { SelectionManager } from "@react-stately/selection";
import { scrollIntoView } from "@react-aria/utils";

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
