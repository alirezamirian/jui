import React from "react";
import path from "path";
import {
  ActionTooltip,
  MultiViewToolWindow,
  TooltipTrigger,
} from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { ChangesViewPane } from "./Changes/ChangesView/ChangesViewPane";
import { RecoilValue, selector, useRecoilValue } from "recoil";
import { allChangesState } from "./Changes/change-lists.state";
import { vcsRootForFile } from "./file-status.state";
import { repoBranchesState } from "./Branches/branches.state";
import { changesGroupingState } from "./Changes/ChangesView/ChangesView.state";

export const COMMIT_TOOLWINDOW_ID = "Commit";

const changesBranchesState = selector({
  key: "vcs/commitToolWindow/changedRepos",
  get: ({ get }) => {
    const changesRepoRoots = get(allChangesState)
      .map((change) => get(vcsRootForFile(change.after.path)))
      .filter(notNull);

    return changesRepoRoots.map((repoRoot) => ({
      repoRoot,
      branch: get(repoBranchesState(repoRoot)).currentBranch,
    }));
  },
});

export const CommitToolWindow = () => {
  const areChangesGroupedByRepo = useRecoilValue(
    changesGroupingState("repository")
  );
  const changesBranches = useRecoilValue(changesBranchesState);
  const title =
    !areChangesGroupedByRepo && changesBranches[0]
      ? `Commit to ${changesBranches[0]?.branch?.name || "!"}`
      : "Commit";

  return (
    <MultiViewToolWindow>
      <MultiViewToolWindow.View
        tabContent={
          <TooltipTrigger
            isDisabled={areChangesGroupedByRepo || changesBranches.length === 0}
            tooltip={
              <ActionTooltip
                actionName={
                  <ChangesBranches changesBranches={changesBranches} />
                }
              />
            }
          >
            <span>{title}</span>
          </TooltipTrigger>
        }
        key="commit"
      >
        <ChangesViewPane />
      </MultiViewToolWindow.View>
    </MultiViewToolWindow>
  );
};

type RecoilValueType<T extends RecoilValue<any>> = T extends RecoilValue<
  infer R
>
  ? R
  : never;

function ChangesBranches({
  changesBranches,
}: {
  changesBranches: RecoilValueType<typeof changesBranchesState>;
}) {
  return (
    <table>
      {changesBranches
        .map(({ branch, repoRoot }) => {
          if (branch) {
            const mapping = branch.trackingBranch
              ? `${branch.name} → ${branch.trackingBranch}`
              : changesBranches.length > 1
              ? `${branch.name} (no tracking branch)`
              : "No tracking branch";

            return changesBranches.length > 1 ? (
              <tr key={repoRoot}>
                <td>{path.basename(repoRoot)}: &nbsp;</td>
                <td>{mapping}</td>
              </tr>
            ) : (
              <tr key={repoRoot}>
                <td>{mapping}</td>
              </tr>
            );
          }
          return null;
        })
        .filter(notNull)}
    </table>
  );
}
