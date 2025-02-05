import { Getter, Setter, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import {
  ActionContext,
  ActionDefinition,
  CommonActionId,
  useCreateDefaultActionGroup,
} from "@intellij-platform/core";

import { createFileActionAtom } from "./actions/createFileAction";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { createDirectoryActionAtom } from "./actions/createDirectoryAction";
import { projectActionIds } from "./projectActionIds";
import { copyFilenameActionAtom } from "./actions/copyFilename";
import { copyAbsolutePathActionAtom } from "./actions/copyAbsolutePath";
import { copyPathFromRepositoryRootActionAtom } from "../VersionControl/actions/copyPathFromRepositoryRoot";
import { switchAppVersionAtom } from "./actions/switchVersionAction";

const openSearchEverywhereCallback = (
  _get: Getter,
  set: Setter,
  { element }: ActionContext,
  tab: string
) => {
  if (element) {
    set(searchEverywhereState.isOpen, true);
    set(searchEverywhereState.tab, tab);
    set(searchEverywhereState.contextElement, element);
  }
};

export function useProjectActions(): ActionDefinition[] {
  const openSearchEverywhere = useAtomCallback(openSearchEverywhereCallback);
  const createDefaultActionGroup = useCreateDefaultActionGroup();
  const newFileAction = useAtomValue(createFileActionAtom);
  const newDirectoryAction = useAtomValue(createDirectoryActionAtom);
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
          useAtomValue(copyAbsolutePathActionAtom),
          useAtomValue(copyFilenameActionAtom),
          // FIXME: should be able to define divider here
          // new Divider(),
          useAtomValue(copyPathFromRepositoryRootActionAtom),
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
    useAtomValue(switchAppVersionAtom),
  ];
}
