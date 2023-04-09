import { useRecoilCallback } from "recoil";
import {
  ActionContext,
  ActionDefinition,
  CommonActionId,
} from "@intellij-platform/core";

import { searchEverywhereState } from "../SearchEverywhere/searchEverywhere.state";

export function useProjectActions(): { [key: string]: ActionDefinition } {
  const openFindAction = useRecoilCallback(
    ({ set }) =>
      ({ element }: ActionContext) => {
        if (element) {
          set(searchEverywhereState.isOpen, true);
          set(searchEverywhereState.tab, "Actions");
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
        openFindAction(event);
      },
    },
  };
}
