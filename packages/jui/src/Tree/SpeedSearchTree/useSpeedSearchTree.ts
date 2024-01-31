import { RefObject } from "react";
import { useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { TreeState } from "@react-stately/tree";
import { useCollectionSpeedSearch } from "../../CollectionSpeedSearch/useCollectionSpeedSearch";
import { SpeedSearchProps } from "../../SpeedSearch/useSpeedSearch";
import { TreeKeyboardDelegate } from "../TreeKeyboardDelegate";
import { SelectableTreeProps, useSelectableTree } from "../useSelectableTree";
import { hasAnyModifier } from "@intellij-platform/core/utils/keyboard-utils";

interface UseSpeedSearchTreeProps<T>
  extends SpeedSearchProps,
    SelectableTreeProps<T> {}

export function useSpeedSearchTree<T>(
  props: UseSpeedSearchTreeProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLElement>
) {
  const {
    containerProps,
    keyboardDelegate,
    selectionManager,
    speedSearch,
    ...collectionSpeedSearch
  } = useCollectionSpeedSearch({
    collection: state.collection,
    selectionManager: state.selectionManager,
    keepSearchActiveOnBlur: props.keepSearchActiveOnBlur,
    keyboardDelegate: new TreeKeyboardDelegate(
      state.collection,
      state.disabledKeys,
      ref
    ),
    ref,
    // TODO: maybe allow control over speed search via other props
  });

  // Speed search is cleared on "Enter" key. Alternatively we could wrap onAction and onToggle props
  // but this seemed more reasonable
  // NOTE: It may make sense for this behaviour to be pulled up to useCollectionSpeedSearch.
  const { keyboardProps: speedSearchKeyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (
        ["Enter", "ArrowLeft", "ArrowRight"].includes(e.key) &&
        !hasAnyModifier(e)
      ) {
        speedSearch.clear();
      } else {
        e.continuePropagation();
      }
    },
  });

  const { treeProps, ...selectableTree } = useSelectableTree(
    { ...props, keyboardDelegate },
    { ...state, selectionManager },
    ref
  );

  return {
    treeProps: mergeProps(treeProps, containerProps, speedSearchKeyboardProps),
    ...collectionSpeedSearch,
    ...selectableTree,
  };
}
