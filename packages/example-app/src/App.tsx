import React from "react";
import { RecoilRoot } from "recoil";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";
import { BalloonsProvider } from "@intellij-platform/core";
import { WaitForFs } from "./fs/fs";

export const App = () => {
  return (
    // TODO: add an error boundary
    <DefaultSuspense>
      <WaitForFs>
        <SampleRepoInitializer>
          <RecoilRoot>
            <BalloonsProvider>
              <Project />
            </BalloonsProvider>
          </RecoilRoot>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};
