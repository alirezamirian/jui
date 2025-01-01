import { atom } from "jotai";

import {
  activePathExistsAtom,
  activePathsAtom,
} from "../../Project/project.state";
import { notImplemented } from "../../Project/notImplemented";
import { VcsActionIds } from "../VcsActionIds";
import { actionAtom } from "../../actionAtom";

export const copyPathFromRepositoryRootActionAtom = actionAtom({
  id: VcsActionIds.CopyPathFromRepositoryRootProvider,
  title: "Path From Repository Root",
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  actionPerformed: async ({ get }) => {
    notImplemented();
    const activePaths = get(activePathsAtom);
    if (activePaths.length === 0) {
      return;
    }
  },
});
