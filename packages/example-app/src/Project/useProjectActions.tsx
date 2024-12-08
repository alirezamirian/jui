import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  ActionContext,
  ActionDefinition,
  CommonActionId,
  useCreateDefaultActionGroup,
} from "@intellij-platform/core";

import { createFileActionState } from "./actions/createFileAction";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { createDirectoryActionState } from "./actions/createDirectoryAction";
import { projectActionIds } from "./projectActionIds";
import { copyFilenameActionState } from "./actions/copyFilename";
import { copyAbsolutePathActionState } from "./actions/copyAbsolutePath";
import { copyPathFromRepositoryRootActionState } from "../VersionControl/actions/copyPathFromRepositoryRoot";

export function useProjectActions(): ActionDefinition[] {
  const openSearchEverywhere = useRecoilCallback(
    ({ set }) =>
      ({ element }: ActionContext, tab: string) => {
        if (element) {
          set(searchEverywhereState.isOpen, true);
          set(searchEverywhereState.tab, tab);
          set(searchEverywhereState.contextElement, element);
        }
      },
    []
  );
  const createDefaultActionGroup = useCreateDefaultActionGroup();
  const newFileAction = useRecoilValue(createFileActionState);
  const newDirectoryAction = useRecoilValue(createDirectoryActionState);
  const newElementActionGroup = createDefaultActionGroup({
    id: projectActionIds.NewElement,
    title: "New...",
    description: "Create new class, interface, file or directory",
    isSearchable: true,
    children: [newFileAction, newDirectoryAction],
  });

  const copyReferencePopupGroup = createDefaultActionGroup({
    id: projectActionIds.CopyReferencePopupGroup,
    title: "Copy Path/Reference...",
    menuPresentation: "none",
    children: [
      // TODO: CopyFileReferences action group popup is not the default popup, it shows the copyable value as a hint
      //  segment in each menu item. A custom actionPerformed should be implemented.
      createDefaultActionGroup({
        id: projectActionIds.CopyFileReference,
        title: "Copy File Reference", // in the original impl, there is no title
        isSearchable: false,
        menuPresentation: "section",
        children: [
          // FIXME: actions are not triggered via UI
          useRecoilValue(copyAbsolutePathActionState),
          useRecoilValue(copyFilenameActionState),
          // FIXME: should be able to define divider here
          // new Divider(),
          useRecoilValue(copyPathFromRepositoryRootActionState),
        ],
      }),
    ],
  });

  return [
    {
      id: CommonActionId.GO_TO_ACTION,
      title: "Find Action",
      description: "Quickly navigate to action by name",
      actionPerformed: (event) => {
        openSearchEverywhere(event, "Actions");
      },
    },
    {
      id: CommonActionId.GO_TO_FILE,
      title: "Go to file",
      description: "Quickly navigate to file by name",
      actionPerformed: (event) => {
        openSearchEverywhere(event, "Files");
      },
    },
    newElementActionGroup,
    copyReferencePopupGroup,
  ];
}
