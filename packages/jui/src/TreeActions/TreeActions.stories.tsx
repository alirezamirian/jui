import React from "react";
import { Meta, Story } from "@storybook/react";
import { SpeedSearchTree, Tree } from "@intellij-platform/core";
import {
  staticSpeedSearchTreeItems,
  staticTreeItems,
} from "@intellij-platform/core/Tree/story-helpers";
import { TreeActionsWrapper } from "@intellij-platform/core/TreeActions/story-and-test-helpers";

export default {
  title: "Components/TreeActions",
} as Meta;

export const OnTree: Story = () => (
  <TreeActionsWrapper>
    {(treeRef) => (
      <Tree
        ref={treeRef}
        selectionMode="multiple"
        defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
      >
        {staticTreeItems}
      </Tree>
    )}
  </TreeActionsWrapper>
);
export const OnSpeedSearchTree: Story = () => (
  <TreeActionsWrapper>
    {(treeRef) => (
      <SpeedSearchTree
        ref={treeRef}
        selectionMode="multiple"
        defaultExpandedKeys={["List", "Theme", "BasicList", "Foo"]}
      >
        {staticSpeedSearchTreeItems}
      </SpeedSearchTree>
    )}
  </TreeActionsWrapper>
);
