import {
  ListProps,
  ListState,
  useListState as originalUseListState,
} from "@react-stately/list";
import {
  CollectionRefProps,
  useCollectionRef,
} from "@intellij-platform/core/Collections/useCollectionRef";

export function useListState<T extends object>(
  props: ListProps<T> & CollectionRefProps
): ListState<T> {
  const state = originalUseListState({
    ...props,
    selectionBehavior: "replace",
  });
  useCollectionRef(props, state);
  return state;
}
