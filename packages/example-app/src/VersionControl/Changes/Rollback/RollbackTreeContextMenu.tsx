import {
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";
import React from "react";

export const RollbackTreeContextMenu = () => {
  const disabledKeys = ["showDiff"];

  return (
    <Menu
      disabledKeys={disabledKeys}
      aria-label="Context menu"
      onAction={() => {
        alert("Not implemented");
      }}
    >
      <Item key="showDiff" textValue="Show Diff">
        <MenuItemLayout
          icon={<PlatformIcon icon={"actions/diff.svg"} />}
          content="Show Diff"
        />
      </Item>
    </Menu>
  );
};
