import React from "react";
import { Meta } from "@storybook/react";
import { BasicList } from "./BasicList";
import { legends } from "../../../test-data";
import {
  itemRenderer,
  renderItemCustomUI,
  renderItemString,
} from "../story-helpers";
import { Item, Section } from "@react-stately/collections";
import { Divider } from "../../Collections/Divider";
import { Pane } from "../../story-utils";

export default {
  title: "BasicList",
  component: BasicList,
} as Meta;

export const Default = () => {
  return (
    <Pane>
      <BasicList selectionMode="single" items={legends} fillAvailableSpace>
        {itemRenderer(renderItemString)}
      </BasicList>
    </Pane>
  );
};

export const AlwaysShownAsFocused = () => {
  return (
    <Pane>
      <BasicList
        selectionMode="single"
        items={legends}
        fillAvailableSpace
        // alwaysShowListAsFocused
      >
        {itemRenderer(renderItemCustomUI)}
      </BasicList>
    </Pane>
  );
};

export const WithStaticData = () => {
  return (
    <Pane>
      <BasicList selectionMode="multiple" items={legends} fillAvailableSpace>
        <Item>Paco de lucia</Item>
        <Divider />
        <Item>Vicente Amigo</Item>
        <Section title="Other">
          <Item>Gerardo Nunez</Item>
          <Item>El Amir</Item>
        </Section>
      </BasicList>
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
      <BasicList
        selectionMode="multiple"
        items={legends}
        fillAvailableSpace={fillAvailableSpace}
        shouldFocusWrap={shouldFocusWrap}
        alwaysShowListAsFocused={alwaysShowListAsFocused}
      >
        {itemRenderer(renderItemString)}
      </BasicList>
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
