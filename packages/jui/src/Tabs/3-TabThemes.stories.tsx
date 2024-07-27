import { Meta, StoryObj } from "@storybook/react";
import { PlatformIcon } from "../Icon";
import { DebuggerTabContent } from "./DebuggerTabs/DebuggerTabContent";
import { EditorTabContent } from "./EditorTabs/EditorTabContent";
import { EditorTabs, EditorTabsProps } from "./EditorTabs/EditorTabs";
import { DebuggerTabs } from "./DebuggerTabs/DebuggerTabs";
import { Tabs, TabsProps } from "./Tabs";
import { TabContentLayout } from "./TabContentLayout";
import { ToolWindowTabs } from "./ToolWindowTabs/ToolWindowTabs";
import React from "react";
import { Item } from "../Collections";

type StoryProps<T extends TabsProps<unknown> = TabsProps<unknown>> = Pick<
  T,
  "active" | "defaultSelectedKey"
>;

export default {
  title: "Components/Tabs/Tab Themes",
  component: Tabs,
  parameters: {
    controls: { exclude: "TabComponent" },
  },
} as Meta;

export const EditorTheme: StoryObj<StoryProps> = {
  render: (props) => {
    return (
      <EditorTabs {...props} items={editorTabs} active>
        {(tab: (typeof editorTabs)[number]) => (
          <Item key={tab.title} textValue={tab.title}>
            <EditorTabContent
              icon={<PlatformIcon icon={tab.icon} />}
              title={tab.title}
              pinned={tab.pinned}
            />
          </Item>
        )}
      </EditorTabs>
    );
  },
};
export const DebuggerTheme: StoryObj<StoryProps> = {
  render: (props) => {
    return (
      <DebuggerTabs {...props} items={debuggerTabs}>
        {(tab: (typeof debuggerTabs)[number]) => (
          <Item key={tab.title} textValue={tab.title}>
            <DebuggerTabContent
              icon={tab.icon && <PlatformIcon icon={tab.icon} />}
              title={tab.title}
            />
          </Item>
        )}
      </DebuggerTabs>
    );
  },
};
export const ToolWindowTheme: StoryObj<StoryProps> = {
  render: (props) => {
    return (
      <ToolWindowTabs {...props} items={toolWindowTabs}>
        {(tab: (typeof toolWindowTabs)[number]) => (
          <Item key={tab.title} textValue={tab.title}>
            <TabContentLayout
              startIcon={<PlatformIcon icon={tab.icon} />}
              title={tab.title}
            />
          </Item>
        )}
      </ToolWindowTabs>
    );
  },
};
const editorTabs = [
  {
    title: "Tabs.tsx",
    pinned: true,
    icon: "fileTypes/javaScript",
  },
  {
    title: "Tabs.stories.tsx",
    pinned: false,
    icon: "fileTypes/javaScript",
  },
  {
    title: "index.ts",
    pinned: false,
    icon: "fileTypes/javaScript",
  },
  {
    title: "Tabs.test.ts",
    pinned: false,
    icon: "fileTypes/javaScript",
  },
];
const toolWindowTabs = [
  {
    title: "Project",
    icon: "nodes/project",
  },
  {
    title: "Project Files",
    icon: "nodes/folder",
  },
  {
    title: "Tests",
    icon: "scope/tests",
  },
];
const debuggerTabs = [
  {
    title: "Console",
    icon: "debugger/console",
  },
  {
    title: "Frames",
    icon: null,
  },
  {
    title: "Variables | Coroutines | idea.log",
    icon: null,
  },
];
