import React from "react";
import { Meta } from "@storybook/react";
import { SpeedSearchList } from "./SpeedSearchList";
import { legends } from "../../../test-data";
import {
  itemRenderer,
  renderItemCustomUI,
  renderItemString,
} from "../story-helpers";
import { HighlightedTextValue } from "../../CollectionSpeedSearch/HighlightedTextValue";
import { Pane } from "../../story-utils";

export default {
  title: "SpeedSearchList",
  component: SpeedSearchList,
} as Meta;

export const HighlightedByDefault = () => {
  return (
    <Pane>
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        disabledKeys={["El Amir"]}
        fillAvailableSpace
      >
        {itemRenderer(renderItemString)}
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
        {itemRenderer(renderItemCustomUI, <HighlightedTextValue />)}
      </SpeedSearchList>
    </Pane>
  );
};
