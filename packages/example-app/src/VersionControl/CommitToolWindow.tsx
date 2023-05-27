import React from "react";
import { MultiViewToolWindow } from "@intellij-platform/core";

import { CurrentBranchName } from "./CurrentBranchName";
import { ChangesViewPane } from "./Changes/ChangesView/ChangesViewPane";

export const COMMIT_TOOLWINDOW_ID = "Commit";

export const CommitToolWindow = () => {
  return (
    <MultiViewToolWindow>
      <MultiViewToolWindow.View
        tabContent={
          <>
            Commit to <CurrentBranchName />
          </>
        }
        key="commit"
      >
        <ChangesViewPane />
      </MultiViewToolWindow.View>
    </MultiViewToolWindow>
  );
};
