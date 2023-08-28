import React, { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Button } from "@intellij-platform/core";
import {
  ProgressBar,
  ProgressBarPauseButton,
  ProgressBarProps,
  ProgressBarStopButton,
} from "./";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  render: ({ containerWidth, ...props }) => {
    return (
      <div style={{ width: containerWidth }}>
        <ProgressBar {...props} />
      </div>
    );
  },
  args: {
    name: "Indexing...",
    details: "Long long long long long long text",
    value: 10,
    showValueLabel: false,
    valueLabel: null,
    containerWidth: 400,
  } as ProgressBarStoryProps,
  argTypes: {},
} as Meta;

type ProgressBarStoryProps = ProgressBarProps & { containerWidth: number };

export const Default: StoryObj<ProgressBarStoryProps> = {};

export const LongDetails: StoryObj<ProgressBarStoryProps> = {
  args: {
    details:
      "Long long long long long long long long long long long long long long long long details",
  },
};

export const Bare: StoryObj<ProgressBarStoryProps> = {
  args: {
    details: undefined,
    name: undefined,
  },
};

export const Inline: StoryObj<ProgressBarStoryProps> = {
  args: {
    details: undefined,
    name: undefined,
    isIndeterminate: true,
    containerWidth: undefined,
  },

  parameters: {
    layout: "fullscreen",
  },
};

export const NameOnSide: StoryObj<ProgressBarStoryProps> = {
  args: {
    namePosition: "side",
    details: "",
    name: "Syntax Analysis:",
  },
};

export const MinAndMaxValues: StoryObj<ProgressBarStoryProps> = {
  args: {
    minValue: 6,
    maxValue: 18,
    value: 12,
  },
};

export const ShowPercentage: StoryObj<ProgressBarStoryProps> = {
  args: {
    showValueLabel: true,
  },
};

export const ShowCustomValueLabel: StoryObj<ProgressBarStoryProps> = {
  args: {
    showValueLabel: true,
    valueLabel: "1 of 8",
  },
};

export const WithPauseButton: StoryObj<ProgressBarStoryProps> = {
  render: (props) => {
    const [paused, setPaused] = useState(false);
    return (
      <ProgressBar
        {...props}
        button={
          <ProgressBarPauseButton paused={paused} onPausedChange={setPaused} />
        }
      />
    );
  },
};

export const WithSecondaryDetails: StoryObj<ProgressBarStoryProps> = {
  ...WithPauseButton,
  args: {
    name: "Updating indexes",
    details: "Indexing module 'foo'",
    secondaryDetails: "/path/to/module/foo/some/file/in/module/foo.ts",
  },
};

export const WithStopButton: StoryObj<ProgressBarStoryProps> = {
  args: {
    button: <ProgressBarStopButton onPress={() => {}} />,
  },
};

export const WithCustomButton: StoryObj<ProgressBarStoryProps> = {
  args: {
    button: <Button>Cancel</Button>,
  },
};

export const Indeterminate: StoryObj<ProgressBarStoryProps> = {
  args: {
    isIndeterminate: true,
  },
};
