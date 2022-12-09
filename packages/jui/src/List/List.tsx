import { AriaListBoxProps } from "@react-types/listbox";
import { AsyncLoadable } from "@react-types/shared";
import React, { Key, useRef } from "react";
import { useList } from "./useList";
import { ListItem } from "./ListItem";
import { StyledList } from "./StyledList";
import { listItemRenderer } from "./listItemRenderer";
import { useListState } from "./useListState";

export type ListProps<T extends object> = Omit<
  Omit<AriaListBoxProps<T>, "disallowEmptySelection">,
  keyof AsyncLoadable
> & {
  /**
   * fills the available horizontal or vertical space, when rendered in a flex container.
   */
  fillAvailableSpace?: boolean;
  /**
   * By default, if list is not focused, it shows a different style on the selected item,
   * which acts as a visual clue for list's focus state. This behaviour can be suppressed by setting
   * `alwaysShowAsFocused` to `true`. One use case is in master-detail views where you don't
   * want the list to appear as blurred, when interacting with the details view of the selected
   * list item. Note that in such use cases, there won't be any visual clue to distinguish focused
   * state of the link, which is not great from UX perspective, but it's kept like this to match
   * Jetbrains UI behaviour.
   */
  alwaysShowAsFocused?: boolean;
  allowEmptySelection?: boolean;
  /**
   * Called when the action for the item should be triggered, which can be by double click or pressing Enter.
   * Enter not implemented yet :D
   */
  onAction?: (key: Key) => void;
};

/**
 * List view with speedSearch instead of default typeahead.
 * TODO:
 *  - Support virtualization
 *  - Support custom rendering
 *  -
 */
export function List<T extends object>({
  allowEmptySelection = false,
  alwaysShowAsFocused = false,
  fillAvailableSpace = false,
  onAction,
  ...inputProps
}: ListProps<T>) {
  const props: AriaListBoxProps<T> = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);
  const { listProps, focused } = useList(props, state, ref);

  return (
    <StyledList
      fillAvailableSpace={fillAvailableSpace}
      {...listProps}
      ref={ref}
    >
      {[...state.collection].map(
        listItemRenderer({
          item: (item) => (
            <ListItem
              key={item.key}
              item={item}
              state={state}
              onAction={() => onAction?.(item.key)}
              listFocused={alwaysShowAsFocused || focused}
            />
          ),
        })
      )}
    </StyledList>
  );
}
