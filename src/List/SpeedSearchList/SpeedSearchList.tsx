import React, { useRef } from "react";
import { StyledList } from "../StyledList";
import { BasicListProps } from "../BasicList/BasicList";
import { useSpeedSearchList } from "./useSpeedSearchList";
import { SpeedSearchContainer } from "../../SpeedSearch/SpeedSearchContainer";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { listItemRenderer } from "../listItemRenderer";
import { useListState } from "../useListState";
import { BasicListItem } from "../BasicList/BasicListItem";

interface ListProps<T extends object> extends BasicListProps<T> {
  stickySearch?: boolean;
}

/**
 * TODO:
 *  - Override keyboard navigation (arrows, ctrl+A, etc.) when speed search is active.
 */
export function SpeedSearchList<T extends object>({
  disallowEmptySelection = true,
  alwaysShowListAsFocused = false,
  fillAvailableSpace = false,
  ...inputProps
}: ListProps<T>) {
  const props = { ...inputProps, disallowEmptySelection };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);

  const {
    listProps,
    searchPopupProps,
    focused,
    getHighlightedItem,
  } = useSpeedSearchList(props, state, ref);

  return (
    <SpeedSearchContainer
      as={StyledList}
      fillAvailableSpace={fillAvailableSpace}
      {...listProps}
      ref={ref}
    >
      <SpeedSearchPopup {...searchPopupProps} />
      {[...state.collection].map(
        listItemRenderer({
          item: (item) => (
            <BasicListItem
              key={item.key}
              item={getHighlightedItem(item)}
              state={state}
              listFocused={alwaysShowListAsFocused || focused}
            />
          ),
        })
      )}
    </SpeedSearchContainer>
  );
}
