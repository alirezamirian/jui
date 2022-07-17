import { Node } from "@react-types/shared";
import { ListState } from "@react-stately/list";
import React from "react";
import { useSelectableItem } from "@intellij-platform/core/selection";
import { usePress } from "@react-aria/interactions";
import { StyledListItem } from "./StyledListItem";
import { ItemStateContext } from "@intellij-platform/core";

export interface ListItemProps<T> {
  listFocused: boolean;
  item: Node<T>;
  state: ListState<T>;
  onAction: () => void;
  children?: React.ReactNode;
}

export function ListItem<T>({
  listFocused,
  item,
  state,
  onAction,
  children,
}: ListItemProps<T>) {
  const ref = React.useRef(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  const { itemProps } = useSelectableItem({
    key: item.key,
    ref,
    onAction,
    selectionManager: state.selectionManager,
  });
  let { pressProps } = usePress({
    ...itemProps,
    isDisabled,
    preventFocusOnPress: false,
  });

  return (
    <StyledListItem
      containerFocused={listFocused}
      selected={isSelected}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      {...pressProps}
      ref={ref}
    >
      <ItemStateContext.Provider
        value={{
          isDisabled,
          isSelected,
          isFocused: listFocused,
          node: item,
        }}
      >
        {children || item.rendered}
      </ItemStateContext.Provider>
    </StyledListItem>
  );
}
