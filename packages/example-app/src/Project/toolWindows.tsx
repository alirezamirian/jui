import React from "react";
import { indexBy } from "ramda";
import { ProjectViewPane } from "../ProjectView/ProjectViewPane";
import { ProjectViewActionButtons } from "../ProjectView/ProjectViewActionButtons";
import {
  DefaultToolWindow,
  MultiViewToolWindow,
  ToolWindowState,
  toolWindowState,
} from "@intellij-platform/core";
import { Terminal } from "../Terminal";
import { ChangesViewPane } from "../VersionControl/Changes/ChangesView/ChangesViewPane";
import { CurrentBranchName } from "../VersionControl/CurrentBranchName";

type ToolWindowDescriptor = {
  id: string;
  title: string;
  icon: string;
  element: React.ReactElement;
  initialState: ToolWindowState;
};
const windows: ToolWindowDescriptor[] = [
  {
    id: "Project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    element: (
      <DefaultToolWindow
        headerContent="Project"
        additionalActions={<ProjectViewActionButtons />}
      >
        <ProjectViewPane />
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ isVisible: true, weight: 0.22 }),
  },
  {
    id: "Terminal",
    title: "Terminal",
    icon: "toolwindows/toolWindowProject",
    element: (
      <DefaultToolWindow headerContent="Terminal">
        <Terminal />
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "bottom" }),
  },
  {
    id: "Commit",
    title: "Commit",
    icon: "toolwindows/toolWindowCommit",
    element: (
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
    ),
    initialState: toolWindowState({ anchor: "left", isVisible: false }),
  },
];
export const windowById = indexBy(({ id }) => id, windows);
