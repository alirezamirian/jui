import React from "react";
import { useAtomValue } from "jotai";
import { VcsDirectoryMapping } from "./file-status";
import { branchForPathAtoms } from "./Branches/branches.state";

export const RepoCurrentBranchName = ({
  repo,
}: {
  repo: VcsDirectoryMapping;
}) => {
  const branch = useAtomValue(branchForPathAtoms(repo.dir));
  return <>{branch}</>;
};
