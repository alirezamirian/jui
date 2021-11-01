import { ItemProps } from "@react-types/shared";
import { Item } from "@react-stately/collections";
import React from "react";

export interface TabItemProps extends ItemProps<never> {
  /**
   * Determines how the tab item should look when rendered as a menu item in overflow menu.
   * If not passed, `textValue` will be used.
   * @example
   * <TabItem
   *   key={tab.id}
   *   textValue={tab.title}
   *   inOverflowMenu={
   *     <MenuItemLayout content={tab.title} icon={icon} />
   *   }
   *  >
   *   <TabContentLayout startIcon={icon} title={tab.title} />
   * </TabItem>
   */
  inOverflowMenu?: React.ReactNode;
}

/**
 * Same as {@link Item}, but allows for specifying the tab content for when it's rendered in the overflow menu item.
 */
export const TabItem: (props: TabItemProps) => React.ReactElement = Item;
