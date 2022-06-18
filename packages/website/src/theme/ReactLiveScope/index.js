/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as juiComponents from "@intellij-platform/core";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";
import lightThemeJson from "@intellij-platform/core/themes/intellijlaf.theme.json";
import highContrastThemeJson from "@intellij-platform/core/themes/HighContrast.theme.json";

const LazyExampleApp = React.lazy(() => import("jui-example-app/src/App"));
const ExampleApp = () => (
  // Because ReactLive doesn't render a Suspense around what it renders.
  <React.Suspense fallback="loading">
    <LazyExampleApp />
  </React.Suspense>
);
import React from "react";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...juiComponents,
  ExampleApp,
  darculaThemeJson,
  lightThemeJson,
  highContrastThemeJson,
};

export default ReactLiveScope;
