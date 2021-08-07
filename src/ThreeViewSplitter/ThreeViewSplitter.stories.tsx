import React, { useState } from "react";

import { Meta } from "@storybook/react";
import { ThreeViewSplitter, ThreeViewSplitterProps } from "./ThreeViewSplitter";
import {
  ComponentArgTypes,
  styledComponentsControlsExclude,
} from "../story-helpers";

export default {
  title: "ThreeViewSplitter",
} as Meta;

const ThreeViewSplitterWithStyles: React.FC<ThreeViewSplitterProps> = (
  props
) => {
  const { firstView, lastView, innerView, ...otherProps } = props;
  return (
    <ThreeViewSplitter
      {...otherProps}
      style={{ height: "100vh" }}
      firstView={
        <div style={{ background: "lightyellow", height: "100%", padding: 8 }}>
          {firstView}
          <div>size: {props.firstSize}</div>
        </div>
      }
      lastView={
        <div style={{ background: "lightcoral", height: "100%", padding: 8 }}>
          {lastView}
          <div>size: {props.lastSize}</div>
        </div>
      }
      innerView={
        <div style={{ background: "lightcyan", height: "100%", padding: 8 }}>
          {innerView}
        </div>
      }
    />
  );
};

export const WithInitialSize = (props: Partial<ThreeViewSplitterProps>) => {
  const [firstSize, setFirstSize] = useState<number>(250);
  const [lastSize, setLastSize] = useState<number>(250);
  return (
    <ThreeViewSplitterWithStyles
      {...props}
      firstSize={firstSize}
      onFirstResize={setFirstSize}
      lastSize={lastSize}
      onLastResize={setLastSize}
    />
  );
};

export const WithoutInitialSize = (props: Partial<ThreeViewSplitterProps>) => {
  const [firstSize, setFirstSize] = useState<number>();
  const [lastSize, setLastSize] = useState<number>();
  return (
    <ThreeViewSplitterWithStyles
      {...props}
      firstSize={firstSize}
      onFirstResize={setFirstSize}
      lastSize={lastSize}
      onLastResize={setLastSize}
    />
  );
};
export const RelativeSizing = (props: Partial<ThreeViewSplitterProps>) => {
  const [firstSize, setFirstSize] = useState<number>(0.2);
  const [lastSize, setLastSize] = useState<number>(0.2);
  return (
    <ThreeViewSplitterWithStyles
      {...props}
      firstSize={firstSize}
      onFirstResize={setFirstSize}
      lastSize={lastSize}
      onLastResize={setLastSize}
    />
  );
};

const argTypes: ComponentArgTypes<ThreeViewSplitterProps> = {
  orientation: {
    defaultValue: "horizontal",
    type: "radio",
    options: [
      "horizontal",
      "vertical",
    ] as ThreeViewSplitterProps["orientation"][],
  },
  firstView: { defaultValue: "First view", type: "string" },
  innerView: { defaultValue: "Inner view", type: "string" },
  lastView: { defaultValue: "Last view", type: "string" },
};
const parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
};

WithoutInitialSize.argTypes = argTypes;
WithoutInitialSize.parameters = parameters;

WithInitialSize.argTypes = argTypes;
WithInitialSize.parameters = parameters;

RelativeSizing.argTypes = argTypes;
RelativeSizing.parameters = parameters;
