import { Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import React from "react";
import { Divider } from "../Collections/Divider";
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
      <Item>
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/menu-cut"} />}
          content="Cut"
          shortcut={"⌘X"}
        />
      </Item>
      <Item>
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/copy"} />}
          content="Copy"
          shortcut={"⌘C"}
        />
      </Item>
      <Item>
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/menu-paste"} />}
          content="Paste"
          shortcut={"⌘V"}
        />
      </Item>
      <Divider />
      <Item>Reformat Code</Item>
      <Item>
        <MenuItemLayout content="Optimize Imports" shortcut={"⌃⌥O"} />
      </Item>
      <Item>
        <MenuItemLayout content="Delete" shortcut={"⌫"} />
      </Item>
      <Divider />
      <Item>
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/diff"} />}
          content="Compare with..."
        />
      </Item>
      <Divider />
      <Item key="jumpToExternalEditor">
        <MenuItemLayout content="Jump to external editor" shortcut={"⌥⌘F4"} />
      </Item>
    </Menu>
  );
};
