import React from "react";
import { useAtomValue } from "jotai";

import {
  ActionButton,
  ActionDefinition,
  CommonActionId,
  DefaultToolWindow,
  PlatformIcon,
  useTreeActions,
} from "@intellij-platform/core";
import {
  projectViewTreeRefAtom,
  useSelectPathInProjectView,
} from "./ProjectView.state";
import { ProjectViewPane } from "./ProjectViewPane";
import { activeEditorTabAtom } from "../Editor/editor.state";
import { ProjectViewActionIds } from "./ProjectViewActionIds";
import { deleteActionAtom } from "./actions/deleteAction";
import { copyActionAtom } from "./actions/copyAction";
import { cutActionAtom } from "./actions/cutAction";
import { pasteActionAtom } from "./actions/pasteAction";
import { notNull } from "@intellij-platform/core/utils/array-utils";

const { SELECT_IN_PROJECT_VIEW } = ProjectViewActionIds;

export function ProjectToolWindow() {
  const treeRef = useAtomValue(projectViewTreeRefAtom);
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
  const activeTab = useAtomValue(activeEditorTabAtom);

  const selectPathInProjectView = useSelectPathInProjectView();
  const selectOpenedFile = () => {
    if (activeTab) {
      selectPathInProjectView(activeTab.filePath);
    }
  };

  return [
    {
      id: SELECT_IN_PROJECT_VIEW,
      title: "Select Opened File",
      icon: <PlatformIcon icon="general/locate" />,
      actionPerformed: selectOpenedFile,
      isDisabled: !activeTab,
      description: "Selects a context file in the Project View",
    },
    useAtomValue(deleteActionAtom), // could have been on project level, if it could handle delete in editor as well
    useAtomValue(cutActionAtom),
    useAtomValue(copyActionAtom),
    useAtomValue(pasteActionAtom),
  ].filter(notNull);
}
