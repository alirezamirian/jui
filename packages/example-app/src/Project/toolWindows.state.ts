import { atom, useRecoilState } from "recoil";
import { ToolWindowsState, ViewMode } from "@intellij-platform/core";
import { filter, map } from "ramda";
import { windowById } from "./toolWindows";
import { useRef } from "react";

export const toolWindowsState = atom({
  key: "toolWindows",
  default: new ToolWindowsState(
    map(({ initialState }) => initialState, windowById)
  ),
});

interface ToolWindowsManager {
  toggleHideAll(): void;
}

export const useToolWindowsManager = (): ToolWindowsManager => {
  const [state, setState] = useRecoilState(toolWindowsState);
  const hideAllIdsToRestore = useRef<string[]>([]);

  const toggleHideAll = (): void => {
    const viewModes: ViewMode[] = [
      "docked_unpinned",
      "docked_pinned",
      "undock",
    ];
    const idsToHide = Object.keys(
      filter(
        ({ viewMode, isVisible }) => isVisible && viewModes.includes(viewMode),
        state.windows
      )
    );
    if (idsToHide.length > 0) {
      hideAllIdsToRestore.current = idsToHide;
      setState(
        state.mapWindows((toolWindow, id) =>
          idsToHide.includes(id)
            ? {
                ...toolWindow,
                isVisible: false,
              }
            : toolWindow
        )
      );
    } else {
      setState(
        state.mapWindows((toolWindow, id) =>
          hideAllIdsToRestore.current.includes(id)
            ? {
                ...toolWindow,
                isVisible: true,
              }
            : toolWindow
        )
      );
    }
  };
  return {
    toggleHideAll,
  };
};
