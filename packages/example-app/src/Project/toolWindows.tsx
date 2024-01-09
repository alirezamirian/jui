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
import { UNSAFE_FocusRestoringSuspense } from "../UNSAFE_FocusRestoringSuspense";
import {
  VERSION_CONTROL_TOOLWINDOW_ID,
  VersionControlToolWindow,
} from "../VersionControl/VersionControlToolWindow/VersionControlToolWindow";

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
    id: COMMIT_TOOLWINDOW_ID,
    title: "Commit",
    icon: <PlatformIcon icon="toolwindows/toolWindowCommit" />,
    content: (
      <Suspense fallback={<UNSAFE_FocusRestoringSuspense />}>
        <CommitToolWindow />
      </Suspense>
    ),
    initialState: toolWindowState({ anchor: "left", isVisible: false }),
  },
  {
    id: VERSION_CONTROL_TOOLWINDOW_ID,
    title: "Version Control",
    icon: <PlatformIcon icon="toolwindows/toolWindowChanges" />,
    content: (
      <Suspense fallback={<UNSAFE_FocusRestoringSuspense />}>
        <VersionControlToolWindow />
      </Suspense>
    ),
    initialState: toolWindowState({ anchor: "bottom", weight: 0.35 }),
  },
];
