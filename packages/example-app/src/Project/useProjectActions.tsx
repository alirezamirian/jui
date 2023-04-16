import { useRecoilCallback } from "recoil";
import {
  ActionContext,
  ActionDefinition,
  CommonActionId,
} from "@intellij-platform/core";

import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";

export function useProjectActions(): { [key: string]: ActionDefinition } {
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

  return {
    [CommonActionId.GO_TO_ACTION]: {
      title: "Find Action",
      description: "Quickly navigate to action by name",
      actionPerformed: (event) => {
        openSearchEverywhere(event, "Actions");
      },
    },
    [CommonActionId.GO_TO_FILE]: {
      title: "Go to file",
      description: "Quickly navigate to file by name",
      actionPerformed: (event) => {
        openSearchEverywhere(event, "Files");
      },
    },
  };
}
