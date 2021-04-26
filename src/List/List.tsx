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

export function List<T extends object>({
  disallowEmptySelection = true,
  alwaysShowListAsFocused = false,
  fillAvailableSpace = false,
  ...inputProps
}: ListProps<T>) {
  const props = { ...inputProps, disallowEmptySelection };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);
  const [focusWithin, setFocusWithin] = useState(false);
  const { listProps, searchPopupProps, matches } = useList(props, state, ref);

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });

  return (
    <StyledListWithSpeedSearch
      fillAvailableSpace={fillAvailableSpace}
      {...mergeProps(listProps, focusWithinProps)}
      ref={ref}
    >
      <SpeedSearchPopup {...searchPopupProps} />
      {[...state.collection].map((item) => (
        <ListItem
          key={item.key}
          item={item}
          state={state}
          highlightedRanges={matches.get(item.key) || null}
          listFocused={alwaysShowListAsFocused || focusWithin}
        />
      ))}
    </StyledListWithSpeedSearch>
  );
}
