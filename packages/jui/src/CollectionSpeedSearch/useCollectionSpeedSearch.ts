import { Collection, KeyboardDelegate, Node } from "@react-types/shared";
import { SelectionManager } from "@react-stately/selection";
import {
  SpeedSearchStateProps,
  useSpeedSearch,
  useSpeedSearchState,
} from "../SpeedSearch/useSpeedSearch";
import { useCollectionSpeedSearchResult } from "./useCollectionSpeedSearchResult";
import { useMemo } from "react";
import { createSpeedSearchKeyboardDelegate } from "./createSpeedSearchKeyboardDelegate";

/**
 * Given a `collection`, a `selectionManager` and a `keyboardDelegate`, it returns:
 * - `speedSearch`: search term, if speed search is active or not, and the matched keys
 * - `matches`: A Set of matched keys, or `null` if speed search is not active
 * - `containerProps`: The props you need to pass to the collection container element to enable
 * speedSearch on it.
 * - `selectionManager`: a selection manager in which select all is overridden to only select
 * matched items if speed search is active.
 * - `keyboardDelegate`: a keyboard delegate in which limits navigation to matched items, when
 * speed search is active.
 *
 * Speed search options, including the ones for optionally controlling the state of the speed search
 * are also accepted in inputs.
 */
export function useCollectionSpeedSearch<T>({
  collection,
  selectionManager,
  stickySearch,
  keyboardDelegate,
  ...speedSearchStateProps
}: {
  collection: Collection<Node<T>>;
  selectionManager: SelectionManager;
  keyboardDelegate: KeyboardDelegate;
  stickySearch?: boolean;
} & SpeedSearchStateProps) {
  const speedSearch = useSpeedSearchState(speedSearchStateProps); // maybe allow control over state
  // via props?

  const { matches, selectionManager: speedSearchSelectionManager } =
    useCollectionSpeedSearchResult({
      collection,
      selectionManager,
      speedSearch,
    });
  const { containerProps } = useSpeedSearch({ stickySearch }, speedSearch);
  const speedSearchKeyboardDelegate = useMemo(
    () =>
      createSpeedSearchKeyboardDelegate(
        keyboardDelegate,
        speedSearch.active ? matches : null
      ),
    [speedSearch.active, keyboardDelegate, matches]
  );

  // Doesn't seem necessary to wrap with useMemo, but can be rethink-ed
  const speedSearchContextValue = { matches, collection };

  return {
    containerProps,
    selectionManager: speedSearchSelectionManager,
    keyboardDelegate: speedSearchKeyboardDelegate,
    speedSearch: {
      ...speedSearch,
      matches,
    },
    searchPopupProps: {
      active: speedSearch.active,
      match: matches.size > 0,
      children: speedSearch.searchTerm,
    },
    speedSearchContextValue,
  };
}
