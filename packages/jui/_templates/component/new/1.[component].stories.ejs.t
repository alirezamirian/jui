---
to: src/<%= componentName %>/<%= componentName %>.stories.tsx
---
import { Meta, Story } from "@storybook/react";
import React from "react";
import { <%= componentName %>, <%= componentName %>Props } from "./<%= componentName %>";

export default {
  title: "Components/<%= componentName %>",
  component: <%= componentName %>,
  args: {

  },
  argTypes: { },
} as Meta<<%= componentName %>Props>;

const render = (props: <%= componentName %>Props) => {
  return <<%= componentName %> {...props} />;
};

export const Default: StoryObj<<%= componentName %>Props> = {
  render: render,
};
