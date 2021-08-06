import { compose, filter, groupBy, map, prop, sortBy } from "ramda";
import { Key } from "react";
import { Anchor, isHorizontal } from "../utils";
import { ToolWindowsState, ToolWindowState } from "./ToolWindowsState";

type ToolWindowStateWithKey = { key: Key } & ToolWindowState;

export interface StripesState {
  main: Key[];
  split: Key[];
  activeKeys: Key[];
}

// potential improvement might be to avoid null type and have it like { open: false} | {open: true, ...relevantProps}
// Not sure if it's really preferred in terms of usage in the react component.
export type SideDockedState = null | {
  size: number;
  main: Key | null;
  split: Key | null;
};

export type SideUnDockedState = null | {
  size: number;
  key: Key;
};

export interface SideState {
  docked: SideDockedState;
  undocked: SideUnDockedState;
  stripes: StripesState;
}

export interface WindowState {
  bounds: ClientRect;
}

/**
 * Derived from ToolWindowsState, it represents the same information in a away that is suitable for ToolWindows
 * component to render the layout.
 */
export interface ToolWindowsLayoutState {
  left: SideState;
  top: SideState;
  right: SideState;
  bottom: SideState;
  floatedWindows: Array<WindowState>;
  windows: Array<WindowState>;
}

interface ContainerSize {
  width: number;
  height: number;
}

const getSizeInAnchor = (containerSize: ContainerSize, anchor: Anchor) =>
  containerSize[isHorizontal(anchor) ? "height" : "width"];

const mapToKey = map<ToolWindowStateWithKey, Key>(prop("key"));
const sortAndMapToKey = compose(
  mapToKey,
  sortBy(({ order }: ToolWindowStateWithKey) => order)
);
const filterMains = filter<ToolWindowStateWithKey, "array">(
  ({ isSplit }: ToolWindowStateWithKey) => !isSplit
);
const getMains = compose(sortAndMapToKey, filterMains);
const filterSplits = filter<ToolWindowStateWithKey, "array">(
  ({ isSplit }: ToolWindowStateWithKey) => isSplit
);
const getSplits = compose(sortAndMapToKey, filterSplits);

const filterVisibleDocked = compose(
  filter<ToolWindowStateWithKey, "array">(
    ({ viewMode, isVisible }) =>
      isVisible &&
      (viewMode === "docked_unpinned" || viewMode === "docked_pinned")
  )
);
const filterVisibleUnDocked = compose(
  filter<ToolWindowStateWithKey, "array">(
    ({ viewMode, isVisible }) => isVisible && viewMode === "undock"
  )
);

const getDocked = (
  anchor: Anchor,
  containerSize: ContainerSize,
  toolWindows: ToolWindowStateWithKey[]
): SideDockedState => {
  const docks = filterVisibleDocked(toolWindows);
  const mains = filterMains(docks);
  const splits = filterSplits(docks);
  if (mains.length > 1 || splits.length > 1) {
    throw new Error(
      "More than one visible docked window in a side is not possible"
    );
  }
  if (mains[0] || splits[0]) {
    const weight = mains[0]?.weight || splits[0]?.weight;
    return {
      main: mains[0]?.key || null,
      split: splits[0]?.key || null,
      size: weight * getSizeInAnchor(containerSize, anchor),
    };
  }
  return null;
};

const getUnDocked = (
  anchor: Anchor,
  containerSize: ContainerSize,
  toolWindows: ToolWindowStateWithKey[]
): SideUnDockedState => {
  const windows = filterVisibleUnDocked(toolWindows);
  if (windows.length === 1) {
    return {
      key: windows[0].key,
      size: windows[0].weight * getSizeInAnchor(containerSize, anchor),
    };
  }
  if (windows.length === 0) {
    return null;
  }
  throw new Error(
    "More than one visible undocked window in a side is not possible"
  );
};

const getSideState = (
  anchor: Anchor,
  containerSize: ContainerSize,
  toolWindows: ToolWindowStateWithKey[]
): SideState => ({
  stripes: {
    main: getMains(toolWindows),
    split: getSplits(toolWindows),
    activeKeys: mapToKey(toolWindows.filter(({ isVisible }) => isVisible)),
  },
  undocked: getUnDocked(anchor, containerSize, toolWindows),
  docked: getDocked(anchor, containerSize, toolWindows),
});

export function getToolWindowsLayoutState(
  state: ToolWindowsState,
  containerSize: ContainerSize
): ToolWindowsLayoutState {
  const toolWindows = Object.keys(state.windows).map((key) => ({
    ...state.windows[key],
    key,
  }));
  const { top = [], bottom = [], left = [], right = [] } = groupBy(
    ({ anchor }) => anchor,
    toolWindows
  );
  return {
    left: getSideState("left", containerSize, left),
    top: getSideState("top", containerSize, top),
    right: getSideState("right", containerSize, right),
    bottom: getSideState("bottom", containerSize, bottom),
    windows: [], // FIXME
    floatedWindows: [], // FIXME
  };
}
