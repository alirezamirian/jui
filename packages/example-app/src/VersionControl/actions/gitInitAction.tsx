import git from "isomorphic-git";
import { fs } from "../../fs/fs";
import { currentProjectAtom } from "../../Project/project.state";
import { VcsActionIds } from "../VcsActionIds";
import {
  refreshRepoStatusesCallback,
  vcsRootsAtom,
} from "../file-status.state";
import { actionAtom } from "../../actionAtom";

/**
 * FIXME: action is not enabled on repo roots.
 * FIXME(maybe): if repo status is being updated, action either remains disabled or just doesn't work (didn't check which)
 *  Maybe not much to do here if the action remains disabled because of unknown status.
 * TODO: task API can be used to make this a task.
 */
export const gitInitActionAtom = actionAtom({
  id: VcsActionIds.GIT_INIT,
  title: "Create Git Repository...",
  actionPerformed: async ({ get, set }) => {
    // TODO: open a path selector to select the path where the git repo should be initialized
    const project = get(currentProjectAtom);
    const dir = project.path;
    await git.init({ fs, dir });
    set(vcsRootsAtom, (roots) =>
      roots
        .filter((root) => root.dir !== dir)
        .concat({
          vcs: "Git",
          dir,
        })
    );
    await refreshRepoStatusesCallback(get, set);
  },
});
