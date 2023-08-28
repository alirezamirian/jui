import { Meta } from "@storybook/react";
import React from "react";
import { styledComponentsControlsExclude } from "./story-helpers";
import { App } from "jui-example-app/src/App";

export default {
  title: "Demos/Example App",
} as Meta;

export const ExampleApp = {
  render: () => <App />,

  parameters: {
    layout: "fullscreen",
    controls: { exclude: styledComponentsControlsExclude },
  },
};
