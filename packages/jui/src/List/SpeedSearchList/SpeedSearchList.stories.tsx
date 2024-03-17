import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
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

export const WithHighlight: StoryObj<SpeedSearchListProps<any>> = {
  render: (props) => {
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
  },
};

export const WithoutHighlight: StoryFn = () => {
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
export const HighlightInCustomUI: StoryFn = () => {
  return (
    <Pane>
      <SpeedSearchList
        selectionMode="multiple"
        items={legends}
        estimatedItemHeight={40}
        fillAvailableSpace
      >
        {itemRenderer(renderItemCustomUI, <HighlightedTextValue />)}
      </SpeedSearchList>
    </Pane>
  );
};

export const WithConnectedInput =
  commonListStories.withConnectedInput(SpeedSearchList);
