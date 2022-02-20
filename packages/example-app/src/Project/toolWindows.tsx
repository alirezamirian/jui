import React from "react";
import { indexBy } from "ramda";
import { ProjectViewPane } from "../ProjectView/ProjectViewPane";
import { ProjectViewActionButtons } from "../ProjectView/ProjectViewActionButtons";
import {
  DefaultToolWindow,
  MultiContentToolWindow,
  MultiContentToolWindowContent,
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
    id: "project",
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
    id: "terminal",
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
    id: "commit",
    title: "Commit",
    icon: "toolwindows/toolWindowCommit",
    element: (
      <MultiContentToolWindow>
        <MultiContentToolWindowContent
          tabContent={
            <>
              Commit to <CurrentBranchName />
            </>
          }
          key="commit"
        >
          <ChangesViewPane />
        </MultiContentToolWindowContent>
      </MultiContentToolWindow>
    ),
    initialState: toolWindowState({ anchor: "left", isVisible: false }),
  },
];
export const windowById = indexBy(({ id }) => id, windows);
