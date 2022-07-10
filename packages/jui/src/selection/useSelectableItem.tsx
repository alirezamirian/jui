import { useSelectableItem as useOriginalSelectableItem } from "@react-aria/selection";
import { MouseEventHandler } from "react";
import { mergeProps } from "@react-aria/utils";

/**
 * A wrapper around useSelectableItem, which adjusts for intellij platform nuances:
 * - Selects item with right clicks as well, which allows ContextMenuContainer to be used with any collection component
 *   without the need for built-in context-menu support in such components. We won't need this if we move to a built-in
 *   context-menu support for List,Tree, etc.
 * @private
 */
export const useSelectableItem: typeof useOriginalSelectableItem = (
  options
) => {
  const onContextMenu: MouseEventHandler<HTMLElement> = (e) => {
    if (!options.selectionManager.isSelected(options.key)) {
      options.selectionManager.select(options.key, {
        type: "press",
        pointerType: "mouse",
        target: e.currentTarget,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
      });
    }
  };
  const result = useOriginalSelectableItem(options);
  return {
    ...result,
    itemProps: mergeProps(result.itemProps, { onContextMenu }),
  };
};
