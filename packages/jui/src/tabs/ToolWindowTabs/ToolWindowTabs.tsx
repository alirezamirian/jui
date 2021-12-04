import React from "react";
import { Tabs, TabsProps } from "@intellij-platform/core/tabs/Tabs";
import { StyledToolWindowTab } from "./StyledToolWindowTab";
import { StyledToolWindowTabs } from "./StyledToolWindowTabs";

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
