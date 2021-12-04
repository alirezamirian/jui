import { Tabs, TabsProps } from "@intellij-platform/core/tabs/Tabs";
import { StyledDebuggerTab } from "./StyledDebuggerTab";
import React from "react";

type DebuggerTabsProps<T extends object> = Omit<
  TabsProps<T>,
  "TabComponent" | "focusable"
>;

export const DebuggerTabs = <T extends object>(props: DebuggerTabsProps<T>) => (
  <Tabs {...props} TabComponent={StyledDebuggerTab} focusable={false} />
);
