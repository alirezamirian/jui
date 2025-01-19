import {
  BalloonActionLink,
  PlatformIcon,
  useBalloonManager,
  usePerformAction,
} from "@intellij-platform/core";
import React from "react";
import { useAtomValue } from "jotai";
import { vcsRootsAtom } from "./file-status.state";

let notified = false;
export const useShowGitTipIfNeeded = () => {
  const balloonManager = useBalloonManager();
  const vcsRoots = useAtomValue(vcsRootsAtom);
  const performAction = usePerformAction();

  return async () => {
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
  };
};
