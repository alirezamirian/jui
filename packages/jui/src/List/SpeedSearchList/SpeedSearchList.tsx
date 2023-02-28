import React, { useRef } from "react";
import { AriaListBoxProps } from "@react-types/listbox";
import {
  CollectionSpeedSearchContainer,
  CollectionSpeedSearchContext,
  SpeedSearchItemHighlightsProvider,
} from "@intellij-platform/core/CollectionSpeedSearch";
import {
  SpeedSearchProps,
  SpeedSearchPopup,
} from "@intellij-platform/core/SpeedSearch";

import { StyledList } from "../StyledList";
import { ListProps } from "../List";
import { useSpeedSearchList } from "./useSpeedSearchList";
import { listItemRenderer } from "../listItemRenderer";
import { useListState } from "../useListState";
import { ListItem } from "../ListItem";

interface SpeedSearchListProps<T extends object>
  extends ListProps<T>,
    SpeedSearchProps {}

/**
 * TODO:
 *  - Override keyboard navigation (arrows, ctrl+A, etc.) when speed search is active.
 */
export function SpeedSearchList<T extends object>({
  allowEmptySelection = false,
  alwaysShowAsFocused = false,
  fillAvailableSpace = false,
  onAction,
  ...inputProps
}: SpeedSearchListProps<T>) {
  const props: AriaListBoxProps<T> = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useRef<HTMLUListElement>(null);
  const state = useListState(props);

  const { listProps, searchPopupProps, focused, speedSearchContextValue } =
    useSpeedSearchList(props, state, ref);

  return (
    <CollectionSpeedSearchContainer fillAvailableSpace={fillAvailableSpace}>
      <CollectionSpeedSearchContext.Provider value={speedSearchContextValue}>
        <SpeedSearchPopup {...searchPopupProps} />
        <StyledList
          ref={ref}
          fillAvailableSpace={fillAvailableSpace}
          {...listProps}
        >
          {[...state.collection].map(
            listItemRenderer({
              item: (item) => (
                <SpeedSearchItemHighlightsProvider itemKey={item.key}>
                  <ListItem
                    key={item.key}
                    item={item}
                    state={state}
                    listFocused={alwaysShowAsFocused || focused}
                    onAction={() => onAction?.(item.key)}
                  />
                </SpeedSearchItemHighlightsProvider>
              ),
            })
          )}
        </StyledList>
      </CollectionSpeedSearchContext.Provider>
    </CollectionSpeedSearchContainer>
  );
}
