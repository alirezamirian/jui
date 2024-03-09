import React from "react";
import { selector, useRecoilValue } from "recoil";
import {
  ActionTooltip,
  MultiViewToolWindow,
  TooltipTrigger,
} from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { ChangesViewPane } from "./Changes/ChangesView/ChangesViewPane";
import { allChangesState } from "./Changes/change-lists.state";
import { vcsRootForFile } from "./file-status.state";
import { LocalBranch, repoBranchesState } from "./Branches/branches.state";
import { changesGroupingActiveState } from "./Changes/ChangesView/ChangesView.state";
import { TrackingBranchInfo } from "./TrackingBranchInfo";
import { Change } from "./Changes/Change";

export const COMMIT_TOOLWINDOW_ID = "Commit";

const changesBranchesState = selector({
  key: "vcs/commitToolWindow/changedRepos",
  get: ({ get }): Array<{ repoRoot: string; branch: LocalBranch }> => {
    const changesRepoRoots = get(allChangesState)
      .map((change) => get(vcsRootForFile(Change.path(change))))
      .filter(notNull);

    return changesRepoRoots
      .map((repoRoot) => {
        const branch = get(repoBranchesState(repoRoot)).currentBranch;
        return branch
          ? {
              repoRoot,
              branch,
            }
          : null;
      })
      .filter(notNull);
  },
});

export const CommitToolWindow = () => {
  const areChangesGroupedByRepo = useRecoilValue(
    changesGroupingActiveState("repository")
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
                actionName={<TrackingBranchInfo branches={changesBranches} />}
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
