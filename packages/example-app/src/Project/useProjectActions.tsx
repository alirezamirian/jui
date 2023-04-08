import { useRecoilCallback } from "recoil";
import { ActionContext, ActionDefinition } from "@intellij-platform/core";
import { searchEveryWhereState } from "../SearchEverywhere/SearchEverywherePopup";

export function useProjectActions(): { [key: string]: ActionDefinition } {
  const openFindAction = useRecoilCallback(
    ({ set }) =>
      ({ element }: ActionContext) => {
        if (element) {
          set(searchEveryWhereState.isOpen, true);
          set(searchEveryWhereState.tab, "Actions");
          set(searchEveryWhereState.contextElement, element);
        }
      },
    []
  );

  return {
    GotoAction: {
      title: "Find Action",
      description: "Quickly navigate to action by name",
      actionPerformed: (event) => {
        console.log("GotoAction performed");
        openFindAction(event);
      },
    },
  };
}
