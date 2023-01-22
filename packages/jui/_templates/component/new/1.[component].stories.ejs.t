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

const Template: Story<<%= componentName %>Props> = (props) => {
  return <<%= componentName %> {...props} />;
};

export const Default: Story<<%= componentName %>Props> = Template.bind({});
