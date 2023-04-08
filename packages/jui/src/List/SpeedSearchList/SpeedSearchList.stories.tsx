import React from "react";
import { Meta, Story } from "@storybook/react";
import { SpeedSearchList, SpeedSearchListProps } from "./SpeedSearchList";
import { legends } from "../../../test-data";
import { HighlightedTextValue } from "../../CollectionSpeedSearch/HighlightedTextValue";
import { Pane } from "../../story-components";
import {
  commonListStories,
  itemRenderer,
  renderItemCustomUI,
  renderItemText,
  renderItemTextWithHighlights,
} from "../story-helpers";

export default {
  title: "Components/List (Speed search)",
  component: SpeedSearchList,
} as Meta;

export const WithHighlight: Story<SpeedSearchListProps<any>> = (props) => {
  return (
    <Pane>
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        disabledKeys={["El Amir"]}
        fillAvailableSpace
        {...props}
      >
        {itemRenderer(renderItemTextWithHighlights)}
      </SpeedSearchList>
    </Pane>
  );
};

export const WithoutHighlight = () => {
  return (
    <Pane>
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        disabledKeys={["El Amir"]}
        fillAvailableSpace
      >
        {itemRenderer(renderItemText)}
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

export const WithConnectedInput =
  commonListStories.withConnectedInput(SpeedSearchList);
