import { useListState } from "@react-stately/list";
import React, { useRef, useState } from "react";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { ListItem } from "./ListItem";
import { StyledList } from "./StyledList";
import { JListProps } from "./JList";
import { useList } from "./useList";
import { SpeedSearchContainer } from "../SpeedSearch/SpeedSearchContainer";
import { SpeedSearchPopup } from "../SpeedSearch/SpeedSearchPopup";

interface ListProps<T extends object> extends JListProps<T> {
  stickySearch?: boolean;
}

const StyledListWithSpeedSearch = SpeedSearchContainer.withComponent(
  StyledList
);

/**
 * List view with speedSearch instead of default typeahead.
 * TODO:
 *  - Support virtualization
 *  - Support custom rendering
 *  - Fix click behaviour when multiselect and selectOnFocus is true (which is even an option so far)
 *  -
 */
export function List<T extends object>({
  disallowEmptySelection = true,
  alwaysShowListAsFocused = false,
  fillAvailableSpace = false,
  ...inputProps
}: ListProps<T>) {
  const props = { ...inputProps, disallowEmptySelection };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);
  const { listProps, searchPopupProps, matches, focused } = useList(
    props,
    state,
    ref
  );

  return (
    <StyledListWithSpeedSearch
      fillAvailableSpace={fillAvailableSpace}
      {...listProps}
      ref={ref}
    >
      <SpeedSearchPopup {...searchPopupProps} />
      {[...state.collection].map((item) => (
        <ListItem
          key={item.key}
          item={item}
          state={state}
          highlightedRanges={matches.get(item.key) || null}
          listFocused={alwaysShowListAsFocused || focused}
        />
      ))}
    </StyledListWithSpeedSearch>
  );
}
