import React from "react";
import { ArgTypes } from "@storybook/react";

export const styledComponentsControlsExclude = [
  "theme",
  "as",
  "forwardedAs",
  "ref",
];

// we could have accept component type instead of prop type, but this way refactoring
// in component props interface is handled better
export type ComponentArgTypes<P> = {
  [key in keyof P]?: ArgTypes[string];
};
