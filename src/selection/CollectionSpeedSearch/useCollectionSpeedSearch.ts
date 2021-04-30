import { Key, useMemo } from "react";
import { minusculeMatch } from "../../minusculeMatch";
import { SpeedSearchState } from "../../SpeedSearch/useSpeedSearch";
import { TextRange } from "../../TextRange";
import { Collection, Node } from "@react-types/shared";
import { MultipleSelectionManager } from "@react-stately/selection";
import { SpeedSearchSelectionManager } from "../../List/SpeedSearchList/SpeedSearchSelectionManager";

export function useCollectionSpeedSearch<T>({
  collection,
  selectionManager,
  speedSearch,
}: {
  collection: Collection<Node<T>>;
  selectionManager: MultipleSelectionManager;
  speedSearch: SpeedSearchState;
}) {
  const { searchTerm, active } = speedSearch;
  return useMemo(() => {
    const matches = new Map<Key, TextRange[]>(); // maybe make it nullable makes more sense
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
      const matchedKeys = [...matches.keys()];

      const noneOfTheMatchesAreSelected = !matchedKeys.some((matchedKey) =>
        selectionManager.isSelected(matchedKey)
      );

      if (matchedKeys.length > 0 && noneOfTheMatchesAreSelected) {
        // TODO: the first match AFTER the first key in current selection should be selected.
        selectionManager.setFocusedKey(matchedKeys[0]);
        selectionManager.replaceSelection(matchedKeys[0]);
      }
    }

    return {
      matches,
      selectionManager: new SpeedSearchSelectionManager(
        collection,
        // @ts-expect-error SelectionManager.state is private :/
        selectionManager.state,
        active ? matches : null
      ),
    };
  }, [searchTerm, collection, active]);
}
