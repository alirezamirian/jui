import { Item } from "@react-stately/collections";
import { Meta, Story } from "@storybook/react";
import React, { ReactNode } from "react";
import { ActionButton } from "../ActionButton";
import { ActionToolbar } from "../ActionToolbar/ActionToolbar";
import { Divider, DividerItem } from "../Collections/Divider";
import { PlatformIcon } from "../Icon";
import { styledComponentsControlsExclude } from "../story-helpers";
import { Menu, MenuProps } from "./Menu";
import { MenuItemLayout } from "./MenuItemLayout";
import { MenuTrigger, MenuTriggerProps } from "./MenuTrigger";
import { ContextMenuContainer, styled } from "@intellij-platform/core";

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

const renderItem = (item: MenuItem) => {
  if (item instanceof DividerItem) {
    return <Divider key={item.key} />;
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

export default {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
  },
  args: {
    items,
    children: renderItem,
    onAction: (key) => {
      alert(`action: ${key}`);
    },
    onClose: () => {
      console.log("close");
    },
  },
} as Meta<MenuProps<unknown>>;

const Template: Story<MenuProps<MenuItem>> = (props: MenuProps<MenuItem>) => (
  <Menu {...props} />
);

export const Static: Story = () => {
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

export const StaticWithTextItems: Story = () => (
  <Menu>
    <Item>Restart Typescript Service</Item>
    <Item title="Compile">
      <Item>packages/jui/tsconfig.json</Item>
      <Item>packages/jui/src/StatusBar/StatusBar.stories.tsx</Item>
      <Item>Compile All</Item>
    </Item>
  </Menu>
);

export const Nested = Template.bind(null);

Nested.args = {
  items,
  disabledKeys: ["Float"],
};

export const Position = ({ offsetRight = 230 }: { offsetRight: number }) => {
  return (
    <div style={{ paddingLeft: `calc(100% - ${offsetRight}px)` }}>
      <Menu items={items}>{renderItem}</Menu>
    </div>
  );
};

export const ToggleSubmenuOnPress = Template.bind(null);
ToggleSubmenuOnPress.args = {
  submenuBehavior: "toggleOnPress",
};

export const SubmenuWithAction = Template.bind(null);
SubmenuWithAction.args = {
  submenuBehavior: "actionOnPress",
};

export const MenuWithTrigger: Story<
  {
    offsetRight?: number;
    offsetBottom?: number;
    menuProps: Partial<MenuProps<any>>;
  } & Pick<MenuTriggerProps, "preventFocusOnPress" | "restoreFocus">
> = ({
  offsetRight,
  offsetBottom,
  menuProps: otherMenuProps,
  ...otherProps
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
          {...otherProps}
          renderMenu={({ menuProps }) => (
            <Menu
              items={items}
              disabledKeys={["Float"]}
              {...menuProps}
              {...otherMenuProps}
              onAction={(key) => {
                console.log("onAction", key);
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

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.commonColors.labelForeground};
  background: ${({ theme }) => theme.commonColors.panelBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ContextMenu: Story<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        style={{
          height: "25vh",
          background: `repeating-linear-gradient(45deg, #aaa, #aaa 10px, #999 10px, #999 20px)`,
        }}
      />
      <ContextMenuContainer
        id="context-menu-container"
        renderMenu={() => (
          <Menu aria-label="Editor Context Menu">
            <Item textValue="Column Selection Mode">
              <MenuItemLayout content="Column Selection Mode" shortcut="⇧⌘8" />
            </Item>
            <Divider />
            <Item textValue="Go to">
              <Item textValue="Navigation Bar">
                <MenuItemLayout content="Navigation Bar" shortcut="`⌘↑`" />
              </Item>
              <Item textValue="Implementation(s)">
                <MenuItemLayout content="Implementation(s)" shortcut="⌥⌘B" />
              </Item>
            </Item>
            <Item textValue="Generate">
              <MenuItemLayout content="Generate" shortcut="⌘N" />
            </Item>
            <Divider />
            <Item title="Local History">
              <Item>Show History</Item>
              <Item>Put Label...</Item>
            </Item>
            <Divider />
            <Item textValue="Compare with Clipboard">
              <MenuItemLayout
                icon={<PlatformIcon icon={"actions/diff"} />}
                content="Compare with Clipboard"
              />
            </Item>
          </Menu>
        )}
      >
        <StyledContainer>Right click somewhere. {children}</StyledContainer>
      </ContextMenuContainer>
    </>
  );
};
ContextMenu.parameters = {
  layout: "fullscreen",
};
