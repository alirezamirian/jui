import { useTab } from "@react-aria/tabs";
import { TabListState } from "@react-stately/tabs";
import { Node } from "@react-types/shared";
import { StyledDefaultTab } from "./StyledDefaultTab";
import React, { ForwardedRef, forwardRef, RefObject, useEffect } from "react";
import useForwardedRef from "@intellij-platform/core/utils/useForwardedRef";

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
  Component?: typeof StyledDefaultTab;
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
  const ref = useForwardedRef(forwardedRef);
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
