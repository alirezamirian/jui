import { Key } from "react";
import { TreeState } from "@react-stately/tree";
import { PressProps } from "@react-aria/interactions";

export function useTreeNodeToggleButton<T>({
  collection,
  toggleKey,
  selectionManager,
  key,
}: { key: Key } & Pick<
  TreeState<T>,
  "collection" | "toggleKey" | "selectionManager"
>): { treeNodeToggleButtonProps: PressProps } {
  return {
    treeNodeToggleButtonProps: {
      preventFocusOnPress: true,
      onPress: () => {
        toggleKey(key);

        // The rest is for deselecting selected descendants and selecting the toggled node, if there
        // is at least one of such currently selected descendants. This is the exact behavior
        // of Tree in Intellij Platform, and hence implemented here.
        const selectedDescendantKeys = [
          ...selectionManager.selectedKeys,
        ].filter((key: Key) => {
          let parentKey = collection.getItem(key)?.parentKey;
          while (parentKey) {
            if (parentKey === key) {
              return true;
            }
            parentKey = collection.getItem(parentKey)?.parentKey;
          }
          return false;
        });
        selectedDescendantKeys.forEach((key) =>
          selectionManager.toggleSelection(key)
        );
        // if any of the descendants are selected
        if (
          !selectionManager.isSelected(key) &&
          selectedDescendantKeys.length > 0
        ) {
          selectionManager.toggleSelection(key);
        }
      },
    },
  };
}
