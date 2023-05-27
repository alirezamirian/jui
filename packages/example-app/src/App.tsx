import React, { CSSProperties, useRef } from "react";
import { RecoilRoot } from "recoil";
import git from "isomorphic-git";
import {
  BalloonManager,
  KeymapProvider,
  PopupManager,
  ToolWindowRefValue,
} from "@intellij-platform/core";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";
import { fs, WaitForFs } from "./fs/fs";
import { exampleAppKeymap } from "./exampleAppKeymap";
import { ToolWindowsRefContext } from "./Project/useToolWindowManager";

// useful globals for debugging purposes
(window as any).git = git;
(window as any).fs = fs;

/**
 * Example app root component. It expects ThemeProvider to be provided based on where it's rendered.
 */
export const App = ({ height }: { height?: CSSProperties["height"] }) => {
  const toolWindowRef = useRef<ToolWindowRefValue>(null);
  return (
    // TODO: add an error boundary
    <DefaultSuspense>
      <WaitForFs>
        <SampleRepoInitializer>
          <KeymapProvider keymap={exampleAppKeymap}>
            <RecoilRoot>
              <PopupManager>
                {/* disablePortal to make example app more portable*/}
                <BalloonManager disablePortal>
                  <ToolWindowsRefContext.Provider value={toolWindowRef}>
                    <Project height={height} toolWindowRef={toolWindowRef} />
                  </ToolWindowsRefContext.Provider>
                </BalloonManager>
              </PopupManager>
            </RecoilRoot>
          </KeymapProvider>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
