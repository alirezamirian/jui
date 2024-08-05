import React, { useContext } from "react";
import { Node } from "@react-types/shared";
import { usePress } from "@react-aria/interactions";
import { useSelectableItem } from "@intellij-platform/core/selection";
import { ItemStateContext } from "@intellij-platform/core/Collections";
import { StyledListItem } from "./StyledListItem";
import { ListContext } from "@intellij-platform/core/List/ListContext";

export interface ListItemProps<T> {
  item: Node<T>;
  children?: React.ReactNode;
}

export function ListItem<T>({ item, children }: ListItemProps<T>) {
  const { state, focused: listFocused, onAction } = useContext(ListContext)!;
  const ref = React.useRef(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  const { itemProps } = useSelectableItem({
    key: item.key,
    ref,
    onAction: () => onAction?.(item.key),
    selectionManager: state.selectionManager,
  });

  return (
    <StyledListItem
      containerFocused={listFocused}
      selected={isSelected}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      aria-label={item["aria-label"]}
      {...itemProps}
      ref={ref}
    >
      <ItemStateContext.Provider
        value={{
          isDisabled,
          isSelected,
          isContainerFocused: listFocused,
          node: item,
        }}
      >
        {children || item.rendered}
      </ItemStateContext.Provider>
    </StyledListItem>
  );
}
