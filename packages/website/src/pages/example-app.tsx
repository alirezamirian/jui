import BrowserOnly from "@docusaurus/BrowserOnly";
import { styled } from "@intellij-platform/core";
import React from "react";
import { ExampleContext } from "../components/ExampleContext";

const App = React.lazy(() => import("../../../example-app/src"));

const StyleNormalizer = styled.div`
  font-family: sans-serif;
  font-size: 14px;
`;

export default function ExampleAppPage(): JSX.Element {
  return (
    <BrowserOnly>
      {() => (
        <ExampleContext>
          <React.Suspense fallback="loading...">
            <StyleNormalizer>
              <App />
            </StyleNormalizer>
          </React.Suspense>
        </ExampleContext>
      )}
    </BrowserOnly>
  );
}
