import { Tabs, TabsProps } from "jui/tabs";
import { StyledEditorTab } from "jui/tabs/EditorTabs/StyledEditorTab";
import { StyledEditorTabs } from "jui/tabs/EditorTabs/StyledEditorTabs";
import React from "react";

export type EditorTabsProps<T extends object> = Omit<
  TabsProps<T>,
  "TabComponent" | "TabsComponent" | "focusable"
>;

export const EditorTabs = <T extends object>(props: EditorTabsProps<T>) => (
  <Tabs
    {...props}
    TabComponent={StyledEditorTab}
    TabsComponent={StyledEditorTabs}
    focusable={false}
  />
);
