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
import { createCopyRevisionNumberActionAtom } from "../vcsLogActions";

const refreshLogActionAtom = actionAtom({
  id: VcsActionIds.LOG_REFRESH,
  title: "Refresh",
  icon: <PlatformIcon icon="actions/refresh.svg" />,
  useShortcutsOf: CommonActionId.REFRESH,
  actionPerformed: ({ set }) => {
    set(allCommitsAtom);
  },
});

const copyRevisionNumberActionAtom =
  createCopyRevisionNumberActionAtom(selectedCommitOids);

export const useCommitsTableActions = (): ActionDefinition[] => {
  return [
    useAtomValue(copyRevisionNumberActionAtom),
    useAtomValue(refreshLogActionAtom),
  ];
};
