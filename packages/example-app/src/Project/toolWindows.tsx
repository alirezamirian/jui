import React, { Suspense } from "react";
import {
  DefaultToolWindow,
  PlatformIcon,
  ToolWindowState,
  toolWindowState,
} from "@intellij-platform/core";

import { Terminal } from "../Terminal";
import { ProjectToolWindow } from "../ProjectView/ProjectToolWindow";
import {
  COMMIT_TOOLWINDOW_ID,
  CommitToolWindow,
} from "../VersionControl/CommitToolWindow";
import {
  VERSION_CONTROL_TOOLWINDOW_ID,
  VersionControlToolWindow,
} from "../VersionControl/VersionControlToolWindow/VersionControlToolWindow";

export type ToolWindowDescriptor = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactElement;
  showStripeButton?: boolean;
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
    id: COMMIT_TOOLWINDOW_ID,
    title: "Commit",
    icon: <PlatformIcon icon="toolwindows/toolWindowCommit" />,
    content: (
      <Suspense>
        <CommitToolWindow />
      </Suspense>
    ),
    initialState: toolWindowState({
      anchor: "left",
      isSplit: true, // Default is false in the original impl.
      isVisible: false,
    }),
  },
  {
    id: VERSION_CONTROL_TOOLWINDOW_ID,
    title: "Version Control",
    icon: <PlatformIcon icon="toolwindows/toolWindowChanges" />,
    content: (
      <Suspense>
        <VersionControlToolWindow />
      </Suspense>
    ),
    initialState: toolWindowState({
      anchor: "bottom",
      weight: 0.35,
    }),
  },
];
