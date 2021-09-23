import { Meta } from "@storybook/react";
import React from "react";
import { styledComponentsControlsExclude } from "./story-helpers";
import { App as AppCmp } from "jui-example-app/src";

export default {
  title: "Demos/Example App",
} as Meta;

export const ExampleApp = () => <AppCmp />;
ExampleApp.parameters = {
  layout: "fullscreen",
  controls: { exclude: styledComponentsControlsExclude },
  component: ExampleApp,
};
