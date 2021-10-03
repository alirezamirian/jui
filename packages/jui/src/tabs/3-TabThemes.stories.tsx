import { Meta } from "@storybook/react";
import { PlatformIcon } from "jui";
import { DebuggerTabContent } from "jui/tabs/DebuggerTabs/DebuggerTabContent";
import { EditorTabContent } from "jui/tabs/EditorTabs/EditorTabContent";
import { EditorTabs, EditorTabsProps } from "jui/tabs/EditorTabs/EditorTabs";
import { DebuggerTabs, Item, Tabs, TabsProps } from "jui/tabs/index";
import { TabContentLayout } from "jui/tabs/TabContentLayout";
import { ToolWindowTabs } from "jui/tabs/ToolWindowTabs/ToolWindowTabs";
import React from "react";

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

export const EditorTheme: React.FC<StoryProps<EditorTabsProps<any>>> = (
  props
) => {
  return (
    <EditorTabs {...props} items={editorTabs} active>
      {renderEditorTab}
    </EditorTabs>
  );
};
export const DebuggerTheme: React.FC<StoryProps> = (props) => {
  return (
    <DebuggerTabs {...props} items={debuggerTabs}>
      {renderDebuggerTab}
    </DebuggerTabs>
  );
};
export const ToolWindowTheme: React.FC<StoryProps> = (props) => {
  return (
    <ToolWindowTabs {...props} items={toolWindowTabs}>
      {renderToolWindowTabs}
    </ToolWindowTabs>
  );
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
const renderEditorTab = (tab: typeof editorTabs[number]) => (
  <Item key={tab.title} textValue={tab.title}>
    <EditorTabContent
      icon={<PlatformIcon icon={tab.icon} />}
      title={tab.title}
      pinned={tab.pinned}
      onUnpin={() => {
        console.log("onUnpin");
      }}
      onClose={() => {
        console.log("onClose");
      }}
    />
  </Item>
);
const renderDebuggerTab = (tab: typeof debuggerTabs[number]) => (
  <Item key={tab.title} textValue={tab.title}>
    <DebuggerTabContent
      icon={tab.icon && <PlatformIcon icon={tab.icon} />}
      title={tab.title}
    />
  </Item>
);
const renderToolWindowTabs = (tab: typeof toolWindowTabs[number]) => (
  <Item key={tab.title} textValue={tab.title}>
    <TabContentLayout
      startIcon={<PlatformIcon icon={tab.icon} />}
      title={tab.title}
    />
  </Item>
);
