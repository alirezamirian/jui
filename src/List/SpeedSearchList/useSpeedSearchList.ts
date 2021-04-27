import { BasicListProps, useBasicList } from "../BasicList/useBasicList";
import {
  SpeedSearchState,
  useSpeedSearch,
  useSpeedSearchState,
} from "../../SpeedSearch/useSpeedSearch";
import { ListState } from "@react-stately/list";
import React, { HTMLProps, Key, RefObject, useMemo, useState } from "react";
import { mergeProps } from "@react-aria/utils";
import { SpeedSearchPopupProps } from "../../SpeedSearch/SpeedSearchPopup";
import { useCollectionSpeedSearch } from "../../selection/CollectionSpeedSearch/useCollectionSpeedSearch";
import { TextRange } from "../../TextRange";
import { useFocusWithin } from "@react-aria/interactions";
import { SpeedSearchListKeyboardDelegate } from "./SpeedSearchListKeyboardDelegate";

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
  matches: Map<Key, TextRange[]>;
} {
  const { stickySearch } = props;
  const [focused, setFocused] = useState(false);
  const speedSearch = useSpeedSearchState({});
  const { matches } = useCollectionSpeedSearch({
    ...listState,
    speedSearch,
  });
  const { containerProps } = useSpeedSearch({ stickySearch }, speedSearch);
  const keyboardDelegate = useSpeedSearchListKeyboardDelegate(
    listState,
    ref,
    speedSearch,
    matches
  );
  const { listProps } = useBasicList(
    {
      ...props,
      disallowTypeAhead: true,
      keyboardDelegate,
    },
    listState,
    ref
  );

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocused,
  });

  return {
    listProps: mergeProps(listProps, containerProps, focusWithinProps),
    matches,
    focused,
    searchPopupProps: {
      active: speedSearch.active,
      match: matches.size > 0,
      children: speedSearch.searchTerm,
    },
  };
}

function useSpeedSearchListKeyboardDelegate<T>(
  listState: ListState<T>,
  ref: React.RefObject<HTMLElement>,
  speedSearch: SpeedSearchState,
  matches: Map<React.Key, TextRange[]>
) {
  return useMemo(
    () =>
      new SpeedSearchListKeyboardDelegate(
        listState.collection,
        listState.disabledKeys,
        ref,
        speedSearch.active ? matches : null
      ),
    [
      listState.collection,
      listState.disabledKeys,
      ref,
      matches,
      speedSearch.active,
    ]
  );
}
