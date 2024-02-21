import { ListState } from "@react-stately/list";
import { SelectionManager } from "@react-stately/selection";
import { HTMLProps, Key, RefObject } from "react";
import { mergeProps } from "@react-aria/utils";
import { ListKeyboardDelegate } from "@react-aria/selection";
import {
  CollectionSpeedSearchContextValue,
  useCollectionSpeedSearch,
} from "@intellij-platform/core/CollectionSpeedSearch";
import { SpeedSearchProps } from "@intellij-platform/core/SpeedSearch";
import { SpeedSearchPopupProps } from "../../SpeedSearch/SpeedSearchPopup";
import { TextRange } from "../../TextRange";
import { ListProps, useList } from "../useList";

interface UseListProps
  extends Omit<ListProps, "keyboardDelegate" | "disallowTypeAhead">,
    Pick<SpeedSearchProps, "keepSearchActiveOnBlur"> {}

export function useSpeedSearchList<T>(
  props: UseListProps,
  listState: ListState<T>,
  ref: RefObject<HTMLElement>
): ReturnType<typeof useList<T>> & {
  searchPopupProps: SpeedSearchPopupProps;
  focused: boolean;
  selectionManager: SelectionManager;
  speedSearchContextValue: CollectionSpeedSearchContextValue;
  matches: Map<Key, TextRange[]>;
} {
  const { keepSearchActiveOnBlur } = props;

  const {
    speedSearch,
    selectionManager,
    keyboardDelegate,
    containerProps: speedSearchContainerProps,
    searchPopupProps,
    speedSearchContextValue,
  } = useCollectionSpeedSearch({
    collection: listState.collection,
    selectionManager: listState.selectionManager,
    keyboardDelegate: new ListKeyboardDelegate(
      listState.collection,
      listState.disabledKeys,
      ref
    ),
    keepSearchActiveOnBlur,
    ref,
  });
  const { listProps, ...otherOutputs } = useList(
    {
      ...props,
      disallowTypeAhead: true,
      keyboardDelegate,
    },
    { ...listState, selectionManager },
    ref
  );

  return {
    ...otherOutputs,
    listProps: mergeProps(listProps, speedSearchContainerProps),
    matches: speedSearch.matches,
    selectionManager,
    speedSearchContextValue,
    searchPopupProps,
  };
}
