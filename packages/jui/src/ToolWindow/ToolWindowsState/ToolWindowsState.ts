import { curry, fromPairs, insert, map, mapObjIndexed, move } from "ramda";
import { Key } from "react";
import { Anchor, isHorizontal } from "../utils";

export type ViewMode =
  | "docked_pinned"
  | "docked_unpinned"
  | "undock"
  | "float"
  | "window";

export type WindowBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

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
  floatingBounds?: WindowBounds;
}

const isDocked = (toolWindow: ToolWindowState) =>
  toolWindow.viewMode === "docked_unpinned" ||
  toolWindow.viewMode === "docked_pinned";

/**
 * Determines whether the tool window should hide on focus. In the java implementation, it's a field on window
 * info instead of being a calculated field. We changed that to match viewMode with the 5 view modes that are possible
 * to choose from the UI, eliminating the combinations that are never allowed. If from UX perspective, having window
 * or float mode with autoHide feature is considered valid at some point, we may need to change the implementation
 * to something similar to the original implementation where isAutoHide and viewMode are separate.
 */
const isAutoHide = (toolWindow: ToolWindowState) =>
  toolWindow.viewMode === "docked_unpinned" || toolWindow.viewMode === "undock";

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
    if (!target || !isAutoHide(target)) {
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

  // TODO: initiate floatingBound when changing viewMode to float or window and there is no previous floatingBound
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

  stretchWidth(
    targetKey: Key,
    value: number,
    containerBounds: { width: number; height: number }
  ): ToolWindowsState {
    return this.stretch(targetKey, value, containerBounds, "width");
  }

  stretchHeight(
    targetKey: Key,
    value: number,
    containerBounds: { width: number; height: number }
  ): ToolWindowsState {
    return this.stretch(targetKey, value, containerBounds, "height");
  }

  setFloatingBound(targetKey: Key, floatingBounds: WindowBounds) {
    return this.update(targetKey, "floatingBounds", floatingBounds);
  }

  private update<K extends keyof ToolWindowState>(
    targetKey: Key,
    key: K,
    value: ToolWindowState[K]
  ) {
    const target = this.windows[targetKey];
    if (!target) {
      return this;
    }
    return new ToolWindowsState(
      map((window) => {
        if (window === target) {
          return {
            ...window,
            [key]: value,
          };
        }
        return window;
      }, this.windows)
    );
  }

  private stretch(
    targetKey: Key,
    value: number,
    containerBounds: { width: number; height: number },
    property: "width" | "height"
  ): ToolWindowsState {
    const target = this.windows[targetKey];
    if (!target) {
      return this;
    }
    const viewModeType = getViewModeType(target.viewMode);
    if (viewModeType === "float") {
      return new ToolWindowsState(
        map((window) => {
          if (window === target) {
            const currentFloatingBound = window.floatingBounds!;
            return {
              ...window,
              floatingBounds: {
                ...currentFloatingBound,
                [property]: currentFloatingBound[property] + value,
              },
            };
          }
          return window;
        }, this.windows)
      );
    }
    const expectedProperty = isHorizontal(target.anchor) ? "height" : "width";
    if (expectedProperty !== property) {
      return this;
    }
    const containerSize = containerBounds[property];
    const newValue = containerSize * target.weight + value;
    if (viewModeType === "docked") {
      return this.resizeDock(target.anchor, newValue, containerBounds);
    } else {
      return this.resizeUndock(target.anchor, newValue, containerBounds);
    }
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

export const toolWindowState = ({
  viewMode = "docked_pinned",
  ...inputs
}: Partial<ToolWindowState> = {}): ToolWindowState => ({
  anchor: "left",
  isSplit: false,
  viewMode: viewMode,
  order: 1,
  weight: 0.2,
  sideWeight: 0.5,
  isVisible: false,
  floatingBounds:
    getViewModeType(viewMode) === "float"
      ? {
          left: 300,
          top: 300,
          width: 600,
          height: 300,
        }
      : undefined,
  ...inputs,
});
