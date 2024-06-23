import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  ActionContext,
  ActionDefinition,
  CommonActionId,
} from "@intellij-platform/core";

import { createFileActionState } from "./actions/createFileAction";
import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";
import { createDirectoryActionState } from "./actions/createDirectoryAction";

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

  const newFileAction = useRecoilValue(createFileActionState);
  const newDirectoryAction = useRecoilValue(createDirectoryActionState);
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
    newFileAction,
    newDirectoryAction,
  ];
}
