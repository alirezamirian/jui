import React from "react";
import { atom, useAtomValue } from "jotai";
import {
  ActionTooltip,
  MultiViewToolWindow,
  TooltipTrigger,
} from "@intellij-platform/core";

import { ChangesViewPane } from "./Changes/ChangesView/ChangesViewPane";
import { vcsFootForFileAtom } from "./file-status.state";
import { LocalBranch, repoBranchesAtom } from "./Branches/branches.state";
import { changesGroupingActiveState } from "./Changes/ChangesView/ChangesView.state";
import { TrackingBranchInfo } from "./TrackingBranchInfo";
import { Change } from "./Changes/Change";
import { allChangesAtom } from "./Changes/changes.state";

export const COMMIT_TOOLWINDOW_ID = "Commit";

const changesBranchesAtom = atom(
  async (get): Promise<Array<{ repoRoot: string; branch: LocalBranch }>> => {
    const changesRepoRoots = (
      await Promise.all(
        get(allChangesAtom).map((change) =>
          get(vcsFootForFileAtom(Change.path(change)))
        )
      )
    ).filter((i) => i != null);

    return (
      await Promise.all(
        changesRepoRoots.map(async (repoRoot) => {
          const branch = (await get(repoBranchesAtom(repoRoot))).currentBranch;
          return branch
            ? {
                repoRoot,
                branch,
              }
            : null;
        })
      )
    ).filter((i) => i != null);
  }
);

export const CommitToolWindow = () => {
  const areChangesGroupedByRepo = useAtomValue(
    changesGroupingActiveState("repository")
  );
  const changesBranches = useAtomValue(changesBranchesAtom);
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
