import { Tabs, TabsProps } from "jui/tabs";
import { StyledToolWindowTab } from "jui/tabs/ToolWindowTabs/StyledToolWindowTab";
import { StyledToolWindowTabs } from "jui/tabs/ToolWindowTabs/StyledToolWindowTabs";
import React from "react";

type ToolWindowTabsProps<T extends object> = Omit<
  TabsProps<T>,
  "TabComponent" | "TabsComponent" | "focusable"
>;

export const ToolWindowTabs = <T extends object>(
  props: ToolWindowTabsProps<T>
) => (
  <Tabs
    {...props}
    TabComponent={StyledToolWindowTab}
    TabsComponent={StyledToolWindowTabs}
    focusable={false}
  />
);
