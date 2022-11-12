import { move } from "ramda";
import React, { HTMLProps, Key, useState } from "react";
import { FloatView } from "./FloatView";
import { FloatWindowState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";

// NOTE: useStackedLayersState and useStackedLayers are generic but kept here since there is no other use case at the
// moment. They should be moved to their own file(s) when/if other use case came up.

interface StackedLayersState<T> {
  /**
   * Sorted list of items representing layers.
   */
  sorted: T[];
  /**
   * A function to be used when the layer should be brought to front, typically based on some UI interaction.
   */
  bringToFront: (index: number) => void;
}

/**
 * State management for a stacked list of layers with **bring to front** functionality.
 */
function useStackedLayersState<T, K = React.Key>(
  /**
   * A list of arbitrary items representing stacked layers.
   */
  items: T[],
  /**
   * A function for converting each item into a key which consistently identifies each item, in subsequent renders.
   * It's used to maintain current sorting state. Although it can be of any type, it's usually a string or number.
   */
  getKey: (item: T) => K
): StackedLayersState<T> {
  // Local state for now, but can easily change to controllable if needed.
  const [sortedKeys, setSortedKeys] = useState<K[]>([]);
  const sorted = items.sort(
    (a, b) => sortedKeys.indexOf(getKey(a)) - sortedKeys.indexOf(getKey(b))
  );
  return {
    sorted,
    bringToFront: (index: number) => {
      setSortedKeys(move(index, -1, sorted).map(getKey));
    },
  };
}

/**
 * Given the state of a stacked list of layers, returns DOM props to be applied to each layer for interaction-based
 * "bring to front" behaviour.
 */
function useStackedLayers<T>(
  state: StackedLayersState<T>
): { layersProps: Array<HTMLProps<HTMLElement>> } {
  return {
    layersProps: state.sorted.map((_, index) => ({
      onFocus: () => {
        state.bringToFront(index);
      },
    })),
  };
}

/**
 * Renders float tool windows.
 * - handles resize and move actions for float windows.
 * - handles layering of float tool windows.
 */
export function FloatToolWindows({
  floatWindows = [],
  onBoundsChange,
  renderToolWindow,
}: {
  floatWindows: FloatWindowState[] | undefined;
  onBoundsChange: (key: Key, bounds: WindowBounds) => void;
  renderToolWindow: (key: Key) => React.ReactNode;
}) {
  const stackedFloatWindows = useStackedLayersState(
    floatWindows,
    ({ key }) => key
  );
  const { layersProps } = useStackedLayers(stackedFloatWindows);
  // sorted list is used to render layers. We could as well use z-index and always render with the same order, but
  // it doesn't really matter as long as key is set.
  return (
    <>
      {stackedFloatWindows.sorted.map((toolWindow, index) => (
        <FloatView
          key={toolWindow.key}
          state={toolWindow}
          {...layersProps[index]}
          onBoundsChange={(bounds) => onBoundsChange(toolWindow.key, bounds)}
        >
          {renderToolWindow(toolWindow.key)}
        </FloatView>
      ))}
    </>
  );
}
