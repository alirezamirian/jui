import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Button } from "@intellij-platform/core";
import {
  ProgressBar,
  ProgressBarProps,
  ProgressBarPauseButton,
  ProgressBarStopButton,
} from "./";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
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

const Template: Story<ProgressBarStoryProps> = ({
  containerWidth,
  ...props
}) => {
  return (
    <div style={{ width: containerWidth }}>
      <ProgressBar {...props} />
    </div>
  );
};

export const Default: Story<ProgressBarStoryProps> = Template.bind({});

export const LongDetails: Story<ProgressBarStoryProps> = Template.bind({});

LongDetails.args = {
  details:
    "Long long long long long long long long long long long long long long long long details",
};

export const Bare: Story<ProgressBarStoryProps> = Template.bind({});

Bare.args = {
  details: undefined,
  name: undefined,
};

export const Inline: Story<ProgressBarStoryProps> = Template.bind({});

Inline.args = {
  details: undefined,
  name: undefined,
  isIndeterminate: true,
  containerWidth: undefined,
};
Inline.parameters = {
  layout: "fullscreen",
};

export const NameOnSide: Story<ProgressBarStoryProps> = Template.bind({});
NameOnSide.args = {
  namePosition: "side",
  details: "",
  name: "Syntax Analysis:",
};

export const MinAndMaxValues: Story<ProgressBarStoryProps> = Template.bind({});
MinAndMaxValues.args = {
  minValue: 6,
  maxValue: 18,
  value: 12,
};

export const ShowPercentage: Story<ProgressBarStoryProps> = Template.bind({});
ShowPercentage.args = {
  showValueLabel: true,
};

export const ShowCustomValueLabel: Story<ProgressBarStoryProps> = Template.bind(
  {}
);
ShowCustomValueLabel.args = {
  showValueLabel: true,
  valueLabel: "1 of 8",
};

export const WithPauseButton: Story<ProgressBarStoryProps> = (props) => {
  const [paused, setPaused] = useState(false);
  return (
    <Default
      {...props}
      button={
        <ProgressBarPauseButton paused={paused} onPausedChange={setPaused} />
      }
    />
  );
};

export const WithSecondaryDetails: Story<ProgressBarStoryProps> = WithPauseButton.bind(
  {}
);
WithSecondaryDetails.args = {
  name: "Updating indexes",
  details: "Indexing module 'foo'",
  secondaryDetails: "/path/to/module/foo/some/file/in/module/foo.ts",
};

export const WithStopButton: Story<ProgressBarStoryProps> = Template.bind({});
WithStopButton.args = {
  button: <ProgressBarStopButton onPress={() => {}} />,
};

export const WithCustomButton: Story<ProgressBarStoryProps> = Template.bind({});
WithCustomButton.args = {
  button: <Button>Cancel</Button>,
};

export const Indeterminate: Story<ProgressBarStoryProps> = Template.bind({});
Indeterminate.args = {
  isIndeterminate: true,
};
