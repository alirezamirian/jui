import { BasicListProps, useBasicList } from "./BasicList/useBasicList";
import {
  useSpeedSearch,
  useSpeedSearchState,
} from "../SpeedSearch/useSpeedSearch";
import { ListState } from "@react-stately/list";
import { HTMLProps, Key, RefObject, useState } from "react";
import { mergeProps } from "@react-aria/utils";
import { SpeedSearchPopupProps } from "../SpeedSearch/SpeedSearchPopup";
import { useCollectionSpeedSearch } from "../selection/CollectionSpeedSearch/useCollectionSpeedSearch";
import { TextRange } from "../TextRange";
import { useFocusWithin } from "@react-aria/interactions";

interface UseListProps
  extends Omit<BasicListProps, "keyboardDelegate" | "disallowTypeAhead" | ""> {
  stickySearch?: boolean;
}

export function useList<T>(
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
  const { listProps } = useBasicList(
    { ...props, disallowTypeAhead: true },
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
      active: speedSearch.isSearchTermVisible,
      match: matches.size > 0,
      children: speedSearch.searchTerm,
    },
  };
}
