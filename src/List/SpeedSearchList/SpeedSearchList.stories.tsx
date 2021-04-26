import React from "react";
import { Meta } from "@storybook/react";
import { Item } from "@react-stately/collections";
import { SpeedSearchList } from "./SpeedSearchList";
import { HighlightedTextValue } from "../../selection/CollectionSpeedSearch/HighlightedTextValue";

export default {
  title: "SpeedSearchList",
  component: SpeedSearchList,
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
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        fillAvailableSpace
      >
        {renderItemString}
      </SpeedSearchList>
    </Pane>
  );
};

export const HighlightInCustomUI = () => {
  return (
    <Pane>
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        fillAvailableSpace
      >
        {renderCustomUI}
      </SpeedSearchList>
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
