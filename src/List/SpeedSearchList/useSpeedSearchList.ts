import { BasicListProps, useBasicList } from "../BasicList/useBasicList";

import { ListState } from "@react-stately/list";
import { HTMLProps, Key, RefObject } from "react";
import { mergeProps } from "@react-aria/utils";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { SpeedSearchPopupProps } from "../../SpeedSearch/SpeedSearchPopup";
import { TextRange } from "../../TextRange";
import { SelectionManager } from "@react-stately/selection";
import { useCollectionSpeedSearch } from "../../CollectionSpeedSearch/useCollectionSpeedSearch";

interface UseListProps
  extends Omit<BasicListProps, "keyboardDelegate" | "disallowTypeAhead"> {
  stickySearch?: boolean;
}

export function useSpeedSearchList<T>(
  props: UseListProps,
  listState: ListState<T>,
  ref: RefObject<HTMLElement>
): {
  listProps: HTMLProps<HTMLUListElement>;
  searchPopupProps: SpeedSearchPopupProps;
  focused: boolean;
  selectionManager: SelectionManager;
  matches: Map<Key, TextRange[]>;
} {
  const { stickySearch } = props;

  const {
    speedSearch: { matches, active, searchTerm },
    selectionManager,
    keyboardDelegate,
    containerProps: speedSearchContainerProps,
  } = useCollectionSpeedSearch({
    collection: listState.collection,
    selectionManager: listState.selectionManager,
    keyboardDelegate: new ListKeyboardDelegate(
      listState.collection,
      listState.disabledKeys,
      ref
    ),
    stickySearch,
  });
  const { listProps, focused } = useBasicList(
    {
      ...props,
      disallowTypeAhead: true,
      keyboardDelegate,
    },
    { ...listState, selectionManager },
    ref
  );

  return {
    listProps: mergeProps(listProps, speedSearchContainerProps),
    matches,
    focused,
    selectionManager,
    searchPopupProps: {
      active: active,
      match: matches.size > 0,
      children: searchTerm,
    },
  };
}
