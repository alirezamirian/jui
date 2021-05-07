import { Node } from "@react-types/shared";
import { ListState } from "@react-stately/list";
import { SelectionManager } from "@react-stately/selection";
import { HTMLProps, Key, RefObject } from "react";
import { mergeProps } from "@react-aria/utils";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { SpeedSearchPopupProps } from "../../SpeedSearch/SpeedSearchPopup";
import { TextRange } from "../../TextRange";
import { useCollectionSpeedSearch } from "../../CollectionSpeedSearch/useCollectionSpeedSearch";
import { ListProps, useList } from "../useList";

interface UseListProps
  extends Omit<ListProps, "keyboardDelegate" | "disallowTypeAhead"> {
  stickySearch?: boolean;
}

export function useSpeedSearchList<T>(
  props: UseListProps,
  listState: ListState<T>,
  ref: RefObject<HTMLElement>
): {
  listProps: Omit<HTMLProps<HTMLUListElement>, "as" | "ref">;
  searchPopupProps: SpeedSearchPopupProps;
  focused: boolean;
  getHighlightedItem: (item: Node<T>) => Node<T>;
  selectionManager: SelectionManager;
  matches: Map<Key, TextRange[]>;
} {
  const { stickySearch } = props;

  const {
    speedSearch,
    selectionManager,
    keyboardDelegate,
    containerProps: speedSearchContainerProps,
    searchPopupProps,
    getHighlightedItem,
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
  const { listProps, focused } = useList(
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
    matches: speedSearch.matches,
    focused,
    selectionManager,
    getHighlightedItem,
    searchPopupProps,
  };
}
