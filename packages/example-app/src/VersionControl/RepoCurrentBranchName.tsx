import React from "react";
import { useRecoilValue } from "recoil";
import { VcsDirectoryMapping } from "./file-status";
import { branchForPathState } from "./Branches/branches.state";

export const RepoCurrentBranchName = ({
  repo,
}: {
  repo: VcsDirectoryMapping;
}) => {
  const branch = useRecoilValue(branchForPathState(repo.dir));
  return <>{branch}</>;
};
