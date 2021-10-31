import React, { useRef } from "react";
import { StyledList } from "../StyledList";
import { ListProps } from "../List";
import { useSpeedSearchList } from "./useSpeedSearchList";
import { SpeedSearchPopup } from "../../SpeedSearch/SpeedSearchPopup";
import { listItemRenderer } from "../listItemRenderer";
import { useListState } from "../useListState";
import { ListItem } from "../ListItem";
import { CollectionSpeedSearchContainer } from "../../CollectionSpeedSearch/CollectionSpeedSearchContainer";

interface SpeedSearchListProps<T extends object> extends ListProps<T> {
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
  onAction,
  ...inputProps
}: SpeedSearchListProps<T>) {
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
    <CollectionSpeedSearchContainer fillAvailableSpace={fillAvailableSpace}>
      <SpeedSearchPopup {...searchPopupProps} />
      <StyledList
        ref={ref}
        fillAvailableSpace={fillAvailableSpace}
        {...listProps}
      >
        {[...state.collection].map(
          listItemRenderer({
            item: (item) => (
              <ListItem
                key={item.key}
                item={getHighlightedItem(item)}
                state={state}
                listFocused={alwaysShowListAsFocused || focused}
                onAction={() => onAction?.(item.key)}
              />
            ),
          })
        )}
      </StyledList>
    </CollectionSpeedSearchContainer>
  );
}
