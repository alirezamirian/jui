import React from "react";
import { RecoilRoot } from "recoil";
import { DefaultSuspense } from "./DefaultSuspense";
import { Project } from "./Project/Project";

export const App = () => {
  return (
    <RecoilRoot>
      <DefaultSuspense>
        <Project />
      </DefaultSuspense>
    </RecoilRoot>
  );
};
