import { AriaListBoxProps } from "@react-types/listbox";
import { AsyncLoadable } from "@react-types/shared";
import React, { ForwardedRef, Key } from "react";
import { useList } from "./useList";
import { ListItem } from "./ListItem";
import { StyledList } from "./StyledList";
import { listItemRenderer } from "./listItemRenderer";
import { useListState } from "./useListState";
import { useObjectRef } from "@react-aria/utils";
import { CollectionRefProps } from "@intellij-platform/core/Collections/useCollectionRef";

export type ListProps<T extends object> = Omit<
  Omit<AriaListBoxProps<T>, "disallowEmptySelection">,
  keyof AsyncLoadable
> &
  CollectionRefProps & {
    /**
     * fills the available horizontal or vertical space, when rendered in a flex container.
     */
    fillAvailableSpace?: boolean;
    /**
     * When true, shows the list in focused style, even when it's not focused. A common use case is when the list
     * is virtually focused. i.e. the focus is physically on some other element (like a search input) which handles
     * keyboard events as if the list was focused.
     * Another (maybe questionable) use case is master detail views, where the master view is shown as focused, even
     * when the details view has physical focus.
     */
    showAsFocused?: boolean;
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
export const List = React.forwardRef(function List<T extends object>(
  {
    allowEmptySelection = false,
    showAsFocused = false,
    fillAvailableSpace = false,
    onAction,
    ...inputProps
  }: ListProps<T>,
  forwardedRef: ForwardedRef<HTMLUListElement>
) {
  const props: AriaListBoxProps<T> & CollectionRefProps = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useObjectRef(forwardedRef);
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
              listFocused={showAsFocused || focused}
            />
          ),
        })
      )}
    </StyledList>
  );
});
