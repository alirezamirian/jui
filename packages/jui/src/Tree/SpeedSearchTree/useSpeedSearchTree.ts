import { useKeyboard } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { RefObject } from "react";
import { useCollectionSpeedSearch } from "../../CollectionSpeedSearch/useCollectionSpeedSearch";
import { SpeedSearchProps } from "../../SpeedSearch/useSpeedSearch";
import { TreeKeyboardDelegate } from "../TreeKeyboardDelegate";
import { SelectableTreeProps, useSelectableTree } from "../useSelectableTree";

interface Props<T> extends SpeedSearchProps, SelectableTreeProps<T> {}

export function useSpeedSearchTree<T>(
  props: Props<T>,
  ref: RefObject<HTMLElement>
) {
  const {
    containerProps,
    keyboardDelegate,
    selectionManager,
    speedSearch,
    ...collectionSpeedSearch
  } = useCollectionSpeedSearch({
    collection: props.collection,
    selectionManager: props.selectionManager,
    stickySearch: props.stickySearch,
    keyboardDelegate: new TreeKeyboardDelegate(
      props.collection,
      props.disabledKeys,
      ref
    ),
    // TODO: maybe allow control over speed search via other props
  });

  // Speed search is cleared on "Enter" key. Alternatively we could wrap onAction and onToggle props
  // but this seemed more reasonable
  // NOTE: It may make sense for this behaviour to be pulled up to useCollectionSpeedSearch.
  const { keyboardProps: speedSearchKeyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (["Enter", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        speedSearch.setSearchTerm("");
        speedSearch.setActive(false);
      }
    },
  });

  const { treeProps, ...selectableTree } = useSelectableTree(
    { ...props, keyboardDelegate: keyboardDelegate, selectionManager },
    ref
  );

  return {
    treeProps: mergeProps(treeProps, containerProps, speedSearchKeyboardProps),
    ...collectionSpeedSearch,
    ...selectableTree,
  };
}
