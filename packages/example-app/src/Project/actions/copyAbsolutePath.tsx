import { atom } from "jotai";
import { activePathExistsAtom, activePathsAtom } from "../project.state";
import { projectActionIds } from "../projectActionIds";
import { notImplemented } from "../notImplemented";
import { actionAtom } from "../../actionAtom";

export const copyAbsolutePathActionAtom = actionAtom({
  id: projectActionIds.CopyAbsolutePath,
  title: "Absolute Path",
  isDisabled: atom((get) => !get(activePathExistsAtom)),
  useShortcutsOf: "CopyPaths",
  actionPerformed: async ({ get }) => {
    notImplemented();
    const activePaths = get(activePathsAtom);
    if (activePaths.length === 0) {
      return;
    }
  },
});
