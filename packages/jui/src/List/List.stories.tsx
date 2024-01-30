import React, { Key, useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { List, ListProps } from "./List";
import { legends } from "../../test-data";
import { Divider } from "../Collections/Divider";
import { Pane } from "../story-components";
import {
  commonListStories,
  itemRenderer,
  renderItemCustomUI,
  renderItemText,
} from "./story-helpers";
import {
  ContextMenuContainer,
  Item,
  Menu,
  MenuItemLayout,
  PlatformIcon,
  Section,
  styled,
} from "@intellij-platform/core";

export default {
  title: "Components/List (Basic)",
  component: List,
} as Meta;

export const Default: StoryObj<ListProps<typeof legends[number]>> = {
  render: (props) => (
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
  ),
  args: {},
};

export const WithConnectedInput = commonListStories.withConnectedInput(List);

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.commonColors.label()};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;
export const shownAsFocused: StoryFn = () => {
  const [shownAsFocused, setShowAsFocused] = useState(false);
  return (
    <Pane>
      <StyledLabel>
        <input
          type="checkbox"
          checked={shownAsFocused}
          onChange={(e) => setShowAsFocused(e.target.checked)}
        />
        Show as focused
      </StyledLabel>
      <br />
      <List
        selectionMode="single"
        items={legends}
        fillAvailableSpace
        showAsFocused={shownAsFocused}
      >
        {itemRenderer(renderItemCustomUI)}
      </List>
    </Pane>
  );
};

export const WithStaticData: StoryFn = () => {
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

export const MultiSelect: StoryObj<ListProps<object>> = {
  render: ({ fillAvailableSpace, shouldFocusWrap, showAsFocused }: any) => {
    return (
      <Pane>
        <List
          selectionMode="multiple"
          items={legends}
          fillAvailableSpace={fillAvailableSpace}
          shouldFocusWrap={shouldFocusWrap}
          showAsFocused={showAsFocused}
        >
          {itemRenderer(renderItemText)}
        </List>
      </Pane>
    );
  },
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
