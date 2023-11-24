import {
  BalloonActionLink,
  PlatformIcon,
  useBalloonManager,
} from "@intellij-platform/core";
import { useRunTask } from "../tasks";
import {
  sampleRepos,
  useRefreshCurrentProjectFiles,
} from "../Project/project.state";
import { cloneRepo, isSuccessfullyCloned } from "../SampleRepoInitializer";
import React from "react";
import { useRefreshVcsRoots } from "./file-status.state";
import { useRecoilCallback } from "recoil";

let notified = false;
export const useShowGitTipIfNeeded = () => {
  const balloonManager = useBalloonManager();
  const runTask = useRunTask();
  const refreshProjectFiles = useRefreshCurrentProjectFiles();
  const refreshVcsRoots = useRefreshVcsRoots();

  return useRecoilCallback(
    ({ reset }) =>
      async () => {
        const cloned = await isSuccessfullyCloned(sampleRepos.ExampleRepo.path);
        if (!cloned && !notified) {
          notified = true;
          balloonManager.showSticky({
            title: "Clone another repo",
            icon: <PlatformIcon icon="actions/quickfixOffBulb.svg" />,
            body: "Git integration in the example app supports multiple repos within the same project. See it in action by cloning another repo",
            actions: (
              <>
                <BalloonActionLink
                  onPress={() => {
                    runTask(
                      {
                        title: `Cloning source repository ${sampleRepos.ExampleRepo.url}`,
                      },
                      {
                        run: async ({
                          setIndeterminate,
                          setFraction,
                          setSecondaryText,
                        }) => {
                          await cloneRepo({
                            dir: sampleRepos.ExampleRepo.path,
                            url: sampleRepos.ExampleRepo.url,
                            onProgress: (progress) => {
                              if (progress.total) {
                                const fraction =
                                  progress.loaded / progress.total;
                                setFraction(fraction);
                                setSecondaryText(
                                  `${progress.phase}: ${Math.round(
                                    fraction * 100
                                  )}% ${progress.loaded}/${progress.total}`
                                );
                              } else {
                                setSecondaryText(progress.phase);
                                setIndeterminate(true);
                              }
                            },
                          }).then(
                            () => {
                              refreshVcsRoots();
                              refreshProjectFiles(); // FIXME: flashes the whole page
                            },
                            (e) => {
                              balloonManager.show({
                                icon: "Error",
                                title: "Clone failed",
                                body: `Failed to clone git repo "${sampleRepos.ExampleRepo.url} into ${sampleRepos.ExampleRepo.path}: ${e}"`,
                              });
                            }
                          );
                        },
                      }
                    );
                  }}
                >
                  Clone example-repo
                </BalloonActionLink>
              </>
            ),
          });
        }
      },
    []
  );
};
