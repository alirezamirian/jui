import { Meta } from "@storybook/react";
import { MenuItemLayout, PlatformIcon } from "jui";
import React from "react";
import { Item, TabContentLayout, TabItem, TabsProps } from ".";
import { Tabs } from "./Tabs";

type StoryProps<T extends TabsProps<unknown> = TabsProps<unknown>> = Pick<
  T,
  "active" | "focusable" | "defaultSelectedKey"
>;

export default {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    controls: { exclude: "TabComponent" },
  },
} as Meta;

export const StaticItems: React.FC<StoryProps> = (props) => {
  return (
    <Tabs {...props}>
      <Item>Tab 1</Item>
      <Item>Tab 2</Item>
      <Item>Tab 3</Item>
    </Tabs>
  );
};

export const DynamicItems: React.FC<StoryProps> = (props) => {
  return (
    <Tabs
      {...props}
      items={["Tab 1", "Tab 2", "Tab 3"].map((title) => ({ title }))}
    >
      {({ title }: { title: string }) => <Item key={title}>{title}</Item>}
    </Tabs>
  );
};

export const Overflow: React.FC<StoryProps> = (props) => {
  const tabs = Array(10)
    .fill(null)
    .map((_, index) => ({
      title: `Big tab title #${index}`,
      icon: "nodes/folder",
    }));
  return (
    <div style={{ maxWidth: 800 }}>
      <Tabs {...props} items={tabs}>
        {(tab) => {
          const icon = <PlatformIcon icon={tab.icon} />;
          return (
            <TabItem
              key={tab.title}
              textValue={tab.title}
              inOverflowMenu={
                <MenuItemLayout content={tab.title} icon={icon} />
              }
            >
              <TabContentLayout startIcon={icon} title={tab.title} />
            </TabItem>
          );
        }}
      </Tabs>
    </div>
  );
};
