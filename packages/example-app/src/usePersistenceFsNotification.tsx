import { atom, useSetRecoilState } from "recoil";
import { BalloonActionLink, useBalloons } from "@intellij-platform/core";
import React, { useEffect } from "react";
// @ts-expect-error caf doesn't have typing :/
import CAF from "caf";
import { persistentFsPreference, switchToPersistentFS } from "./fs/fs";
import path from "path";

export interface ProcessState {
  state:
    | "STARTED"
    | "PAUSED"
    | "PAUSING"
    | "CANCELED"
    | "CANCELING"
    | "FINISHED";
  /**
   * between 1 and 100
   */
  progress: number;
  isIndeterminate: boolean;
  name: string;
  details: string;
  onCancel?: () => void;
  onPause?: () => void;
}

export const switchToPersistentFsProcess = atom<ProcessState | null>({
  key: "switchToPersistentFsProcess",
  default: null,
});

export function usePersistenceFsNotification() {
  const balloons = useBalloons();
  const setProcessState = useSetRecoilState(switchToPersistentFsProcess);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (persistentFsPreference.get() == undefined) {
        balloons.showSticky({
          title: "Switch to IndexedDB filesystem",
          body:
            "By default an in-memory filesystem is used to have a faster git clone. But it means all changes will be lost upon refresh. You can switch in the background to a persistence fs implementation which uses IndexedDB to store files.",
          actions: (
            <>
              <BalloonActionLink
                onPress={() => {
                  const token = new CAF.cancelToken();
                  setProcessState({
                    details: "Copying ...",
                    isIndeterminate: true,
                    state: "STARTED",
                    progress: 0,
                    onCancel: () => {
                      token.abort("canceled");
                    },
                    name: "Switching to IndexedDB FS",
                  });
                  const update = (updates: Partial<ProcessState>) =>
                    setProcessState((state) =>
                      state ? { ...state, ...updates } : null
                    );
                  switchToPersistentFS({
                    cancelSignal: token.signal,
                    onCopy: (filepath) => {
                      update({ name: `Copying ${path.dirname(filepath)}` });
                    },
                  })
                    .then(() => {
                      persistentFsPreference.set("yes");
                    })
                    .catch((e) => {
                      if (e !== "canceled") {
                        console.error(
                          "Error during switch to persistent FS:",
                          e
                        );
                      }
                    })
                    .finally(() => {
                      setProcessState(null);
                    });
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
