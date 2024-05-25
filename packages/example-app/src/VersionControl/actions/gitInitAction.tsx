import git from "isomorphic-git";
import { fs } from "../../fs/fs";
import { createAction } from "../../createAction";
import { currentProjectState } from "../../Project/project.state";
import { VcsActionIds } from "../VcsActionIds";
import { vcsRootsState } from "../file-status.state";

/**
 * FIXME: action is not enabled on repo roots.
 * FIXME(maybe): if repo status is being updated, action either remains disabled or just doesn't work (didn't check which)
 *  Maybe not much to do here if the action remains disabled because of unknown status.
 * TODO: task API can be used to make this a task.
 */
export const gitInitActionSelector = createAction({
  id: VcsActionIds.GIT_INIT,
  title: "Create Git Repository...",
  actionPerformed:
    ({ snapshot, set }) =>
    async () => {
      // TODO: open a path selector to select the path where the git repo should be initialized
      const project = await snapshot.getPromise(currentProjectState);
      const dir = project.path;
      await git.init({ fs, dir });
      set(vcsRootsState, (roots) =>
        roots
          .filter((root) => root.dir !== dir)
          .concat({
            vcs: "Git",
            dir,
          })
      );
    },
});
