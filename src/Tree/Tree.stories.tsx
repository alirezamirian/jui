import { Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import React, { Key, useState } from "react";
import { Tree } from "./Tree";
import { Pane, SelectionLog } from "../story-components";

export default {
  title: "Components/Tree (Basic)",
  Component: Tree,
} as Meta;

export const Static = () => {
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
        </Tree>
      </Pane>
      <div style={{ marginLeft: 20 }}>
        <h4>Selection</h4>
        <SelectionLog selection={selectedKeys} />
      </div>
    </div>
  );
};
