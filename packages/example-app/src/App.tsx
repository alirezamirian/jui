import React, { CSSProperties, useRef } from "react";
import { RecoilRoot } from "recoil";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import {
  BalloonManager,
  KeymapProvider,
  PopupManager,
  ToolWindowRefValue,
  WindowManager,
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
(window as any).http = http;

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
              <BalloonManager disablePortal>
                <WindowManager>
                  <PopupManager>
                    {/* disablePortal to make example app more portable*/}
                    <ToolWindowsRefContext.Provider value={toolWindowRef}>
                      <Project height={height} toolWindowRef={toolWindowRef} />
                    </ToolWindowsRefContext.Provider>
                  </PopupManager>
                </WindowManager>
              </BalloonManager>
            </RecoilRoot>
          </KeymapProvider>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
