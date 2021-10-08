import { useTabList } from "@react-aria/tabs";
import { mergeProps } from "@react-aria/utils";
import { useTabListState } from "@react-stately/tabs";
import { AriaTabListProps } from "@react-types/tabs";
import { StyledHorizontalOverflowShadows } from "jui/tabs/StyledHorizontalOverflowShadows";
import { useIsScrolled } from "jui/tabs/useIsScrolled";
import React from "react";
import { StyledDefaultTab } from "./StyledDefaultTab";
import { StyledDefaultTabs } from "./StyledDefaultTabs";
import { Tab } from "./Tab";

export type TabsProps<T> = Omit<AriaTabListProps<T>, "orientation"> & {
  /**
   * whether tabs should be focusable or not. By default, following the Intellij Platform implementation, tabs are
   * not focusable and therefore lack the keyboard accessibility support specified in WAI-ARIA.
   * You can change this default behaviour and make the tabs keyboard accessible by passing `focusable`.
   * focus styles are not perfect at the moment, since it's not considered an important feature.
   * @default false
   */
  focusable?: boolean;

  /**
   * enables "active" style on tabs. Is usually related to a container having focus.
   */
  active?: boolean;

  TabsComponent?: typeof StyledDefaultTabs;
  /**
   *
   */
  TabComponent?: typeof StyledDefaultTab;
};

/**
 *
 * TODO: add support for overflow:
 *  - have vertical scroll also scroll tabs
 *  - arrow down button with overflow menu
 *  - add support for re-reordering tabs.
 */
export const Tabs = <T extends object>({
  focusable,
  active,
  TabComponent,
  TabsComponent = StyledDefaultTabs,
  ...props
}: TabsProps<T>): React.ReactElement => {
  const state = useTabListState(props);
  const ref = React.useRef(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { scrolledIndicatorProps, isScrolled } = useIsScrolled({ ref });

  return (
    <StyledHorizontalOverflowShadows
      hasOverflowAtStart={isScrolled.left}
      hasOverflowAtEnd={isScrolled.right}
    >
      <StyledDefaultTabs
        {...mergeProps(tabListProps, scrolledIndicatorProps)}
        ref={ref}
      >
        {[...state.collection].map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            focusable={focusable}
            active={active}
            Component={TabComponent}
          />
        ))}
      </StyledDefaultTabs>
    </StyledHorizontalOverflowShadows>
  );
};
