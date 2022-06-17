import React from "react";
import { RecoilRoot } from "recoil";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";
import { BalloonsProvider, StyledBalloonsStack } from "@intellij-platform/core";
import { WaitForFs } from "./fs/fs";
import styled from "styled-components";

const StyledBalloonContainer = styled(StyledBalloonsStack)`
  position: absolute;
`;
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
            <BalloonsProvider
              disablePortal
              BalloonsContainer={StyledBalloonContainer}
            >
              <Project />
            </BalloonsProvider>
          </RecoilRoot>
        </SampleRepoInitializer>
      </WaitForFs>
    </DefaultSuspense>
  );
};

export default App;
