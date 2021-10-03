import { Tabs, TabsProps } from "jui/tabs";
import { StyledToolWindowTab } from "jui/tabs/ToolWindowTabs/StyledToolWindowTab";
import React from "react";

type ToolWindowTabsProps<T extends object> = Omit<
  TabsProps<T>,
  "TabComponent" | "focusable"
>;

export const ToolWindowTabs = <T extends object>(
  props: ToolWindowTabsProps<T>
) => <Tabs {...props} TabComponent={StyledToolWindowTab} focusable={false} />;
