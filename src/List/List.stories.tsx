import React from "react";
import { Meta } from "@storybook/react";
import { List } from "./List";
import { legends } from "../../test-data";
import {
  itemRenderer,
  renderItemCustomUI,
  renderItemString,
} from "../story-helpers";
import { Item, Section } from "@react-stately/collections";
import { Divider } from "../Collections/Divider";
import { Pane } from "../story-components";

export default {
  title: "Components/List (Basic)",
  component: List,
} as Meta;

export const Default = () => {
  return (
    <Pane>
      <List selectionMode="single" items={legends} fillAvailableSpace>
        {itemRenderer(renderItemString)}
      </List>
    </Pane>
  );
};

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
      <List selectionMode="multiple" items={legends} fillAvailableSpace>
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
        {itemRenderer(renderItemString)}
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

Default.args = {};
