import React from "react";
import { VcsDirectoryMapping } from "./file-status";
import { currentBranchState } from "./Changes/ChangesView/ChangesView.state";
import { useRecoilValue } from "recoil";

export const CurrentBranchName = ({ repo }: { repo?: VcsDirectoryMapping }) => {
  const branch = useRecoilValue(currentBranchState(repo?.dir ?? ""));
  return <>{branch}</>;
};
