import React, { ForwardedRef } from "react";
import { AriaListBoxOptions, AriaListBoxProps } from "@react-aria/listbox";
import { useListState } from "@react-stately/list";
import { StatelessListBox } from "@intellij-platform/core/Dropdown/StatelessListBox";
import {
  CollectionRefProps,
  useCollectionRef,
} from "@intellij-platform/core/Collections/useCollectionRef";

export interface ListBoxProps<T extends object>
  extends AriaListBoxProps<T>,
    CollectionRefProps,
    Pick<
      AriaListBoxOptions<T>,
      "shouldFocusOnHover" | "shouldUseVirtualFocus"
    > {
  minWidth?: number;
}

export const ListBox = React.forwardRef(function ListBox<T extends object>(
  { minWidth, ...props }: ListBoxProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const state = useListState({
    selectionBehavior: "toggle",
    selectionMode: "single",
    ...props,
  });
  useCollectionRef(props, state);

  return <StatelessListBox state={state} ref={forwardedRef} {...props} />;
});
