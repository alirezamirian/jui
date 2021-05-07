import { useCollectionSpeedSearch } from "../../CollectionSpeedSearch/useCollectionSpeedSearch";
import { SpeedSearchProps } from "../../SpeedSearch/useSpeedSearch";
import { SelectableTreeProps, useSelectableTree } from "../useSelectableTree";
import { TreeKeyboardDelegate } from "../TreeKeyboardDelegate";
import { RefObject } from "react";
import { mergeProps } from "@react-aria/utils";

interface Props<T> extends SpeedSearchProps, SelectableTreeProps<T> {}

export function useSpeedSearchTree<T>(
  props: Props<T>,
  ref: RefObject<HTMLElement>
) {
  const {
    containerProps,
    keyboardDelegate,
    selectionManager,
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
  const { treeProps, ...selectableTree } = useSelectableTree(
    { ...props, keyboardDelegate: keyboardDelegate, selectionManager },
    ref
  );

  return {
    treeProps: mergeProps(treeProps, containerProps),
    ...collectionSpeedSearch,
    ...selectableTree,
  };
}
