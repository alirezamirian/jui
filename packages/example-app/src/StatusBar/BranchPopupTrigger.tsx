import {
  ActionTooltip,
  PlatformIcon,
  StatusBarWidget,
  TooltipTrigger,
} from "@intellij-platform/core";
import React from "react";

import { activeFileRepoHeadState } from "../VersionControl/active-file.state";
import { useLatestRecoilValue } from "../recoil-utils";

export function BranchPopupTrigger() {
  const gitRepoHead = useLatestRecoilValue(activeFileRepoHeadState);

  return (
    gitRepoHead && (
      <TooltipTrigger
        tooltip={
          <ActionTooltip
            actionName={
              gitRepoHead.detached
                ? "Git: Detached HEAD doesn't point to any branch"
                : `Git Branch: ${gitRepoHead.head}`
            }
          />
        }
      >
        <StatusBarWidget
          icon={
            <PlatformIcon
              icon={
                gitRepoHead.detached ? "general/warning.svg" : "vcs/branch.svg"
              }
            />
          }
          label={gitRepoHead.head.slice(
            0,
            gitRepoHead.detached ? 8 : undefined
          )}
        />
      </TooltipTrigger>
    )
  );
}
