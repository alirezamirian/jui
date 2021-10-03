import { Meta } from "@storybook/react";
import React from "react";
import { Item, TabsProps } from ".";
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
