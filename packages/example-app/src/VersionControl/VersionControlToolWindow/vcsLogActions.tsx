import { actionAtom } from "../../actionAtom";
import { VcsActionIds } from "../VcsActionIds";
import { CommonActionId, PlatformIcon } from "@intellij-platform/core";
import copyToClipboard from "clipboard-copy";
import { atom, Atom } from "jotai";
import React from "react";
import { unwrapLatestOrNull } from "../../atom-utils/unwrapLatest";

export const createCopyRevisionNumberActionAtom = (
  revisionNumbersAtom: Atom<Promise<string[]>>
) => {
  const latestRevisionNumbersAtom = unwrapLatestOrNull(revisionNumbersAtom);
  return actionAtom({
    id: VcsActionIds.COPY_REVISION_NUMBER,
    title: "Copy Revision Number",
    icon: <PlatformIcon icon="actions/copy.svg" />,
    isDisabled: atom((get) => !get(latestRevisionNumbersAtom)?.length),
    useShortcutsOf: CommonActionId.COPY_REFERENCE,
    actionPerformed: async ({ get }) => {
      const selectedCommits = await get(revisionNumbersAtom);
      copyToClipboard(selectedCommits.join(" ")).catch(console.error);
    },
  });
};
