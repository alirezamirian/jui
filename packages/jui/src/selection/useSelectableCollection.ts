import { useEffect } from "react";
import { useSelectableCollection as useAriaSelectableCollection } from "@react-aria/selection";

/**
 * Wrapper around react-aria useSelectableCollection to fix pending issues or
 * add missing functionality.
 */
export const useSelectableCollection: typeof useAriaSelectableCollection = (
  options
) => {
  const result = useAriaSelectableCollection(options);
  useEffect(() => {
    // Fixing https://github.com/adobe/react-spectrum/issues/4391
    const { selectionManager, autoFocus, selectOnFocus } = options;
    if (
      (selectOnFocus && autoFocus === "first") ||
      (autoFocus === "last" && !selectionManager.focusedKey)
    ) {
      selectionManager.replaceSelection(selectionManager.focusedKey);
    }
  });
  return result;
};
