import { AriaListBoxProps } from "@react-types/listbox";
import { AsyncLoadable, Node } from "@react-types/shared";
import React, { ForwardedRef, Key } from "react";
import { useList } from "./useList";
import { ListItem } from "./ListItem";
import { StyledList } from "./StyledList";
import { useListState } from "./useListState";
import { filterDOMProps, useObjectRef } from "@react-aria/utils";

import { CollectionRefProps } from "@intellij-platform/core/Collections/useCollectionRef";
import { Virtualizer } from "@react-aria/virtualizer";
import { useListVirtualizer } from "@intellij-platform/core/List/useListVirtualizer";
import { ListContext } from "@intellij-platform/core/List/ListContext";

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

    /**
     * Useful when list items have a custom height, to hint layout calculation logic about the item height which
     * increases rendering efficiency and also prevents flash of items with wrong height.
     */
    estimatedItemHeight?: number;

    className?: string;
  };

/**
 * List view
 */
export const List = React.forwardRef(function List<T extends object>(
  {
    allowEmptySelection = false,
    fillAvailableSpace = false,
    estimatedItemHeight,
    className,
    ...inputProps
  }: ListProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const props: AriaListBoxProps<T> & CollectionRefProps = {
    ...inputProps,
    disallowEmptySelection: !allowEmptySelection,
  };
  const ref = useObjectRef(forwardedRef);
  const state = useListState(props);
  const { listProps, listContext } = useList(
    {
      ...props,
      isVirtualized: true,
    },
    state,
    ref
  );

  const {
    virtualizerProps: { children: renderNode, ...virtualizerProps },
  } = useListVirtualizer({
    state,
    estimatedItemHeight,
    renderItem: (item) => <ListItem key={item.key} item={item} />,
  });

  return (
    <ListContext.Provider value={listContext}>
      <StyledList
        as={Virtualizer<Node<any>, any>}
        {...virtualizerProps}
        {...listProps}
        {...filterDOMProps(props, { labelable: true })}
        fillAvailableSpace={fillAvailableSpace}
        className={className}
        ref={ref}
      >
        {renderNode}
      </StyledList>
    </ListContext.Provider>
  );
});
