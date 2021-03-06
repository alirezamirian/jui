import React from "react";
import { RecoilRoot } from "recoil";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";
import { BalloonsProvider } from "@intellij-platform/core";
import { WaitForFs } from "./fs/fs";

/**
 * Example app root component. It expects ThemeProvider to be provided based on where it's rendered.
 */
export const App = () => {
  return (
    // TODO: add an error boundary
    <DefaultSuspense>
      <WaitForFs>
        <SampleRepoInitializer>
          <RecoilRoot>
            <BalloonsProvider disablePortal>
              {/* disablePortal to make example app more portable*/}
              <Project />
            </BalloonsProvider>
          </RecoilRoot>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
