import { compose, filter, groupBy, map, prop, sortBy } from "ramda";
import { Key } from "react";
import { ToolWindowsState, ToolWindowState } from "./ToolWindowsState";

type ToolWindowStateWithKey = { key: Key } & ToolWindowState;

type StripesState = {
  main: Key[];
  split: Key[];
  activeKeys: Key[];
};

// potential improvement might be to avoid null type and have it like { open: false} | {open: true, ...relevantProps}
// Not sure if it's really preferred in terms of usage in the react component.
export type DockedSideState = null | {
  weight: number;
  main: Key | null;
  split: Key | null;
};

export type UnDockedSideState = null | {
  weight: number;
  key: Key;
};

export interface SideState {
  docked: DockedSideState;
  undocked: UnDockedSideState;
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

const getDocked = (toolWindows: ToolWindowStateWithKey[]): DockedSideState => {
  const docks = filterVisibleDocked(toolWindows);
  const mains = filterMains(docks);
  const splits = filterSplits(docks);
  if (mains.length > 1 || splits.length > 1) {
    throw new Error(
      "More than one visible docked window in a side is not possible"
    );
  }
  if (mains[0] || splits[0]) {
    return {
      main: mains[0]?.key || null,
      split: splits[0]?.key || null,
      weight: mains[0]?.weight || splits[0]?.weight,
    };
  }
  return null;
};

const getUnDocked = (
  toolWindows: ToolWindowStateWithKey[]
): UnDockedSideState => {
  const windows = filterVisibleUnDocked(toolWindows);
  if (windows.length === 1) {
    return {
      key: windows[0].key,
      weight: windows[0].weight,
    };
  }
  if (windows.length === 0) {
    return null;
  }
  throw new Error(
    "More than one visible undocked window in a side is not possible"
  );
};

const getSideState = (toolWindows: ToolWindowStateWithKey[]): SideState => ({
  stripes: {
    main: getMains(toolWindows),
    split: getSplits(toolWindows),
    activeKeys: mapToKey(toolWindows.filter(({ isVisible }) => isVisible)),
  },
  undocked: getUnDocked(toolWindows),
  docked: getDocked(toolWindows),
});

export function getToolWindowsLayoutState(
  state: ToolWindowsState
): ToolWindowsLayoutState {
  const toolWindows = Object.keys(state.windows).map((key) => ({
    ...state.windows[key],
    key,
  }));
  const { top = [], bottom = [], left = [], right = [] } = groupBy(
    ({ anchor }) => anchor,
    toolWindows
  );
  return map(getSideState, {
    left,
    top,
    right,
    bottom,
  });
}
