import React, { useState } from "react";

import { Meta } from "@storybook/react";
import { ThreeViewSplitter, ThreeViewSplitterProps } from "./ThreeViewSplitter";
import { styledComponentsControlsExclude } from "../story-helpers";

export default {
  title: "Components/ThreeViewSplitter",
  argTypes: {
    orientation: {
      defaultValue: "horizontal",
      type: {
        name: "enum",
        value: ["horizontal", "vertical"] as Array<
          Required<ThreeViewSplitterProps>["orientation"]
        >,
      },
    },
    innerViewMinSize: { defaultValue: 50, type: "number" },
    firstView: { defaultValue: "First view", type: "string" },
    innerView: { defaultValue: "Inner view", type: "string" },
    lastView: { defaultValue: "Last view", type: "string" },
  },
  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
  },
} as Meta<ThreeViewSplitterProps>;

const ThreeViewSplitterWithStyles: React.FC<ThreeViewSplitterProps> = (
  props
) => {
  const { firstView, lastView, innerView, ...otherProps } = props;
  return (
    <ThreeViewSplitter
      {...otherProps}
      style={{ height: "100vh" }}
      firstView={
        <div
          data-testid="first"
          style={{ background: "lightyellow", height: "100%", padding: 8 }}
        >
          {firstView}
          <div>size: {props.firstSize}</div>
        </div>
      }
      lastView={
        <div
          data-testid="last"
          style={{ background: "lightcoral", height: "100%", padding: 8 }}
        >
          {lastView}
          <div>size: {props.lastSize}</div>
        </div>
      }
      innerView={
        <div
          data-testid="middle"
          style={{ background: "lightcyan", height: "100%", padding: 8 }}
        >
          {innerView}
        </div>
      }
    />
  );
};

export const WithInitialSize = {
  render: (props: Partial<ThreeViewSplitterProps>) => {
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
  },
};

export const WithFocusableContent = {
  render: (props: Partial<ThreeViewSplitterProps>) => {
    const [firstSize, setFirstSize] = useState<number>();
    const [lastSize, setLastSize] = useState<number>();
    return (
      <ThreeViewSplitterWithStyles
        {...props}
        firstView={<input autoFocus />}
        firstSize={firstSize}
        onFirstResize={setFirstSize}
        lastSize={lastSize}
        onLastResize={setLastSize}
      />
    );
  },
};

export const WithoutInitialSize = {
  render: (props: Partial<ThreeViewSplitterProps>) => {
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
  },
};

export const RelativeSizing = {
  render: (props: Partial<ThreeViewSplitterProps>) => {
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
  },
};
