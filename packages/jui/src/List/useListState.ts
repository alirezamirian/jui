import {
  ListProps,
  ListState,
  useListState as originalUseListState,
} from "@react-stately/list";

export function useListState<T extends object>(
  props: ListProps<T>
): ListState<T> {
  return originalUseListState({ ...props, selectionBehavior: "replace" });
}
