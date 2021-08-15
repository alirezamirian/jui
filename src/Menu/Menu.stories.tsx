import { Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import React from "react";
import { Divider, DividerItem } from "../Collections/Divider";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { styledComponentsControlsExclude } from "../story-helpers";
import { Menu } from "./Menu";
import { MenuItemLayout } from "./MenuItemLayout";

export default {
  title: "Menu",
  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
    component: Menu, // doesn't work for some reason.
  },
} as Meta;

export const Static = () => {
  return (
    <Menu disabledKeys={["jumpToExternalEditor"]}>
      <Item textValue="Cut">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/menu-cut"} />}
          content="Cut"
          shortcut={"⌘X"}
        />
      </Item>
      <Item textValue="Copy">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/copy"} />}
          content="Copy"
          shortcut={"⌘C"}
        />
      </Item>
      <Item textValue="Paste">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/menu-paste"} />}
          content="Paste"
          shortcut={"⌘V"}
        />
      </Item>
      <Divider />
      <Item>Reformat Code</Item>
      <Item textValue="Optimize Imports">
        <MenuItemLayout content="Optimize Imports" shortcut={"⌃⌥O"} />
      </Item>
      <Item textValue="Delete">
        <MenuItemLayout content="Delete" shortcut={"⌫"} />
      </Item>
      <Divider />
      <Item textValue="Compare with...">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/diff"} />}
          content="Compare with..."
        />
      </Item>
      <Divider />
      <Item key="jumpToExternalEditor" textValue="Jump to external editor">
        <MenuItemLayout content="Jump to external editor" shortcut={"⌥⌘F4"} />
      </Item>
    </Menu>
  );
};

type MenuItem = {
  title: string;
  icon?: string;
  shortcut?: string;
  subItems?: MenuItem[];
};
const items: Array<MenuItem | DividerItem> = [
  {
    title: "View Mode",
    subItems: [
      {
        title: "Dock Pinned",
      },
      {
        title: "Dock Unpinned",
      },
      {
        title: "Dock Undock",
      },
      {
        title: "Float",
      },
      {
        title: "Window",
      },
    ],
  },
  new DividerItem(),
  {
    title: "Group tabs",
  },
];

export const Nested = () => {
  const renderItem = (item: MenuItem | DividerItem) => {
    if (item instanceof DividerItem) {
      return <Divider key={item.key} />;
    }
    return (
      <Item key={item.title} childItems={item.subItems?.map(renderItem)}>
        <MenuItemLayout content={item.title} />
      </Item>
    );
  };
  return <Menu items={items}>{renderItem}</Menu>;
};
