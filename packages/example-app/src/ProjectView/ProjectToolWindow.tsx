import React from "react";
import { useRecoilValue } from "recoil";
import { DefaultToolWindow, useTreeActions } from "@intellij-platform/core";
import { projectViewTreeRefState } from "./ProjectView.state";
import { ProjectViewPane } from "./ProjectViewPane";
import { ProjectViewActionButtons } from "./ProjectViewActionButtons";

export function ProjectToolWindow() {
  const treeRef = useRecoilValue(projectViewTreeRefState);
  const actions = useTreeActions({ treeRef });

  return (
    <DefaultToolWindow
      headerContent="Project"
      actions={actions}
      additionalActions={<ProjectViewActionButtons />}
    >
      <ProjectViewPane />
    </DefaultToolWindow>
  );
}
