import React, { ForwardedRef } from "react";
import { AriaListBoxOptions, AriaListBoxProps } from "@react-aria/listbox";
import { useListState } from "@react-stately/list";
import { StatelessListBox } from "@intellij-platform/core/Dropdown/StatelessListBox";
import { CollectionFocusProxyProps } from "@intellij-platform/core/Collections";

export interface ListBoxProps<T extends object>
  extends AriaListBoxProps<T>,
    CollectionFocusProxyProps,
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

  return <StatelessListBox state={state} ref={forwardedRef} {...props} />;
});
