import {
  ListProps,
  useListState as originalUseListState,
} from "@react-stately/list";
import { SelectionManager } from "../selection/SelectionManager";

export function useListState<T extends object>(props: ListProps<T>) {
  const state = originalUseListState(props);
  state.selectionManager = new SelectionManager(
    state.collection,
    // @ts-expect-error state is private. There might be better ways of creating a custom selection manager
    state.selectionManager.state
  );
  return state;
}
