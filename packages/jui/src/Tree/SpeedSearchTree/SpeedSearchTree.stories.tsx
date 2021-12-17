import { Meta } from "@storybook/react";
import React, { Key, useState } from "react";
import {
  Pane,
  SelectionLog,
  SpeedSearchTreeSample,
} from "../../story-components";
import { treeItems } from "../story-helpers";
import { SpeedSearchTree } from "./SpeedSearchTree";
import { Item } from "@react-stately/collections";
import { HighlightedTextValue } from "@intellij-platform/core";

export default {
  title: "Components/Tree (Speed search)",
  Component: SpeedSearchTree,
} as Meta;

export const Static = () => {
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set(["Theme", "index.ts"])
  );
  return (
    <div style={{ display: "flex" }}>
      <Pane>
        <SpeedSearchTreeSample
          selectedKeys={selectedKeys}
          onSelectedKeysChange={setSelectedKeys}
        />
      </Pane>
      <div style={{ marginLeft: 20 }}>
        <h4>Selection</h4>
        <SelectionLog selection={selectedKeys} />
      </div>
    </div>
  );
};

export const Dynamic = () => {
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set(["Theme", "index.ts"])
  );
  return (
    <div style={{ display: "flex" }}>
      <Pane>
        <SpeedSearchTree
          items={treeItems}
          fillAvailableSpace
          selectionMode="multiple"
          defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {(item) => (
            <Item
              key={item.name}
              textValue={item.name}
              childItems={item.children}
            >
              <HighlightedTextValue />
            </Item>
          )}
        </SpeedSearchTree>
      </Pane>
      <div style={{ marginLeft: 20 }}>
        <h4>Selection</h4>
        <SelectionLog selection={selectedKeys} />
      </div>
    </div>
  );
};
