import { RefObject, useEffect } from "react";
import { SelectionManager } from "@react-stately/selection";
import { scrollIntoView } from "@react-aria/utils";
import { getItemElement } from "@intellij-platform/core/Collections/getItemElement";

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
      let element = getItemElement(ref, selectionManager.focusedKey);
      if (element) {
        scrollIntoView(ref.current, element);
      }
    }
  }, [isVirtualized, ref, selectionManager.focusedKey]);
}
