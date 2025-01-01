import { atom } from "jotai";

import { activePathExistsAtom, activePathsAtom } from "../project.state";
import { projectActionIds } from "../projectActionIds";
import { notImplemented } from "../notImplemented";
import { actionAtom } from "../../actionAtom";

export const copyFilenameActionAtom = actionAtom({
  id: projectActionIds.CopyFileName,
  title: "File Name",
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async ({ get }) => {
    notImplemented();
    const activePaths = get(activePathsAtom);
    if (activePaths.length === 0) {
      return;
    }
  },
});
