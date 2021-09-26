import { usePress } from "@react-aria/interactions";
import { useSelectableItem } from "@react-aria/selection";
import { mergeProps } from "@react-aria/utils";
import { SelectionManager } from "@react-stately/selection";
import { Node } from "@react-types/shared";
import { Key, RefObject } from "react";

export function useTreeNode<T>({
  item,
  ref,
  selectionManager,
  disabled,
  toggleKey,
  onAction,
}: {
  item: Node<T>;
  ref: RefObject<HTMLElement>;
  disabled: boolean;
  toggleKey: (key: Key) => void;
  onAction?: (key: Key) => void;
  selectionManager: SelectionManager;
}) {
  const {
    pressProps: { onKeyDown, ...pressProps },
  } = usePress({
    ...useSelectableItem({
      key: item.key,
      ref,
      selectionManager,
      isVirtualized: false,
    }).itemProps,
    isDisabled: disabled,
    preventFocusOnPress: false,
  });

  const onDoubleClick = () => {
    if (item.hasChildNodes) {
      toggleKey(item.key);
    } else {
      onAction?.(item.key);
    }
  };

  return {
    treeNodeProps: mergeProps(pressProps, { onDoubleClick }),
  };
}
