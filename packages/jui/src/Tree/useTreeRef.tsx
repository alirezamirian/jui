import { SelectableTreeProps } from "./useSelectableTree";
import { useLatest } from "@intellij-platform/core/utils/useLatest";
import { ForwardedRef, Key, useImperativeHandle } from "react";

export interface TreeRef {
  focus(key: Key): void;
  replaceSelection(key: Key): void;
}

/**
 * Sets up a tree ref for imperatively working with tree from outside. For imperatively focusing, expanding to
 * specific key, etc.
 */
export function useTreeRef(
  props: Pick<SelectableTreeProps<unknown>, "selectionManager">,
  forwardedRef?: ForwardedRef<TreeRef>
) {
  const latestState = useLatest(props);

  useImperativeHandle(
    forwardedRef,
    () => {
      return {
        replaceSelection: (key: Key) => {
          latestState.current.selectionManager.replaceSelection(key);
        },
        focus: (key: Key) => {
          const selectionManager = latestState.current.selectionManager;
          selectionManager.setFocused(true);
          /**
           * NOTE: we set focus key to null and set it to key again, to make sure scroll into view works even when
           * the key is currently focused but not in view. It wouldn't be needed if there was an imperative handle
           * for scrolling an item into view, but it's only implemented in way that is reactive to changes to the
           * focused key. {@see useCollectionAutoScroll}
           */
          // @ts-expect-error: setFocusedKey typing mistakenly doesn't accept null, while it should
          selectionManager.setFocusedKey(null);
          setTimeout(() => {
            selectionManager.setFocusedKey(key);
          });
        },
      };
    },
    []
  );
}
