import { atom } from "recoil";
import { ToolWindowsState } from "@intellij-platform/core";
import { toolWindows } from "./toolWindows";

export const toolWindowsState = atom({
  key: "toolWindows",
  default: new ToolWindowsState(
    Object.fromEntries(
      toolWindows.map(({ id, initialState }) => [id, initialState])
    ),
    {
      removedFromSideBarIds: toolWindows
        .filter(({ showStripeButton }) => showStripeButton === false)
        .map(({ id }) => id),
    }
  ),
});
