import { useTab } from "@react-aria/tabs";
import { TabListState } from "@react-stately/tabs";
import { Node } from "@react-types/shared";
import { StyledDefaultTab, TabComponentProps } from "./StyledDefaultTab";
import React, { ComponentType, ForwardedRef, forwardRef } from "react";
import { useObjectRef } from "@react-aria/utils";

type TabProps<T extends object> = {
  state: TabListState<object>;
  item: Node<T>;
  /**
   * {@see TabsProps#focusable}
   */
  focusable?: boolean;
  /**
   * {@see TabsProps#active}
   */
  active?: boolean;
  shouldSelectOnPressUp?: boolean;
  Component?: ComponentType<TabComponentProps>;
};

export const Tab = forwardRef(function Tab<T extends object>(
  {
    state,
    item,
    focusable,
    active,
    shouldSelectOnPressUp,
    Component = StyledDefaultTab,
  }: TabProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
): React.ReactElement {
  const { key, rendered } = item;
  const ref = useObjectRef(forwardedRef);
  const {
    tabProps: {
      /**
       * by extracting out tabIndex, all keyboard support of the tabs is disabled, since we prevent the tab from being
       * focusable.
       */
      tabIndex,
      ...tabProps
    },
  } = useTab(
    {
      key,
      shouldSelectOnPressUp,
    },
    state,
    ref
  );
  const isSelected = state.selectedKey === key;
  const isDisabled = state.disabledKeys.has(key);

  return (
    <Component
      {...tabProps}
      tabIndex={focusable ? tabIndex : undefined}
      ref={ref}
      active={active}
      selected={isSelected}
      disabled={isDisabled}
    >
      {rendered}
    </Component>
  );
});
