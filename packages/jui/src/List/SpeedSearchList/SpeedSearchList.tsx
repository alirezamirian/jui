import React, { ForwardedRef } from "react";
import { AriaListBoxProps } from "@react-types/listbox";
import { filterDOMProps, useObjectRef } from "@react-aria/utils";
import { Virtualizer } from "@react-aria/virtualizer";
import { Node } from "@react-types/shared";

import {
  CollectionSpeedSearchContainer,
  CollectionSpeedSearchContext,
  SpeedSearchItemHighlightsProvider,
} from "@intellij-platform/core/CollectionSpeedSearch";
import {
  SpeedSearch,
  SpeedSearchPopup,
  SpeedSearchProps,
} from "@intellij-platform/core/SpeedSearch";
import { CollectionRefProps } from "@intellij-platform/core/Collections/useCollectionRef";

import { StyledList } from "../StyledList";
import { ListProps } from "../List";
import { useListState } from "../useListState";
import { ListItem } from "../ListItem";
import { ListContext } from "../ListContext";
import { useListVirtualizer } from "../useListVirtualizer";
import { useSpeedSearchList } from "./useSpeedSearchList";

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
    fillAvailableSpace = false,
    estimatedItemHeight,
    ...inputProps
  }: SpeedSearchListProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const props: AriaListBoxProps<T> & CollectionRefProps = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useObjectRef(forwardedRef);
  const state = useListState(props);

  const { listProps, listContext, searchPopupProps, speedSearchContextValue } =
    useSpeedSearchList({ ...props, isVirtualized: true }, state, ref);

  const {
    virtualizerProps: { children: renderNode, ...virtualizerProps },
  } = useListVirtualizer({
    state,
    estimatedItemHeight,
    renderItem: (item) => (
      <SpeedSearchItemHighlightsProvider itemKey={item.key}>
        <ListItem key={item.key} item={item} />
      </SpeedSearchItemHighlightsProvider>
    ),
  });

  return (
    <ListContext.Provider value={listContext}>
      <CollectionSpeedSearchContainer fillAvailableSpace={fillAvailableSpace}>
        <CollectionSpeedSearchContext.Provider value={speedSearchContextValue}>
          <SpeedSearchPopup {...searchPopupProps} />
          <StyledList
            as={Virtualizer<Node<any>, any, any>}
            ref={ref}
            $fillAvailableSpace={fillAvailableSpace}
            {...filterDOMProps(props, { labelable: true })}
            {...virtualizerProps}
            {...listProps}
          >
            {renderNode}
          </StyledList>
        </CollectionSpeedSearchContext.Provider>
      </CollectionSpeedSearchContainer>
    </ListContext.Provider>
  );
});
