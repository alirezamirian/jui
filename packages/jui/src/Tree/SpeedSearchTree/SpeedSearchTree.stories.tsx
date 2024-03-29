import { Meta, StoryFn } from "@storybook/react";
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
  parameters: {
    options: {
      enableShortcuts: false,
    },
  },
} as Meta;

export const Static: StoryFn = () => {
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

export const Dynamic: StoryFn = () => {
  // Note: selection being initialized to "Theme" and "index.ts" is important in testing some stuff in cypress tests.
  // It must not be changed.
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    new Set(["Theme", "index.ts"])
  );
  return (
    <div style={{ display: "flex" }}>
      <Pane id="component-container">
        <SpeedSearchTree
          id="tree"
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

export const HighlightsWithSpace: StoryFn = () => {
  return (
    <Pane id="component-container">
      <SpeedSearchTree fillAvailableSpace selectionMode="multiple">
        <Item textValue="Paco de Lucia">
          <HighlightedTextValue />
        </Item>
        <Item textValue="Vicente Amigo">
          <HighlightedTextValue />
        </Item>
      </SpeedSearchTree>
    </Pane>
  );
};
