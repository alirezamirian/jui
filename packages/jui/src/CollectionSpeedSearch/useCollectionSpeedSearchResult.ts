import { Key, useEffect, useMemo } from "react";
import { minusculeMatch } from "../minusculeMatch";
import { SpeedSearchState } from "../SpeedSearch/useSpeedSearch";
import { Collection, Node } from "@react-types/shared";
import { SelectionManager } from "@react-stately/selection";
import { createSpeedSearchSelectionManager } from "./createSpeedSearchSelectionManager";
import { TextRange } from "@intellij-platform/core/TextRange";
import { useLatest } from "@intellij-platform/core/utils/useLatest";

export type CollectionSpeedSearchMatches = Map<Key, TextRange[]>;

export function useCollectionSpeedSearchResult<T>({
  collection,
  selectionManager,
  speedSearch,
}: {
  collection: Collection<Node<T>>;
  selectionManager: SelectionManager;
  speedSearch: SpeedSearchState;
}) {
  const { searchTerm, active } = speedSearch;

  /**
   * Note: when a component is implemented using react-aria's useCollection, any re-render of that component causes
   * a new collection. That's because prop.children is normally an inline function, and therefore the collection is
   * re-created: https://github.com/adobe/react-spectrum/blob/4a1cff846018e449487ccf54d7474bdfa4d4f57c/packages/@react-stately/collections/src/useCollection.ts#L29
   * This means we will unnecessarily perform the search in such cases. it might be a non-issue, but if it turned out
   * to be an issue, a sub-optimum improvement would be to use `collection.size` as a dependency instead of `collection`,
   * assuming that searchable text in collections won't change, and assuming that the important changes (search-wise)
   * will usually involve a size change in the collection.
   */
  const result = useMemo(() => {
    const matches: CollectionSpeedSearchMatches = new Map(); // maybe make it nullable makes more sense
    if (speedSearch.active) {
      // it's important not to iterate on items, since they can be nested.
      [...collection.getKeys()]
        .map((key) => collection.getItem(key))
        .filter(({ type }) => type === "item")
        .forEach((item) => {
          const matchedRanges = minusculeMatch(item.textValue, searchTerm);
          if (matchedRanges) {
            matches.set(item.key, matchedRanges);
          }
        });
    }

    return {
      matches,
      selectionManager: createSpeedSearchSelectionManager(
        selectionManager,
        active ? matches : null
      ),
    };
  }, [searchTerm, collection, active]);

  const latestValues = useLatest(result);

  // On every query change, if the current selection doesn't include any of the matched items, move selection to the
  // first matched item.
  useEffect(() => {
    const { selectionManager, matches } = latestValues.current;
    const matchedKeys = [...matches.keys()];
    const noneOfTheMatchesAreSelected = !matchedKeys.some((matchedKey) =>
      selectionManager.isSelected(matchedKey)
    );

    if (matchedKeys.length > 0 && noneOfTheMatchesAreSelected) {
      // TODO: the first match AFTER the first key in current selection should be selected.
      selectionManager.setFocusedKey(matchedKeys[0]);
      selectionManager.replaceSelection(matchedKeys[0]);
    }
  }, [
    searchTerm,
    latestValues /*it's a ref object, so no harm in listing it here to comply with rules of hooks*/,
  ]);
  return result;
}
