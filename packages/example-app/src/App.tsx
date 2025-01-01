import * as path from "path";
import React, { CSSProperties } from "react";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import {
  KeymapProvider,
  PopupManager,
  WindowManager,
} from "@intellij-platform/core";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { ProjectInitializer } from "./ProjectInitializer";
import { fs, WaitForFs } from "./fs/fs";
import { exampleAppKeymap } from "./exampleAppKeymap";
import "./jetbrains-mono-font.css";

// useful globals for debugging purposes
(window as any).git = git;
(window as any).fs = fs;
(window as any).path = path;
(window as any).http = http;

/**
 * Example app root component. It expects ThemeProvider to be provided based on where it's rendered.
 */
export const App = ({
  height,
  autoCloneSampleRepo,
}: {
  height?: CSSProperties["height"];
  autoCloneSampleRepo?: boolean;
}) => {
  return (
    // TODO: add an error boundary
    <DefaultSuspense>
      <WaitForFs>
        <ProjectInitializer autoCloneSampleRepo={autoCloneSampleRepo}>
          <KeymapProvider keymap={exampleAppKeymap}>
            <WindowManager>
              <PopupManager>
                <Project height={height} />
              </PopupManager>
            </WindowManager>
          </KeymapProvider>
        </ProjectInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
