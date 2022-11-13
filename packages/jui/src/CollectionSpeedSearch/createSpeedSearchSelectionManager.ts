import { SelectionManager } from "@react-stately/selection";
import { Key } from "react";

export function createSpeedSearchSelectionManager(
  wrappedSelectionManager: SelectionManager,
  matches: Map<Key, unknown /* We don't care what a match is here */> | null
): SelectionManager {
  return Object.create(wrappedSelectionManager, {
    selectAll: {
      value: () => {
        if (matches) {
          // @ts-expect-error: state is private and there is no API on SelectionManager for bulk
          // setting selected keys (which would ideally check for not selecting disabled keys internally).
          const state = wrappedSelectionManager.state;
          state.setSelectedKeys(
            new Set(
              [...matches.keys()].filter((key) => !state.disabledKeys.has(key))
            )
          );
        } else {
          wrappedSelectionManager.selectAll();
        }
      },
    },
  });
}
