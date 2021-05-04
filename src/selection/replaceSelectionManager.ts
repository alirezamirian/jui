import { SelectionManager } from "./SelectionManager";
import { Collection, Node } from "@react-types/shared";

/**
 * collection state hooks like `useList`, `useTree`, etc, don't have an option to pass an
 * alternative `SelectionManager` implementation (which is required to achieve the desired
 * multi-select behavior). So this simple utility is kind of a hacky patch to replace selection
 * manager in the return value of those state hooks
 */
export function replaceSelectionManager<
  T,
  S extends {
    selectionManager: SelectionManager;
    collection: Collection<Node<T>>;
  }
>(state: S) {
  state.selectionManager = new SelectionManager(
    state.collection,
    // @ts-expect-error state is private. There might be better ways of creating a custom selection manager
    state.selectionManager.state
  );
  return state;
}
