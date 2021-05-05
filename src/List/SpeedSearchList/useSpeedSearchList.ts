import { BasicListProps, useBasicList } from "../BasicList/useBasicList";

import { ListState } from "@react-stately/list";
import { HTMLProps, Key, RefObject, useMemo, useState } from "react";
import { mergeProps } from "@react-aria/utils";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { useFocusWithin } from "@react-aria/interactions";
import { SpeedSearchPopupProps } from "../../SpeedSearch/SpeedSearchPopup";
import { useCollectionSpeedSearchResult } from "../../CollectionSpeedSearch/useCollectionSpeedSearchResult";
import { TextRange } from "../../TextRange";
import {
  useSpeedSearch,
  useSpeedSearchState,
} from "../../SpeedSearch/useSpeedSearch";
import { createSpeedSearchKeyboardDelegate } from "../../CollectionSpeedSearch/createSpeedSearchKeyboardDelegate";
import { SpeedSearchSelectionManager } from "./SpeedSearchSelectionManager";

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
  selectionManager: SpeedSearchSelectionManager;
  matches: Map<Key, TextRange[]>;
} {
  const { stickySearch } = props;
  const [focused, setFocused] = useState(false);
  const speedSearch = useSpeedSearchState({}); // maybe allow control over state via props?

  const { matches, selectionManager } = useCollectionSpeedSearchResult({
    ...listState,
    speedSearch,
  });
  const { containerProps } = useSpeedSearch({ stickySearch }, speedSearch);
  const keyboardDelegate = useMemo(
    () =>
      createSpeedSearchKeyboardDelegate(
        new ListKeyboardDelegate(
          listState.collection,
          listState.disabledKeys,
          ref
        ),
        speedSearch.active ? matches : null
      ),
    [listState, ref, speedSearch, matches]
  );
  const { listProps } = useBasicList(
    {
      ...props,
      disallowTypeAhead: true,
      keyboardDelegate,
    },
    { ...listState, selectionManager },
    ref
  );

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  return {
    listProps: mergeProps(listProps, containerProps, focusWithinProps),
    matches,
    focused,
    selectionManager,
    searchPopupProps: {
      active: speedSearch.active,
      match: matches.size > 0,
      children: speedSearch.searchTerm,
    },
  };
}
