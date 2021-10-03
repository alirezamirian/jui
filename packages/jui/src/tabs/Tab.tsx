import { useTab } from "@react-aria/tabs";
import { TabListState } from "@react-stately/tabs";
import { Node } from "@react-types/shared";
import { StyledDefaultTab } from "jui/tabs/StyledDefaultTab";
import React from "react";

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
  Component?: typeof StyledDefaultTab;
};

export const Tab = <T extends object>({
  state,
  item,
  focusable,
  active,
  Component = StyledDefaultTab,
}: TabProps<T>): React.ReactElement => {
  const { key, rendered } = item;
  const ref = React.useRef(null);
  const {
    tabProps: {
      /**
       * by extracting out tabIndex, all keyboard support of the tabs is disabled, since we prevent the tab from being
       * focusable.
       */
      tabIndex,
      ...tabProps
    },
  } = useTab({ key }, state, ref);
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
};
