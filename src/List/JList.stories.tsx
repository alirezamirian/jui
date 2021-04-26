import React from "react";
import { Meta } from "@storybook/react";
import { JList } from "./JList";
import { Item } from "@react-stately/collections";

export default {
  title: "JList",
  component: JList,
} as Meta;

const legends = [
  { name: "Paco de Lucia" },
  { name: "Vicente Amigo" },
  { name: "Gerardo Nunez" },
  { name: "Sabicas" },
];

const renderItem = (item: typeof legends[number]) => (
  <Item key={item.name} textValue={item.name}>
    Name is <b>{item.name}</b>
  </Item>
);

export const Default = () => {
  return (
    <Pane>
      <JList selectionMode="single" items={legends} fillAvailableSpace>
        {renderItem}
      </JList>
    </Pane>
  );
};

export const AlwaysShownAsFocused = () => {
  return (
    <Pane>
      <JList
        selectionMode="single"
        items={legends}
        fillAvailableSpace
        alwaysShowListAsFocused
      >
        {renderItem}
      </JList>
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
      <JList
        selectionMode="multiple"
        items={legends}
        fillAvailableSpace={fillAvailableSpace}
        shouldFocusWrap={shouldFocusWrap}
        alwaysShowListAsFocused={alwaysShowListAsFocused}
      >
        {renderItem}
      </JList>
    </Pane>
  );
};
MultiSelect.argTypes = {
  shouldFocusWrap: { control: "boolean" },
};
MultiSelect.args = {
  shouldFocusWrap: { value: false },
};

function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        height: "calc(100vh - 25px)",
      }}
    >
      {children}
    </div>
  );
}

Default.args = {};
