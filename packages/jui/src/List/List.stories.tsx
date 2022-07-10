import React, { Key, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { List, ListProps } from "./List";
import { legends } from "../../test-data";
import { Divider } from "../Collections/Divider";
import { Pane } from "../story-components";
import {
  itemRenderer,
  renderItemCustomUI,
  renderItemText,
} from "./story-helpers";
import {
  ContextMenuContainer,
  Menu,
  Item,
  Section,
  MenuItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";

export default {
  title: "Components/List (Basic)",
  component: List,
} as Meta;

export const Default: Story<ListProps<never>> = (props) => {
  return (
    <Pane>
      <List
        selectionMode="single"
        items={legends}
        fillAvailableSpace
        {...props}
      >
        {itemRenderer(renderItemText)}
      </List>
    </Pane>
  );
};

Default.args = {};

export const AlwaysShownAsFocused = () => {
  return (
    <Pane>
      <List
        selectionMode="single"
        items={legends}
        fillAvailableSpace
        // alwaysShowListAsFocused
      >
        {itemRenderer(renderItemCustomUI)}
      </List>
    </Pane>
  );
};

export const WithStaticData = () => {
  return (
    <Pane>
      <List selectionMode="multiple" fillAvailableSpace>
        <Item>Paco de lucia</Item>
        <Divider />
        <Item>Vicente Amigo</Item>
        <Section title="Other">
          <Item>Gerardo Nunez</Item>
          <Item>El Amir</Item>
        </Section>
      </List>
    </Pane>
  );
};

export const MultiSelect = ({
  fillAvailableSpace,
  shouldFocusWrap,
  alwaysShowListAsFocused,
}: any) => {
  return (
    <Pane>
      <List
        selectionMode="multiple"
        items={legends}
        fillAvailableSpace={fillAvailableSpace}
        shouldFocusWrap={shouldFocusWrap}
        alwaysShowListAsFocused={alwaysShowListAsFocused}
      >
        {itemRenderer(renderItemText)}
      </List>
    </Pane>
  );
};
MultiSelect.argTypes = {
  shouldFocusWrap: { control: "boolean" },
};
MultiSelect.args = {
  shouldFocusWrap: { value: false },
};

export const WithContextMenu: Story = () => {
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
              return [
                <Item textValue={`Cut`} key="Cut">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/menu-cut"} />}
                    content={`Cut`}
                    shortcut={"⌘X"}
                  />
                </Item>,
                <Item textValue={`Copy`} key="Copy">
                  <MenuItemLayout
                    icon={<PlatformIcon icon={"actions/copy"} />}
                    content={`Copy`}
                    shortcut={"⌘C"}
                  />
                </Item>,
                <Item textValue={`Delete`} key="Paste">
                  <MenuItemLayout content={`Delete`} shortcut="⌫" />
                </Item>,
              ];
            }
          };
          return <Menu aria-label="Tree Context Menu">{renderActions()}</Menu>;
        }}
      >
        <List
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          items={legends}
          fillAvailableSpace
        >
          {itemRenderer(renderItemText)}
        </List>
      </ContextMenuContainer>
    </Pane>
  );
};
