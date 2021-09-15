import { Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import React from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { ActionToolbar } from "../ActionToolbar/ActionToolbar";
import { Divider, DividerItem } from "../Collections/Divider";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { styledComponentsControlsExclude } from "../story-helpers";
import { Menu } from "./Menu";
import { MenuItemLayout } from "./MenuItemLayout";
import { MenuTrigger } from "./MenuTrigger";

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

type MenuItem =
  | {
      title: string;
      icon?: string;
      shortcut?: string;
      subItems?: MenuItem[];
    }
  | DividerItem;
const viewModeItems: Array<MenuItem> = [
  {
    title: "Undock",
  },
  {
    title: "Docked",
    subItems: [
      {
        title: "Pinned",
      },
      {
        title: "UnPinned",
      },
    ],
  },

  {
    title: "Float",
  },
  {
    title: "Window",
  },
];
const items: Array<MenuItem> = [
  {
    title: "View Mode",
    subItems: viewModeItems,
  },
  new DividerItem(),
  {
    title: "Group tabs",
    icon: "toolwindows/documentation",
  },
];

export const Nested = () => {
  return (
    <Menu items={items} selectedKeys={["Pinned"]} autoFocus>
      {renderItem}
    </Menu>
  );
};

export const Position = ({ offsetRight = 230 }: { offsetRight: number }) => {
  return (
    <div style={{ paddingLeft: `calc(100% - ${offsetRight}px)` }}>
      <Menu items={items}>{renderItem}</Menu>
    </div>
  );
};

export const MenuWithTrigger = ({
  offsetRight,
  offsetBottom,
}: {
  offsetRight?: number;
  offsetBottom?: number;
}) => {
  return (
    <div
      style={{
        paddingLeft:
          offsetRight != undefined
            ? `calc(100% - ${offsetRight + 24}px)`
            : undefined,
        paddingTop:
          offsetBottom != undefined
            ? `calc(100% - ${offsetBottom + 24}px)`
            : undefined,
      }}
    >
      <ActionToolbar>
        <MenuTrigger
          renderMenu={({ menuProps, close }) => (
            <Menu
              items={items}
              {...menuProps}
              onAction={(key) => {
                console.log(key);
                close();
              }}
            >
              {renderItem}
            </Menu>
          )}
        >
          {(props, ref) => (
            <ActionButton {...props} ref={ref}>
              <PlatformIcon icon={"general/gearPlain"} />
            </ActionButton>
          )}
        </MenuTrigger>
      </ActionToolbar>
    </div>
  );
};

const renderItem = (item: MenuItem) => {
  if (item instanceof DividerItem) {
    return <Divider key={item.key} />;
  }
  return (
    <Item key={item.title} childItems={item.subItems}>
      <MenuItemLayout
        icon={item.icon && <PlatformIcon icon={item.icon} />}
        content={item.title}
        shortcut={item.shortcut}
      />
    </Item>
  );
};
