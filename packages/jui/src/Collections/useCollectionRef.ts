import { SelectionManager } from "@react-stately/selection";
import { RefObject, useImperativeHandle } from "react";

export type CollectionRefProps = {
  /**
   * Gives imperative access to selection manager.
   */
  selectionManagerRef?: RefObject<SelectionManager>;
};

/**
 * Common imperative API for collections. Used in Lists at the moment. Tree components implement a different imperative
 * API that can be refactored later for more consistency.
 */
export function useCollectionRef(
  { selectionManagerRef }: CollectionRefProps,
  state: { selectionManager: SelectionManager }
) {
  useImperativeHandle(selectionManagerRef, () => state.selectionManager);
}
