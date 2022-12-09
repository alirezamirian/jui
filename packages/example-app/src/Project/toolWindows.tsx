import React from "react";
import {
  DefaultToolWindow,
  MultiViewToolWindow,
  PlatformIcon,
  ToolWindowState,
  toolWindowState,
} from "@intellij-platform/core";
import { Terminal } from "../Terminal";
import { ChangesViewPane } from "../VersionControl/Changes/ChangesView/ChangesViewPane";
import { CurrentBranchName } from "../VersionControl/CurrentBranchName";
import { ProjectToolWindow } from "../ProjectView/ProjectToolWindow";

export type ToolWindowDescriptor = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactElement;
  initialState: ToolWindowState;
};
export const toolWindows: ToolWindowDescriptor[] = [
  {
    id: "Project",
    title: "Project",
    icon: <PlatformIcon icon="toolwindows/toolWindowProject" />,
    content: <ProjectToolWindow />,
    initialState: toolWindowState({ isVisible: true, weight: 0.23 }),
  },
  {
    id: "Terminal",
    title: "Terminal",
    icon: <PlatformIcon icon="toolwindows/toolWindowProject" />,
    content: (
      <DefaultToolWindow headerContent="Terminal">
        <Terminal />
      </DefaultToolWindow>
    ),
    initialState: toolWindowState({ anchor: "bottom" }),
  },
  {
    id: "Commit",
    title: "Commit",
    icon: <PlatformIcon icon="toolwindows/toolWindowCommit" />,
    content: (
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
