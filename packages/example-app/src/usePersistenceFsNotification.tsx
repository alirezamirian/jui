import { BalloonActionLink, useBalloonManager } from "@intellij-platform/core";
import path from "path";
import React, { useEffect } from "react";

import { persistentFsPreference, switchToPersistentFS } from "./fs/fs";
import { useRunTask } from "./tasks";

export function usePersistenceFsNotification() {
  const balloons = useBalloonManager();

  const runTask = useRunTask();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (persistentFsPreference.get() == undefined) {
        balloons.showSticky({
          title: "Switch to IndexedDB filesystem",
          body: "By default an in-memory filesystem is used to have a faster git clone. But it means all changes will be lost upon refresh. You can switch in the background to a persistence fs implementation which uses IndexedDB to store files.",
          actions: (
            <>
              <BalloonActionLink
                onPress={() => {
                  runTask(
                    { title: "Switching to IndexedDB FS", isCancelable: true },
                    async ({ setIndeterminate, setText }, cancelSignal) => {
                      setText("Copying ...");
                      setIndeterminate(true);
                      await switchToPersistentFS({
                        cancelSignal,
                        onCopy: (filepath) => {
                          setText(`Copying ${path.dirname(filepath)}`);
                        },
                      })
                        .then(() => {
                          persistentFsPreference.set("yes");
                        })
                        .catch(() => {
                          // Do we need to do anything upon cancelation?
                        });
                    }
                  );
                }}
              >
                Switch to IndexedDB FS
              </BalloonActionLink>
              <BalloonActionLink
                onPress={() => persistentFsPreference.set("no")}
              >
                Don't ask again
              </BalloonActionLink>
            </>
          ),
        });
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
}
