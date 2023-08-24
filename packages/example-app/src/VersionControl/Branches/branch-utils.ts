import git from "isomorphic-git";

/**
 * Returns tracking branch for a given local branch
 */
export async function getTrackingBranch({
  fs,
  dir,
  localBranchName,
}: Pick<Parameters<typeof git["getConfig"]>[0], "fs" | "dir"> & {
  localBranchName: string;
}): Promise<string | null> {
  const mergeRef = await git.getConfig({
    fs,
    dir,
    path: `branch.${localBranchName}.merge`,
  });
  const remote = await git.getConfig({
    fs,
    dir,
    path: `branch.${localBranchName}.remote`,
  });
  return mergeRef && remote
    ? `${remote}/${mergeRef.replace(/^refs\/heads\//, "")}`
    : null;
}
