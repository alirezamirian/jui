import React from "react";
import { useRecoilValue } from "recoil";
import {
  ActionButton,
  ActionDefinition,
  CommonActionId,
  DefaultToolWindow,
  PlatformIcon,
  useTreeActions,
} from "@intellij-platform/core";

import {
  projectViewTreeRefState,
  useSelectPathInProjectView,
} from "./ProjectView.state";
import { ProjectViewPane } from "./ProjectViewPane";
import { activeEditorTabState } from "../Editor/editor.state";
import { ProjectViewActionIds } from "./ProjectViewActionIds";
import { deleteActionState } from "./actions/deleteAction";

const { SELECT_IN_PROJECT_VIEW } = ProjectViewActionIds;

export function ProjectToolWindow() {
  const treeRef = useRecoilValue(projectViewTreeRefState);
  const actions = useTreeActions({ treeRef });
  // TODO: SelectInProjectView should be provided at project level, allowing potential shortcut to be globally
  //  accessible, and allowing other UI parts than editor's active tab, to set the context of "file" which needs to be
  //  opened in project view.
  const projectViewActions = useProjectViewActions();
  return (
    <DefaultToolWindow
      headerContent="Project"
      actions={[...actions, ...projectViewActions]}
      additionalActions={
        <>
          <ActionButton actionId={SELECT_IN_PROJECT_VIEW} />
          <ActionButton actionId={CommonActionId.EXPAND_ALL} />
          <ActionButton actionId={CommonActionId.COLLAPSE_ALL} />
        </>
      }
    >
      <ProjectViewPane />
    </DefaultToolWindow>
  );
}

function useProjectViewActions(): Array<ActionDefinition> {
  // improvement: for rendering, we only depend on whether activeTab is null or not. A selector can be defined for that
  // to prevent unnecessary re-rendering. The active tab, could be read from the state snapshot, in the handler callback.
  const activeTab = useRecoilValue(activeEditorTabState);

  const selectPathInProjectView = useSelectPathInProjectView();
  const selectOpenedFile = () => {
    if (activeTab) {
      selectPathInProjectView(activeTab.filePath);
    }
  };
  const deleteAction = useRecoilValue(deleteActionState);

  return [
    {
      id: SELECT_IN_PROJECT_VIEW,
      title: "Select Opened File",
      icon: <PlatformIcon icon="general/locate" />,
      actionPerformed: selectOpenedFile,
      isDisabled: !activeTab,
      description: "Selects a context file in the Project View",
    },
    deleteAction, // could have been on project level, if it could handle delete in editor as well
  ];
}
