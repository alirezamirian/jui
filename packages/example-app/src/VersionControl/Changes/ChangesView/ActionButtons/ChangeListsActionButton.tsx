import React from "react";
import {
  ActionButtonWithMenu,
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";

export const ChangeListsActionButton = (): React.ReactElement => {
  // Grouping is extensible in Intellij platform, but we only support grouping by directory here.

  return (
    <ActionButtonWithMenu
      renderMenu={({ menuProps }) => (
        <Menu
          {...menuProps}
          onAction={(key) => {
            alert("Not implemented");
          }}
        >
          <Item key="new">
            <MenuItemLayout
              content="New Changelist..."
              icon={<PlatformIcon icon="general/add.svg" />}
            />
          </Item>
          <Item key="edit">
            <MenuItemLayout
              content="Edit Changelist..."
              icon={<PlatformIcon icon="actions/edit.svg" />}
            />
          </Item>
          <Item key="delete">
            <MenuItemLayout
              content="Delete Changelist"
              icon={<PlatformIcon icon="general/remove.svg" />}
            />
          </Item>
          <Item key="moveToAnotherChangelist">
            <MenuItemLayout content="Move Files to Another Changelist..." />
          </Item>
        </Menu>
      )}
    >
      <PlatformIcon icon="vcs/changelist.svg" />
    </ActionButtonWithMenu>
  );
};
