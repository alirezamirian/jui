import path from "path";
import { useAtomCallback } from "jotai/utils";
import { _balloonManagerRef } from "../Project/notImplemented";
import { dirContentAtom } from "../fs/fs.state";
import { vcsRootsAtom } from "./file-status.state";
import { atomCallback } from "../atom-utils/atomCallback";
import { createGitTaskCallback } from "./createGitTaskCallback";
import { cloneRepo } from "./git-operations/git-http-operations";

const cloneCallback = atomCallback(
  { createGitTaskCallback },
  (
    { set, createGitTask },
    {
      url,
      dir,
      onSuccess,
    }: {
      url: string;
      dir: string;
      onSuccess?: () => void;
    }
  ) => {
    createGitTask({
      title: `Cloning source repository ${url}`,
      onFinished: onSuccess,
      run: async (gitArgs) => {
        await cloneRepo({
          dir,
          url,
          ...gitArgs,
        }).then(
          () => {
            set(vcsRootsAtom, (roots) =>
              roots.find((root) => root.dir === dir)
                ? roots
                : roots.concat({ vcs: "Git", dir })
            );
            // TODO: other directories within parent don't need a refresh.
            //  add an optimized way to refresh a single directory inside a directory
            set(dirContentAtom(path.resolve(dir, "..")));
          },
          (e) => {
            console.log("e", e);
            // FIXME: using useBalloonManager doesn't work here, because of how BalloonManager is rendered inside WindowManager
            _balloonManagerRef.value?.show({
              icon: "Error",
              title: "Clone failed",
              body: `Failed to clone git repo "${url} into ${dir}: ${e}"`,
            });
          }
        );
      },
    });
  }
);

export function useClone() {
  return useAtomCallback(cloneCallback);
}
