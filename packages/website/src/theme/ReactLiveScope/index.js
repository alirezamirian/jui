/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import * as juiComponents from "@intellij-platform/core";
import darculaThemeJson from "@intellij-platform/core/themes/darcula.theme.json";
import lightThemeJson from "@intellij-platform/core/themes/intellijlaf.theme.json";
import highContrastThemeJson from "@intellij-platform/core/themes/HighContrast.theme.json";

const WithLoading = (Component) => (props) =>
  (
    // Because ReactLive doesn't render a Suspense around what it renders.
    <React.Suspense fallback="loading">
      <Component {...props} />
    </React.Suspense>
  );

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...juiComponents,
  ExampleApp: WithLoading(React.lazy(() => import("jui-example-app/src/App"))),
  darculaThemeJson,
  lightThemeJson,
  highContrastThemeJson,
  MonacoEditor: WithLoading(React.lazy(() => import("@monaco-editor/react"))),
};

export default ReactLiveScope;
