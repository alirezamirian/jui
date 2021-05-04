import { Item } from "@react-stately/collections";
import { Meta } from "@storybook/react";
import React from "react";
import { Tree } from "./Tree";
import { Pane } from "../story-utils";

export default {
  title: "Tree",
  Component: Tree,
} as Meta;

export const Static = () => {
  return (
    <Pane>
      <Tree
        selectionMode="single"
        defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
        defaultSelectedKeys={["Theme", "index.ts"]}
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
            <Item>SpeedSearchList.tsx</Item>
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
  );
};
