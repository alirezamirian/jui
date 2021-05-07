import { AriaListBoxProps } from "@react-types/listbox";
import React, { useRef } from "react";
import { useBasicList } from "./useBasicList";
import { BasicListItem } from "./BasicListItem";
import { StyledList } from "../StyledList";
import { listItemRenderer } from "../listItemRenderer";
import { useListState } from "../useListState";

export interface BasicListProps<T extends object> extends AriaListBoxProps<T> {
  /**
   * fills the available horizontal or vertical space, when rendered in a flex container.
   */
  fillAvailableSpace?: boolean;
  /**
   * By default, if list is not focused, it shows a different style on the selected item,
   * which acts as a visual clue for list's focus state. This behaviour can be suppressed by setting
   * `alwaysShowListAsFocused` to `true`. One use case is in master-detail views where you don't
   * want the list to appear as blurred, when interacting with the details view of the selected
   * list item. Note that in such use cases, there won't be any visual clue to distinguish focused
   * state of the link, which is not great from UX perspective, but it's kept like this to match
   * Jetbrains UI behaviour.
   */
  alwaysShowListAsFocused?: boolean;
}

/**
 * List view with speedSearch instead of default typeahead.
 * TODO:
 *  - Support virtualization
 *  - Support custom rendering
 *  -
 */
export function BasicList<T extends object>({
  disallowEmptySelection = true,
  alwaysShowListAsFocused = false,
  fillAvailableSpace = false,
  ...inputProps
}: BasicListProps<T>) {
  const props = { ...inputProps, disallowEmptySelection };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);
  const { listProps, focused } = useBasicList(props, state, ref);

  return (
    <StyledList
      fillAvailableSpace={fillAvailableSpace}
      {...listProps}
      ref={ref}
    >
      {[...state.collection].map(
        listItemRenderer({
          item: (item) => (
            <BasicListItem
              key={item.key}
              item={item}
              state={state}
              listFocused={alwaysShowListAsFocused || focused}
            />
          ),
        })
      )}
    </StyledList>
  );
}
