import React from "react";
import { RecoilRoot } from "recoil";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";
import { SampleRepoInitializer } from "./SampleRepoInitializer";

export const App = () => {
  return (
    <RecoilRoot>
      <DefaultSuspense>
        <SampleRepoInitializer>
          <Project />
        </SampleRepoInitializer>
      </DefaultSuspense>
    </RecoilRoot>
  );
};
