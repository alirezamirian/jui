import React from "react";
import { Item, Section } from "@react-stately/collections";
import {
  Divider,
  DividerItem,
  MenuItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";

export type ExampleMenuItem =
  | {
      title: string;
      icon?: string;
      section?: boolean;
      shortcut?: string;
      subItems?: ExampleMenuItem[];
    }
  | DividerItem;
export const viewModeItems: Array<ExampleMenuItem> = [
  {
    title: "Undock",
  },
  {
    title: "Docked",
    subItems: [
      {
        title: "Pinned",
      },
      new DividerItem(),
      {
        title: "UnPinned",
      },
    ],
  },
  new DividerItem(),
  {
    title: "Float",
  },
  {
    title: "Window",
  },
];
export const renderItem = (item: ExampleMenuItem) => {
  if (item instanceof DividerItem) {
    return <Divider key={item.key} />;
  }
  if (item.section) {
    return (
      <Section key={item.title} title={item.title} items={item.subItems}>
        {renderItem}
      </Section>
    );
  }
  return (
    <Item key={item.title} textValue={item.title} childItems={item.subItems}>
      <MenuItemLayout
        icon={item.icon && <PlatformIcon icon={item.icon} />}
        content={item.title}
        shortcut={item.shortcut}
      />
    </Item>
  );
};
