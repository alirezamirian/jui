import { SelectableListOptions } from "@react-aria/selection";
import { ListState } from "@react-stately/list";
import React, { useEffect } from "react";

export interface BasicListProps
  extends Omit<
    SelectableListOptions,
    | "selectOnFocus"
    | "selectionManager" // Grouped as state, the second argument, like in useListBox
    | "collection" // Grouped as state, the second argument, like in useListBox
    | "disabledKeys" // Grouped as state, the second argument, like in useListBox
    | "ref" // Third argument
  > {
  id?: string;
}
import { useSelectableList } from "../useSelectableList";
// import { useSelectableList } from "@react-aria/selection";

export function useBasicList<T>(
  props: BasicListProps,
  state: ListState<T>,
  ref: React.RefObject<HTMLElement>
) {
  const {
    listProps: { onMouseDown, ...listProps },
  } = useSelectableList({
    ...props,
    ref,
    selectionManager: state.selectionManager,
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    // if selectOnFocus is gonna be an option (which is not in intellij UI), we should also conditionally show outline on items
    selectOnFocus: true,
  });

  // auto select the first item, if selection is empty and disallowEmptySelection is true.
  useEffect(() => {
    const firstKey = state.collection.getFirstKey();
    if (
      props.disallowEmptySelection &&
      state.selectionManager.isEmpty &&
      firstKey
    ) {
      state.selectionManager.select(firstKey);
    }
  }, [props.disallowEmptySelection]);

  return { listProps };
}
