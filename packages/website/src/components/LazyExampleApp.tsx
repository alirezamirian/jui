import React, { ComponentProps } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

import { ExampleContext } from "./ExampleContext";

const App = React.lazy(() => import("../../../example-app/src/App"));

export const LazyExampleApp = ({
  themeName = "darcula",
  children = (i) => i,
  ...otherProps
}: {
  themeName?: ComponentProps<typeof ExampleContext>["themeName"];
  children?: (app: React.ReactNode) => React.ReactNode;
} & ComponentProps<typeof App>) => {
  return (
    <BrowserOnly>
      {() => (
        <ExampleContext themeName={themeName}>
          <React.Suspense fallback="loading...">
            {children(<App {...otherProps} />)}
          </React.Suspense>
        </ExampleContext>
      )}
    </BrowserOnly>
  );
};
