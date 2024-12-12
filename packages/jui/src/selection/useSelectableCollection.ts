import { useEffect } from "react";
import { useSelectableCollection as useAriaSelectableCollection } from "@react-aria/selection";

/**
 * Wrapper around react-aria useSelectableCollection to fix pending issues or
 * add missing functionality.
 */
export const useSelectableCollection: typeof useAriaSelectableCollection = (
  options
) => {
  const {
    collectionProps: { onKeyDown, ...collectionProps },
  } = useAriaSelectableCollection(options);
  useEffect(() => {
    // Fixing https://github.com/adobe/react-spectrum/issues/4391
    const { selectionManager, autoFocus, selectOnFocus } = options;
    if (
      selectOnFocus &&
      (autoFocus === "first" || autoFocus === "last") &&
      selectionManager.focusedKey != null
    ) {
      selectionManager.replaceSelection(selectionManager.focusedKey);
    }

    // Working around https://github.com/adobe/react-spectrum/issues/7512
    // FIXME: remove the workaround the issue is closed
    if (
      selectionManager.firstSelectedKey &&
      selectionManager.focusedKey == null
    ) {
      // initialize the focusedKey so that the buggy code that mutates selection
      // onFocus doesn't get to run.
      selectionManager.setFocusedKey(selectionManager.firstSelectedKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    collectionProps: {
      ...collectionProps,
      onKeyDown: (e) => {
        // keydown events used to not be handled when alt key is pressed.
        // it's changed in https://github.com/adobe/react-spectrum/commit/885b5e6b84253925b2ac9f7f2766417c63b654b5#diff-e356ae602508922357fd9cd1aa7896f74e24f87bcb2ee86a7bb4a486ea87a2f2R120
        // handling keydown events when alt is down interferes with tree action shortcuts
        // FIXME: make tree actions use capture phase to handle shortcuts so it takes precedence over
        //  the default handlers regardless of what the shortcut is. Revert the patch here, after.
        //  At the time of writing this, `useCapture` is only an option on ActionsProvider, but it
        //  needs to be an option on each action, to allow for this use case.
        if (!e.altKey) {
          onKeyDown?.(e);
        }
      },
    },
  };
};
