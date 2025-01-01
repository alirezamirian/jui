import { atom } from "jotai";
import { ToolWindowsState } from "@intellij-platform/core";
import { toolWindows } from "./toolWindows";

export const toolWindowsStateAtom = atom(
  new ToolWindowsState(
    Object.fromEntries(
      toolWindows.map(({ id, initialState }) => [id, initialState])
    ),
    {
      removedFromSideBarIds: toolWindows
        .filter(({ showStripeButton }) => showStripeButton === false)
        .map(({ id }) => id),
    }
  )
);
