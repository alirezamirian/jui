import React from "react";
import { Meta } from "@storybook/react";
import { Item } from "@react-stately/collections";
import { List } from "./List";
import { HighlightedTextValue } from "../selection/CollectionSpeedSearch/HighlightedTextValue";

export default {
  title: "List",
  component: List,
} as Meta;

const legends = [
  { name: "Paco de Lucia" },
  { name: "Vicente Amigo" },
  { name: "Gerardo Nunez" },
  { name: "Sabicas" },
];

const renderCustomUI = (item: typeof legends[number]) => (
  <Item key={item.name} textValue={item.name}>
    Name is:{" "}
    <b>
      <HighlightedTextValue />
    </b>
  </Item>
);

const renderItemString = (item: typeof legends[number]) => (
  <Item key={item.name} textValue={item.name}>
    {item.name}
  </Item>
);

export const HighlightedByDefault = () => {
  return (
    <Pane>
      <List selectionMode="multiple" items={legends} fillAvailableSpace>
        {renderItemString}
      </List>
    </Pane>
  );
};

export const HighlightInCustomUI = () => {
  return (
    <Pane>
      <List selectionMode="multiple" items={legends} fillAvailableSpace>
        {renderCustomUI}
      </List>
    </Pane>
  );
};

function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: 20,
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
