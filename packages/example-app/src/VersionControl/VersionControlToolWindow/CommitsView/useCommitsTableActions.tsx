import { useRecoilCallback } from "recoil";
import React from "react";
import copyToClipboard from "clipboard-copy";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";
import { notImplemented } from "../../../Project/notImplemented";
import { VcsActionIds } from "../../VcsActionIds";
import { allCommitsState, selectedCommitsState } from "./CommitsTable.state";

export const useCommitsTableActions = (): ActionDefinition[] => {
  const copyRevisionNumber = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedCommits = snapshot
          .getLoadable(selectedCommitsState)
          .getValue();
        if (selectedCommits === "all") {
          notImplemented();
        } else {
          copyToClipboard([...selectedCommits].join(" ")).catch(console.error);
        }
      },
    []
  );

  const refreshLog = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(allCommitsState);
      },
    []
  );

  return [
    {
      id: VcsActionIds.COPY_REVISION_NUMBER,
      title: "Copy Revision Number",
      icon: <PlatformIcon icon="actions/copy.svg" />,
      useShortcutsOf: CommonActionId.COPY_REFERENCE,
      actionPerformed: copyRevisionNumber,
    },
    {
      id: VcsActionIds.LOG_REFRESH,
      title: "Refresh",
      icon: <PlatformIcon icon="actions/refresh.svg" />,
      useShortcutsOf: CommonActionId.REFRESH,
      actionPerformed: () => {
        refreshLog();
      },
    },
  ];
};
