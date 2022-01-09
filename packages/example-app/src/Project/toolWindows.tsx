import React from "react";
import { indexBy } from "ramda";
import { ProjectViewPane } from "../ProjectView/ProjectViewPane";
import { ProjectViewActionButtons } from "../ProjectView/ProjectViewActionButtons";
import { toolWindowState } from "@intellij-platform/core";
import { Terminal } from "../Terminal";

const windows = [
  {
    id: "project",
    title: "Project",
    icon: "toolwindows/toolWindowProject",
    content: <ProjectViewPane />,
    additionalActions: <ProjectViewActionButtons />,
    initialState: toolWindowState({ isVisible: true, weight: 0.22 }),
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "toolwindows/toolWindowProject",
    content: <Terminal />,
    additionalActions: null,
    initialState: toolWindowState({ anchor: "bottom" }),
  },
];
export const windowById = indexBy(({ id }) => id, windows);
