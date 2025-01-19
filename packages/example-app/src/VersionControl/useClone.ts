import path from "path";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useRunTask } from "../tasks";
import { cloneRepo } from "../ProjectInitializer";
import { _balloonManagerRef } from "../Project/notImplemented";
import { dirContentAtom } from "../fs/fs.state";
import { vcsRootsAtom } from "./file-status.state";

export function useClone() {
  const runTask = useRunTask();
  const setVcsRoots = useSetAtom(vcsRootsAtom);

  return useAtomCallback(
    useCallback(
      (
        _get,
        set,
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
        runTask(
          {
            title: `Cloning source repository ${url}`,
          },
          {
            onFinished: onSuccess,
            run: async ({
              setIndeterminate,
              setFraction,
              setSecondaryText,
            }) => {
              await cloneRepo({
                dir,
                url,
                // TODO: handle onAuthFailure, onAuth, and maybe onMessage
                onProgress: (progress) => {
                  if (progress.total) {
                    const fraction = progress.loaded / progress.total;
                    setFraction(fraction);
                    setSecondaryText(
                      `${progress.phase}: ${Math.round(fraction * 100)}% ${
                        progress.loaded
                      }/${progress.total}`
                    );
                  } else {
                    setSecondaryText(progress.phase);
                    setIndeterminate(true);
                  }
                },
              }).then(
                () => {
                  setVcsRoots((roots) =>
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
          }
        );
      },
      []
    )
  );
}
