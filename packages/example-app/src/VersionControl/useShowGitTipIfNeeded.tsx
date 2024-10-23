import {
  BalloonActionLink,
  PlatformIcon,
  useBalloonManager,
  usePerformAction,
} from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { vcsRootsState } from "./file-status.state";

let notified = false;
export const useShowGitTipIfNeeded = () => {
  const balloonManager = useBalloonManager();
  const vcsRoots = useRecoilValue(vcsRootsState);
  const performAction = usePerformAction();

  return useRecoilCallback(
    ({ reset }) =>
      async () => {
        if (vcsRoots.length < 2 && !notified) {
          notified = true;
          balloonManager.showSticky({
            title: "Clone another repository",
            icon: <PlatformIcon icon="actions/quickfixOffBulb.svg" />,
            body: "Git integration in the example app supports multiple repos within the same project. See it in action by cloning another repo",
            actions: (
              <>
                <BalloonActionLink
                  onPress={() => {
                    performAction("ExampleApp.cloneExampleRepo");
                  }}
                >
                  Clone another repo
                </BalloonActionLink>
              </>
            ),
          });
        }
      },
    []
  );
};
