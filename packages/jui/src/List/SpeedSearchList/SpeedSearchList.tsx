import React, { ForwardedRef } from "react";
import { AriaListBoxProps } from "@react-types/listbox";
import {
  CollectionSpeedSearchContainer,
  CollectionSpeedSearchContext,
  SpeedSearchItemHighlightsProvider,
} from "@intellij-platform/core/CollectionSpeedSearch";
import {
  SpeedSearchProps,
  SpeedSearchPopup,
  SpeedSearch,
} from "@intellij-platform/core/SpeedSearch";

import { StyledList } from "../StyledList";
import { ListProps } from "../List";
import { useSpeedSearchList } from "./useSpeedSearchList";
import { listItemRenderer } from "../listItemRenderer";
import { useListState } from "../useListState";
import { ListItem } from "../ListItem";
import { CollectionRefProps } from "@intellij-platform/core/Collections/useCollectionRef";
import { useObjectRef } from "@react-aria/utils";

export interface SpeedSearchListProps<T extends object>
  extends ListProps<T>,
    SpeedSearchProps {}

/**
 * List component with {@link SpeedSearch}, which is a more advanced version of typeahead.
 */
export const SpeedSearchList = React.forwardRef(function SpeedSearchList<
  T extends object
>(
  {
    allowEmptySelection = false,
    alwaysShowAsFocused = false,
    fillAvailableSpace = false,
    onAction,
    ...inputProps
  }: SpeedSearchListProps<T>,
  forwardedRef: ForwardedRef<HTMLUListElement>
) {
  const props: AriaListBoxProps<T> & CollectionRefProps = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useObjectRef(forwardedRef);
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
});
