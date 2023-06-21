import React, { ReactNode } from "react";
import { Meta, Story } from "@storybook/react";
import { Item } from "@react-stately/collections";
import { ContextMenuContainer, styled } from "@intellij-platform/core";

import { ActionButton } from "../ActionButton";
import { ActionToolbar } from "../ActionToolbar/ActionToolbar";
import { Divider, DividerItem } from "../Collections/Divider";
import { PlatformIcon } from "../Icon";
import { styledComponentsControlsExclude } from "../story-helpers";
import { Menu, MenuProps } from "./Menu";
import { MenuItemLayout } from "./MenuItemLayout";
import { MenuTrigger, MenuTriggerProps } from "./MenuTrigger";
import { ExampleMenuItem, renderItem, viewModeItems } from "./story-helpers";

const exampleMenuItems: Array<ExampleMenuItem> = [
  {
    title: "View Mode",
    subItems: viewModeItems,
  },
  new DividerItem(),
  {
    title: "Group tabs",
    icon: "toolwindows/documentation",
    shortcut: "^G",
  },
];

export default {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    controls: { exclude: styledComponentsControlsExclude },
  },
  args: {
    items: exampleMenuItems,
    "aria-label": "Menu",
    children: renderItem,
    onAction: (key) => {
      alert(`action: ${key}`);
    },
    onClose: () => {
      console.log("close");
    },
  },
} as Meta<MenuProps<unknown>>;

const Template: Story<MenuProps<ExampleMenuItem>> = (
  props: MenuProps<ExampleMenuItem>
) => <Menu {...props} />;

export const Static = Template.bind(null);

Static.args = {
  disabledKeys: ["jumpToExternalEditor"],
  children: (
    <>
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
      <Item textValue="Paste" key="Paste">
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
    </>
  ).props.children,
};

export const AutoFocusFirst = Template.bind(null);
AutoFocusFirst.args = {
  autoFocus: "first",
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
  items: exampleMenuItems,
  disabledKeys: ["Float"],
};

export const Position = ({ offsetRight = 230 }: { offsetRight: number }) => {
  return (
    <div style={{ paddingLeft: `calc(100% - ${offsetRight}px)` }}>
      <Menu items={exampleMenuItems}>{renderItem}</Menu>
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

export const Sections = Template.bind(null);
Sections.args = {
  items: [
    {
      title: "Local Branches",
      subItems: [
        { title: "master", subItems: [{ title: "Pull" }, { title: "Update" }] },
        { title: "dev" },
      ],
      section: true,
    },
    {
      title: "Remote Branches",
      subItems: [
        {
          title: "origin/master",
          subItems: [{ title: "Checkout" }],
        },
        { title: "origin/dev" },
      ],
      section: true,
    },
    {
      title: "Empty section",
      subItems: [],
      section: true,
    },
  ],
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
              items={exampleMenuItems}
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

export const ContextMenu: Story<{
  children?: ReactNode;
  menuProps?: Partial<MenuProps<object>>;
}> = ({ children, menuProps = {} }) => {
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
          <Menu aria-label="Editor Context Menu" {...menuProps}>
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
