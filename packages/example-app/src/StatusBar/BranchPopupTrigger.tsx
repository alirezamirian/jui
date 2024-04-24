import {
  ActionTooltip,
  PlatformIcon,
  PopupTrigger,
  StatusBarWidget,
  TooltipTrigger,
} from "@intellij-platform/core";
import React from "react";

import { activeFileRepoHeadState } from "../VersionControl/active-file.state";
import { useLatestRecoilValue } from "../recoil-utils";
import { BranchesPopup } from "../VersionControl/Branches/BranchesPopup";
import { useShowGitTipIfNeeded } from "../VersionControl/useShowGitTipIfNeeded";

export function BranchPopupTrigger() {
  const [gitRepoHead] = useLatestRecoilValue(activeFileRepoHeadState);
  const maybeShowGitCloneTip = useShowGitTipIfNeeded();

  return (
    gitRepoHead && (
      <PopupTrigger
        placement="top"
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setTimeout(maybeShowGitCloneTip, 500);
          }
        }}
        popup={({ close }) => <BranchesPopup close={close} />}
      >
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
                  gitRepoHead.detached
                    ? "general/warning.svg"
                    : "vcs/branch.svg"
                }
              />
            }
            label={gitRepoHead.head.slice(
              0,
              gitRepoHead.detached ? 8 : undefined
            )}
          />
        </TooltipTrigger>
      </PopupTrigger>
    )
  );
}
