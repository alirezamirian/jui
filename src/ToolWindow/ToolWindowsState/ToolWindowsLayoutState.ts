import { compose, filter, groupBy, map, pipe, prop, sortBy } from "ramda";
import { Key } from "react";
import { Anchor, isHorizontal } from "../utils";
import {
  ToolWindowsState,
  ToolWindowState,
  ViewMode,
} from "./ToolWindowsState";

type ToolWindowStateWithKey = { key: Key } & ToolWindowState;

export interface StripesState {
  main: Key[];
  split: Key[];
  activeKeys: Key[];
}

/**
 * Represents UI state of the split view (aka secondary or side view) within a docked view at one of the four sides.
 */
type SideDockedSplitState = {
  key: Key;
  /**
   * relative size of the split view inside a docked view. Note that this is intentionally a fraction size (0≤size<1),
   * based on the expected behaviour. split views inside a docked view are not fixed sized and resizing the window
   * affect their size. This is not the case for the docked views themselves inside the main layout, which have fixed
   * size which is not affected by window resizing.
   */
  sizeFraction: number;
};

// A potential improvement for this and similar nullable types like SideDockedState.split might be to avoid null type
// and have it like { open: false} | {open: true, ...relevantProps}
// Not sure if it's really preferred in terms of usage in the react component.
export type SideDockedState = null | {
  size: number;
  mainKey: Key;
  split: SideDockedSplitState | null;
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

export interface FloatWindowState {
  key: Key;
  bounds: Exclude<ToolWindowState["floatingBounds"], undefined>;
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
  floatWindows: Array<FloatWindowState>;
  windows: Array<FloatWindowState>;
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
const filterVisible = (expectedViewMode: ViewMode | ViewMode[] = []) =>
  filter<ToolWindowStateWithKey, "array">(
    ({ viewMode, isVisible }: ToolWindowStateWithKey) =>
      isVisible &&
      ([] as ViewMode[]).concat(expectedViewMode).includes(viewMode)
  );
const getSplits = compose(sortAndMapToKey, filterSplits);

const filterVisibleDocked = filterVisible(["docked_unpinned", "docked_pinned"]);
const filterVisibleUnDocked = filterVisible("undock");

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
      mainKey: mains[0]?.key || splits[0]?.key,
      split:
        mains[0]?.key && splits[0]?.key
          ? {
              key: splits[0].key,
              sizeFraction: mains[0].weight
                ? 1 - mains[0].sideWeight
                : splits[0].sideWeight,
            }
          : null,
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

const DEFAULT_HEIGHT = 300;
const DEFAULT_WIDTH = 400;
const getFloatWindowState = (containerSize: ContainerSize) => ({
  floatingBounds: bounds = {
    top: containerSize.height / 2 - DEFAULT_HEIGHT / 2,
    left: containerSize.width / 2 - DEFAULT_WIDTH / 2,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
  },
  key,
}: ToolWindowStateWithKey): FloatWindowState => ({ bounds, key });

const getFloatWindowsState = (
  viewMode: "float" | "window",
  containerSize: ContainerSize,
  toolWindows: ToolWindowStateWithKey[]
) =>
  pipe(
    filterVisible(viewMode),
    map<ToolWindowStateWithKey, FloatWindowState>(
      getFloatWindowState(containerSize)
    )
  )(toolWindows);

export function getToolWindowsLayoutState(
  state: Readonly<ToolWindowsState>,
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
    windows: getFloatWindowsState("window", containerSize, toolWindows),
    floatWindows: getFloatWindowsState("float", containerSize, toolWindows),
  };
}
