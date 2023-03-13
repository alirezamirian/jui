import React, { CSSProperties } from "react";
import { RecoilRoot } from "recoil";
import git from "isomorphic-git";
import { BalloonsProvider, KeymapProvider } from "@intellij-platform/core";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";
import { fs, WaitForFs } from "./fs/fs";
import { exampleAppKeymap } from "./exampleAppKeymap";

// useful globals for debugging purposes
(window as any).git = git;
(window as any).fs = fs;

/**
 * Example app root component. It expects ThemeProvider to be provided based on where it's rendered.
 */
export const App = ({ height }: { height?: CSSProperties["height"] }) => {
  return (
    // TODO: add an error boundary
    <DefaultSuspense>
      <WaitForFs>
        <SampleRepoInitializer>
          <KeymapProvider keymap={exampleAppKeymap}>
            <RecoilRoot>
              <BalloonsProvider disablePortal>
                {/* disablePortal to make example app more portable*/}
                <Project height={height} />
              </BalloonsProvider>
            </RecoilRoot>
          </KeymapProvider>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
