import { useRunTask } from "../tasks";
import { useRefreshCurrentProjectFiles } from "../Project/project.state";
import { vcsRootsState } from "./file-status.state";
import { useCallback } from "react";
import { cloneRepo } from "../ProjectInitializer";
import { _balloonManagerRef } from "../Project/notImplemented";
import { useSetRecoilState } from "recoil";

export function useClone() {
  const runTask = useRunTask();
  const refreshProjectFiles = useRefreshCurrentProjectFiles();
  const setVcsRoots = useSetRecoilState(vcsRootsState);

  return useCallback(
    ({
      url,
      dir,
      onSuccess,
    }: {
      url: string;
      dir: string;
      onSuccess?: () => void;
    }) => {
      runTask(
        {
          title: `Cloning source repository ${url}`,
        },
        {
          onFinished: onSuccess,
          run: async ({ setIndeterminate, setFraction, setSecondaryText }) => {
            await cloneRepo({
              dir: dir,
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
                refreshProjectFiles(); // FIXME: flashes the whole page
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
  );
}
