import {
  ListProps,
  ListState,
  useListState as originalUseListState,
} from "@react-stately/list";
import { replaceSelectionManager } from "@intellij-platform/core/selection";

export function useListState<T extends object>(
  props: ListProps<T>
): ListState<T> {
  return replaceSelectionManager(
    originalUseListState({ ...props, selectionBehavior: "replace" })
  );
}
