import { useTabList } from "@react-aria/tabs";
import { useTabListState } from "@react-stately/tabs";
import { AriaTabListProps } from "@react-types/tabs";
import { Tab } from "jui/tabs/Tab";
import React from "react";
import { StyledDefaultTab } from "./StyledDefaultTab";
import { StyledTabs } from "./StyledTabs";

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

  // TabsComponent?: typeof StyledTabs;
  /**
   *
   */
  TabComponent?: typeof StyledDefaultTab;
};

/**
 *
 * TODO: add support for overflow:
 *  - scroll
 *  - shadows on ends
 *  - arrow down button with overflow menu
 * TODO: add support for re-reordering tabs.
 */
export const Tabs = <T extends object>({
  focusable,
  active,
  TabComponent,
  ...props
}: TabsProps<T>): React.ReactElement => {
  const state = useTabListState(props);
  const ref = React.useRef(null);
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <StyledTabs {...tabListProps} ref={ref}>
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
    </StyledTabs>
  );
};
