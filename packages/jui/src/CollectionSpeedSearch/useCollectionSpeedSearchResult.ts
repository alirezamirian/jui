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
  selectionManager: inputSelectionManager,
  speedSearch,
  focusBestMatch = false,
}: {
  collection: Collection<Node<T>>;
  selectionManager: SelectionManager;
  speedSearch: SpeedSearchState;
  /**
   * If true, focusing the best match (the longest "start-with" match) will be preferred.
   * By default, the focus is moved to the first match that comes after the currently focused item, if currently
   * focused item itself is not a match.
   * A typical use case would be collections that filter out non-match items.
   * @default false
   */
  focusBestMatch?: boolean;
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
  const { matches } = useMemo(() => {
    const matches: CollectionSpeedSearchMatches = new Map(); // maybe make it nullable makes more sense
    if (speedSearch.active) {
      // it's important not to iterate on items, since they can be nested.
      [...collection.getKeys()]
        .map((key) => collection.getItem(key)!)
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
    };
  }, [searchTerm, collection, active]);

  const selectionManager = createSpeedSearchSelectionManager(
    inputSelectionManager,
    active ? matches : null
  );
  const latestValues = useLatest({
    matches,
    selectionManager,
    collection,
    focusBestMatch,
  });

  // On every query change, if the current selection doesn't include any of the matched items, move selection to the
  // first matched item.
  useEffect(() => {
    const { selectionManager, matches, collection } = latestValues.current;
    const matchedKeys = [...matches.keys()];
    const noneOfTheMatchesAreSelected = !matchedKeys.some((matchedKey) =>
      selectionManager.isSelected(matchedKey)
    );
    let keyToFocus: Key | undefined;
    if (latestValues.current.focusBestMatch) {
      keyToFocus = getLongestCommonPrefixMatch(matches);
    }
    if (!keyToFocus && matchedKeys.length > 0 && noneOfTheMatchesAreSelected) {
      keyToFocus = getMatchToSelect({
        collection,
        selectionManager,
        matchedKeys,
      });
    }
    if (keyToFocus) {
      selectionManager.setFocusedKey(keyToFocus);
      selectionManager.replaceSelection(keyToFocus);
    }
  }, [
    searchTerm,
    latestValues /*it's a ref object, so no harm in listing it here to comply with rules of hooks*/,
  ]);
  return {
    matches,
    selectionManager,
  };
}

/**
 * given a non-empty array of matched keys, returns the one that should be selected
 */
function getMatchToSelect({
  collection,
  selectionManager,
  matchedKeys,
}: {
  collection: Collection<Node<unknown>>;
  selectionManager: SelectionManager;
  matchedKeys: Key[];
}): Key {
  let passedFirstSelection = false;
  for (const key of collection.getKeys()) {
    if (key === selectionManager.firstSelectedKey) {
      passedFirstSelection = true;
    }
    if (passedFirstSelection && matchedKeys.includes(key)) {
      return key;
    }
  }
  return matchedKeys[0];
}

/**
 * Returns the longest match from the beginning, if exists.
 */
function getLongestCommonPrefixMatch(matches: CollectionSpeedSearchMatches) {
  return [...matches.entries()]
    .filter(([, [firstRange]]) => firstRange?.from === 0)
    .sort(
      ([, [rangeA]], [, [rangeB]]) =>
        rangeB.to - rangeB.from - rangeA.to - rangeA.from
    )?.[0]?.[0];
}
