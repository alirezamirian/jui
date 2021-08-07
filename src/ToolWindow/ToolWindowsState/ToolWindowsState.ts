import { curry, fromPairs, insert, map, mapObjIndexed, move } from "ramda";
import { Key } from "react";
import { Anchor, isHorizontal } from "../utils";

export type ViewMode =
  | "docked_pinned"
  | "docked_unpinned"
  | "undock"
  | "float"
  | "window";

/**
 * Data structure for keeping the state of a single tool window. very similar to WindowInfo in Intellij Platform
 *
 * A note about about the data structure:
 * Some fields like `isSplit`, `weight`, `floatingBound` are meaningful only
 * for a subset of viewModes. So it may be tempting to introduce a `viewMode`
 * type which minimally and more accurately describes the information
 * relevant for each viewMode. But it's not structured like that, and it's
 * orthogonal to viewMode, since we want to preserve the relevant information
 * for each viewMode, to be used when the viewMode is changed back.
 *
 * NOTE: consider renaming to `WindowState` to avoid confusion with `ToolWindowsState`
 */
export interface ToolWindowState {
  order: number;
  /**
   * Whether the tool window is visible (open) or not.
   */
  isVisible: boolean;
  weight: number;
  sideWeight: number;
  anchor: Anchor;
  /**
   * if the tool window should be shown in the split view, when rendered not in
   * "float", or "window" mode.
   */
  isSplit: boolean;
  /**
   * NOTE: in Intellij Platform, there is a window `type` and also `docked` and
   * `autoHide`.
   * keeping one viewMode makes more sense and prevents invalid combinations
   * like { type: "window, "docked": true}, that would be unnecessarily allowed.
   */
  viewMode: ViewMode;
  /**
   * Boundaries of the tool window, when rendered in "float" or "window" modes.
   */
  floatingBounds?: ClientRect;
}

const isDocked = (toolWindow: ToolWindowState) =>
  toolWindow.viewMode === "docked_unpinned" ||
  toolWindow.viewMode === "docked_pinned";

export type SideInfo = Pick<ToolWindowState, "anchor" | "isSplit">;
export const areInSameSection = curry(
  (window1: SideInfo, window2: SideInfo) =>
    window1.anchor === window2.anchor && window1.isSplit === window2.isSplit
);

const getViewModeType = (viewMode: ViewMode) => {
  if (viewMode === "docked_pinned" || viewMode === "docked_unpinned") {
    return "docked";
  }
  if (viewMode === "window" || viewMode === "float") {
    return "float";
  }
  return viewMode;
};
/**
 * Represents UI state of a bunch of tool windows. What is rendered inside each window or toolbar button is irrelevant.
 *
 * TODO: document pros and cons of these two approaches
 * - Having a class for ToolWindowsState which keeps a readonly mapping of keys to window states.
 * - Having ToolWindowsState as an interface (a mapping from keys to window states), and a bunch of action functions
 *   which accept a window state and some arguments, and return a new window state.
 */
export class ToolWindowsState {
  constructor(
    public readonly windows: Readonly<{
      [key: string]: Readonly<ToolWindowState>;
    }>
  ) {}

  hide(targetKey: Key): ToolWindowsState {
    return new ToolWindowsState(
      mapObjIndexed(
        (toolWindow, key) =>
          key === targetKey
            ? {
                ...toolWindow,
                isVisible: false,
              }
            : toolWindow,
        this.windows
      )
    );
  }

  show(targetKey: Key): ToolWindowsState {
    const target = this.windows[targetKey];
    if (!target) {
      return this;
    }
    const closableViewModes: ViewMode[] = [];
    if (target.viewMode === "undock") {
      closableViewModes.push("undock");
    } else if (isDocked(target)) {
      closableViewModes.push("docked_unpinned", "docked_pinned", "undock");
    }
    return new ToolWindowsState(
      mapObjIndexed((toolWindow, key) => {
        if (key === targetKey) {
          return {
            ...toolWindow,
            isVisible: true,
          };
        }
        if (
          toolWindow.isVisible &&
          areInSameSection(target, toolWindow) &&
          closableViewModes.includes(toolWindow.viewMode)
        ) {
          return { ...toolWindow, isVisible: false };
        }
        return toolWindow;
      }, this.windows)
    );
  }

  toggle(targetKey: Key): ToolWindowsState {
    return this.windows[targetKey]?.isVisible
      ? this.hide(targetKey)
      : this.show(targetKey);
  }

  blur(targetKey: Key): ToolWindowsState {
    const target = this.windows[targetKey];
    if (
      target?.viewMode !== "docked_unpinned" &&
      target?.viewMode !== "undock"
    ) {
      return this;
    }
    return new ToolWindowsState(
      map((toolWindow) => {
        if (toolWindow === target) {
          return {
            ...toolWindow,
            isVisible: false,
          };
        }
        return toolWindow;
      }, this.windows)
    );
  }

  changeViewMode(targetKey: Key, viewMode: ViewMode): ToolWindowsState {
    const target = this.windows[targetKey];
    if (!target) {
      return this;
    }
    return new ToolWindowsState(
      map((toolWindow) => {
        if (toolWindow === target) {
          return {
            ...toolWindow,
            viewMode,
          };
        }
        const viewModeType = getViewModeType(toolWindow.viewMode);
        if (
          toolWindow.isVisible &&
          viewModeType !== "float" &&
          areInSameSection(toolWindow, target) &&
          viewModeType === getViewModeType(viewMode)
        ) {
          return {
            ...toolWindow,
            isVisible: false,
          };
        }
        return toolWindow;
      }, this.windows)
    );
  }

  move(targetKey: Key, index: number): ToolWindowsState;
  move(targetKey: Key, side: SideInfo, index?: number): ToolWindowsState;
  move(
    targetKey: Key,
    sideOrIndex: SideInfo | number,
    index?: number
  ): ToolWindowsState {
    const target = this.windows[targetKey];
    if (!target) {
      return this;
    }
    const targetSide = typeof sideOrIndex === "object" ? sideOrIndex : target;
    const targetIndex = typeof sideOrIndex === "number" ? sideOrIndex : index;
    const targetSideWindows = Object.entries(this.windows).filter(([, value]) =>
      areInSameSection(targetSide, value)
    );
    const indexInTargetSide = targetSideWindows.findIndex(
      ([, window]) => window === target
    );
    const sortedTargetWindows: Array<[Key, ToolWindowState]> =
      indexInTargetSide < 0
        ? insert(
            targetIndex ?? -1,
            [targetKey, { ...target, ...targetSide }],
            targetSideWindows
          )
        : move(
            indexInTargetSide,
            targetIndex ?? indexInTargetSide,
            targetSideWindows
          );
    const newTargetSideWindows = fromPairs(
      sortedTargetWindows.map(([key, value], index) => {
        let newValue = value;
        if (value.order !== index) {
          newValue = { ...value, order: index };
        }
        const targetViewMode = getViewModeType(target.viewMode);
        if (
          key !== targetKey &&
          target.isVisible &&
          value.isVisible &&
          targetViewMode !== "float" &&
          getViewModeType(value.viewMode) === targetViewMode
        ) {
          newValue = { ...value, isVisible: false };
        }
        return [`${key}`, newValue];
      })
    );
    return new ToolWindowsState(
      mapObjIndexed(
        (value, key) => newTargetSideWindows[key] || value,
        this.windows
      )
    );
  }

  resizeDock(
    anchor: Anchor,
    size: number,
    containerBounds: { width: number; height: number }
  ): ToolWindowsState {
    return this.resizeSide(true, anchor, size, containerBounds);
  }

  resizeUndock(
    anchor: Anchor,
    size: number,
    containerBounds: { width: number; height: number }
  ): ToolWindowsState {
    return this.resizeSide(false, anchor, size, containerBounds);
  }

  resizeDockSplitView(anchor: Anchor, weight: number): ToolWindowsState {
    return new ToolWindowsState(
      map((window) => {
        if (window.anchor === anchor && window.isVisible && isDocked(window)) {
          return {
            ...window,
            sideWeight: window.isSplit ? weight : 1 - weight,
          };
        }
        return window;
      }, this.windows)
    );
  }

  private resizeSide(
    dock: boolean,
    anchor: Anchor,
    size: number,
    containerBounds: { width: number; height: number }
  ): ToolWindowsState {
    return new ToolWindowsState(
      map((window) => {
        const isInResizingView = dock
          ? isDocked(window)
          : window.viewMode === "undock";
        if (window.anchor === anchor && isInResizingView && window.isVisible) {
          const containerSize = !isHorizontal(anchor)
            ? containerBounds.width
            : containerBounds.height;
          return {
            ...window,
            weight: size / containerSize,
          };
        }
        return window;
      }, this.windows)
    );
  }
}

export const toolWindowState = (
  inputs: Partial<ToolWindowState> = {}
): ToolWindowState => ({
  anchor: "left",
  isSplit: false,
  viewMode: "docked_pinned",
  order: 1,
  weight: 0.2,
  sideWeight: 0.5,
  isVisible: false,
  ...inputs,
});
