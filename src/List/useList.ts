import { JListProps, useJList } from "./useJList";
import {
  useSpeedSearch,
  useSpeedSearchState,
} from "../SpeedSearch/useSpeedSearch";
import { ListState } from "@react-stately/list";
import { HTMLProps, Key, RefObject } from "react";
import { mergeProps } from "@react-aria/utils";
import { SpeedSearchPopupProps } from "../SpeedSearch/SpeedSearchPopup";
import { useCollectionSpeedSearch } from "../CollectionSpeedSearch/useCollectionSpeedSearch";
import { TextRange } from "../TextRange";

interface UseListProps
  extends Omit<JListProps, "keyboardDelegate" | "disallowTypeAhead" | ""> {
  stickySearch?: boolean;
}

export function useList<T>(
  { stickySearch }: UseListProps,
  listState: ListState<T>,
  ref: RefObject<HTMLElement>
): {
  listProps: HTMLProps<HTMLUListElement>;
  searchPopupProps: SpeedSearchPopupProps;
  matches: Map<Key, TextRange[]>;
} {
  const speedSearch = useSpeedSearchState({});
  const { matches } = useCollectionSpeedSearch({
    ...listState,
    speedSearch,
  });
  const { containerProps } = useSpeedSearch({ stickySearch }, speedSearch);
  const { listProps } = useJList({ disallowTypeAhead: true }, listState, ref);

  return {
    listProps: mergeProps(listProps, containerProps),
    matches,
    searchPopupProps: {
      active: speedSearch.isSearchTermVisible,
      match: matches.size > 0,
      children: speedSearch.searchTerm,
    },
  };
}
