import { Item } from "@react-stately/collections";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { Key, useState } from "react";
import { Tree, TreeProps } from "./Tree";
import { treeItems } from "./story-helpers";
import { Pane, SelectionLog } from "../story-components";
import {
  ContextMenuContainer,
  Menu,
  MenuItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";

export default {
  title: "Components/Tree (Basic)",
  Component: Tree,
} as Meta;

export const Static: StoryObj<TreeProps<never>> = {
  render: (props) => {
    const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
      new Set(["Theme", "index.ts"])
    );
    return (
      <div style={{ display: "flex" }}>
        <Pane>
          <Tree
            fillAvailableSpace
            selectionMode="multiple"
            defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
            selectedKeys={selectedKeys}
            disabledKeys={["SpeedSearchList.tsx"]}
            onSelectionChange={setSelectedKeys}
            {...props}
          >
            <Item key="index.ts">index.ts</Item>
            <Item title="List" key="List">
              <Item title="BasicList" key="BasicList">
                <Item>BasicList.stories.tsx</Item>
                <Item>BasicList.tsx</Item>
                <Item>BasicListItem.tsx</Item>
                <Item>useBasicList.ts</Item>
              </Item>

              <Item title="SpeedSearchList" key="SpeedSearchList">
                <Item>SpeedSearchList.stories.tsx</Item>
                <Item key="SpeedSearchList.tsx">SpeedSearchList.tsx</Item>
                <Item>SpeedSearchListItem.tsx</Item>
                <Item>useSpeedSearchList.ts</Item>
              </Item>

              <Item>ListDivider.tsx</Item>
            </Item>
            <Item title="Theme" key="Theme">
              <Item>createTheme.ts</Item>
            </Item>
            <Item title="Foo">
              <Item title="Bar">
                <Item title="FooBar">
                  <Item title="Baz">
                    <Item>Baz.ts</Item>
                  </Item>
                  <Item>Foo.ts</Item>
                  <Item>Bar.ts</Item>
                </Item>
              </Item>
            </Item>
          </Tree>
        </Pane>
        <div style={{ marginLeft: 20 }}>
          <h4>Selection</h4>
          <SelectionLog selection={selectedKeys} />
        </div>
      </div>
    );
  },
};

export const Dynamic: StoryFn = () => {
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set(["Theme", "index.ts"])
  );
  return (
    <div style={{ display: "flex" }}>
      <Pane>
        <Tree
          fillAvailableSpace
          selectionMode="multiple"
          defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
          items={treeItems}
          selectedKeys={selectedKeys}
          disabledKeys={["SpeedSearchList.tsx"]}
          onSelectionChange={setSelectedKeys}
        >
          {(item) => (
            <Item key={item.name} title={item.name} childItems={item.children}>
              {item.name}
            </Item>
          )}
        </Tree>
      </Pane>
      <div style={{ marginLeft: 20 }}>
        <h4>Selection</h4>
        <SelectionLog selection={selectedKeys} />
      </div>
    </div>
  );
};

const containerWidthItems: typeof treeItems = [
  ...Array(30)
    .fill(null)
    .map((_, index) => ({ name: Array(index).fill("~~").join(" ") })),
];

export const ScrollAndContainerWidth: StoryObj<{ width: number }> = {
  render: ({ width }) => {
    return (
      <>
        <div style={{ width, height: 200 }}>
          <Tree
            data-testid="tree"
            selectionMode="multiple"
            fillAvailableSpace
            items={containerWidthItems}
            defaultSelectedKeys={["~~ ~~"]}
          >
            {(item) => (
              <Item
                key={item.name}
                title={item.name}
                childItems={item.children}
              >
                {item.name}
              </Item>
            )}
          </Tree>
        </div>
      </>
    );
  },

  args: { width: 400 },
  name: "Scroll & Container Width",
};

export const WithContextMenu: StoryFn = () => {
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set([])
  );
  return (
    <Pane>
      <ContextMenuContainer
        renderMenu={() => {
          const renderActions = () => {
            if (typeof selectedKeys !== "string" && selectedKeys.size === 0) {
              return <Item>Nothing here</Item>;
            } else {
              let text = "";
              if (selectedKeys === "all") {
                text = "all";
              } else if (selectedKeys.size > 1) {
                text = `${selectedKeys.size} items`;
              }
              return [
                <Item textValue={`Cut ${text}`} key="Cut">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/menu-cut"} />}
                    content={`Cut ${text}`}
                    shortcut={"⌘X"}
                  />
                </Item>,
                <Item textValue={`Copy ${text}`} key="Copy">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/copy"} />}
                    content={`Copy ${text}`}
                    shortcut={"⌘C"}
                  />
                </Item>,
                <Item textValue={`Delete ${text}`} key="Paste">
                  <MenuItemLayout content={`Delete ${text}`} shortcut="⌫" />
                </Item>,
              ];
            }
          };
          return <Menu aria-label="Tree Context Menu">{renderActions()}</Menu>;
        }}
      >
        <Tree
          fillAvailableSpace
          selectionMode="multiple"
          defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
          items={treeItems}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {(item) => (
            <Item key={item.name} title={item.name} childItems={item.children}>
              {item.name}
            </Item>
          )}
        </Tree>{" "}
      </ContextMenuContainer>
    </Pane>
  );
};
