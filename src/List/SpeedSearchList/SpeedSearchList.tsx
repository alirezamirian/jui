import React, { useRef } from "react";
import { ListItem } from "../ListItem";
import { StyledList } from "../StyledList";
import { BasicListProps } from "../BasicList/BasicList";
import { useSpeedSearchList } from "./useSpeedSearchList";
import { SpeedSearchContainer } from "../../SpeedSearch/SpeedSearchContainer";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { useListState } from "../useListState";

interface ListProps<T extends object> extends BasicListProps<T> {
  stickySearch?: boolean;
}

const StyledListWithSpeedSearch = SpeedSearchContainer.withComponent(
  StyledList
);

export function SpeedSearchList<T extends object>({
  disallowEmptySelection = true,
  alwaysShowListAsFocused = false,
  fillAvailableSpace = false,
  ...inputProps
}: ListProps<T>) {
  const props = { ...inputProps, disallowEmptySelection };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);

  const { listProps, searchPopupProps, matches, focused } = useSpeedSearchList(
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
