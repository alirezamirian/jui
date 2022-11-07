import { atom } from "recoil";
import { ToolWindowsState } from "@intellij-platform/core";
import { map } from "ramda";
import { windowById } from "./toolWindows";

export const toolWindowsState = atom({
  key: "toolWindows",
  default: new ToolWindowsState(
    map(({ initialState }) => initialState, windowById)
  ),
});
