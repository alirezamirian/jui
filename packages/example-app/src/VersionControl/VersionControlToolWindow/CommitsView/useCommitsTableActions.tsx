import copyToClipboard from "clipboard-copy";
import { useAtomValue } from "jotai";
import React from "react";
import {
  ActionDefinition,
  CommonActionId,
  PlatformIcon,
} from "@intellij-platform/core";
import { VcsActionIds } from "../../VcsActionIds";
import { allCommitsAtom, selectedCommitOids } from "./CommitsTable.state";
import { actionAtom } from "../../../actionAtom";

const refreshLogAction = actionAtom({
  id: VcsActionIds.LOG_REFRESH,
  title: "Refresh",
  icon: <PlatformIcon icon="actions/refresh.svg" />,
  useShortcutsOf: CommonActionId.REFRESH,
  actionPerformed: ({ set }) => {
    set(allCommitsAtom);
  },
});

const copyRevisionNumberAction = actionAtom({
  id: VcsActionIds.COPY_REVISION_NUMBER,
  title: "Copy Revision Number",
  icon: <PlatformIcon icon="actions/copy.svg" />,
  useShortcutsOf: CommonActionId.COPY_REFERENCE,
  actionPerformed: async ({ get }) => {
    const selectedCommits = await get(selectedCommitOids);
    copyToClipboard(selectedCommits.join(" ")).catch(console.error);
  },
});

export const useCommitsTableActions = (): ActionDefinition[] => {
  return [
    useAtomValue(copyRevisionNumberAction),
    useAtomValue(refreshLogAction),
  ];
};
