import { getToolWindowsLayoutState } from "./ToolWindowsLayoutState";
import {
  ToolWindowsState,
  toolWindowState as toolWindow,
} from "./ToolWindowsState";

const containerSize = { width: 1000, height: 400 };

describe("getToolWindowLayoutState", () => {
  test("docked and undocked view of sides", () => {
    const state = new ToolWindowsState({
      w1: toolWindow({ anchor: "left", isVisible: true }),
      w2: toolWindow({ anchor: "right" }),
      w3: toolWindow({ anchor: "right", viewMode: "docked_unpinned" }),
      w4: toolWindow({ anchor: "right", isVisible: false, viewMode: "undock" }),
      w5: toolWindow({ anchor: "right", isVisible: true, viewMode: "float" }),
      w6: toolWindow({ anchor: "top", isVisible: true, viewMode: "window" }),
      w7: toolWindow({ anchor: "top", isVisible: true, viewMode: "float" }),
      w8: toolWindow({ anchor: "bottom", isVisible: true, viewMode: "undock" }),
    });
    const layoutState = getToolWindowsLayoutState(state, containerSize);
    expect(layoutState.left.docked).not.toBeNull(); // has visible docked windows, so it should be open
    expect(layoutState.left.undocked).toBeNull(); // no visible undocked windows, so it should be closed
    expect(layoutState.right.docked).toBeNull();
    expect(layoutState.right.undocked).toBeNull(); // docked windows are not visible, so it should be closed
    expect(layoutState.top.docked).toBeNull();
    expect(layoutState.top.undocked).toBeNull(); // only float and window view modes, so it should be closed
    expect(layoutState.bottom.docked).toBeNull(); // only undock view mode, so it should be closed
    expect(layoutState.bottom.undocked).not.toBeNull(); // only undock view mode, so it should be closed
  });

  test("stripes ordering", () => {
    const state = new ToolWindowsState({
      l1: toolWindow({ anchor: "left", isSplit: false, order: 4 }),
      l2: toolWindow({ anchor: "left", isSplit: false, order: 2 }),
      l3: toolWindow({ anchor: "left", isSplit: false, order: 3 }),
      l4: toolWindow({ anchor: "left", isSplit: true, order: 5 }),
      l5: toolWindow({ anchor: "left", isSplit: true, order: 1 }),
      r1: toolWindow({ anchor: "right", isSplit: true, order: 4 }),
      t1: toolWindow({ anchor: "top", isSplit: false, order: 1 }),
      t2: toolWindow({ anchor: "top", isSplit: false, order: 2 }),
    });
    const layoutState = getToolWindowsLayoutState(state, containerSize);

    expect(layoutState.left.stripes.main).toEqual(["l2", "l3", "l1"]);
    expect(layoutState.left.stripes.split).toEqual(["l5", "l4"]);
    expect(layoutState.right.stripes.main).toEqual([]);
    expect(layoutState.right.stripes.split).toEqual(["r1"]);
    expect(layoutState.top.stripes.main).toEqual(["t1", "t2"]);
    expect(layoutState.top.stripes.split).toEqual([]);
    expect(layoutState.bottom.stripes.main).toEqual([]);
    expect(layoutState.bottom.stripes.split).toEqual([]);
  });

  test("invalid state throws", () => {
    // invalid states
    expect(() => {
      const state = new ToolWindowsState({
        w1: toolWindow({ anchor: "left", viewMode: "undock", isVisible: true }),
        w2: toolWindow({ anchor: "left", viewMode: "undock", isVisible: true }),
      });
      getToolWindowsLayoutState(state, containerSize);
    }).toThrow();

    expect(() => {
      const state = new ToolWindowsState({
        w1: toolWindow({ anchor: "left", isVisible: true }),
        w2: toolWindow({ anchor: "left", isVisible: true }),
      });
      getToolWindowsLayoutState(state, containerSize);
    }).toThrow();

    // Valid states
    expect(() => {
      const state = new ToolWindowsState({
        w1: toolWindow({ anchor: "left", viewMode: "float", isVisible: true }),
        w2: toolWindow({ anchor: "left", viewMode: "float", isVisible: true }),
      });
      getToolWindowsLayoutState(state, containerSize);
    }).not.toThrow();

    expect(() => {
      const state = new ToolWindowsState({
        w1: toolWindow({ anchor: "left", viewMode: "undock", isVisible: true }),
        w2: toolWindow({ anchor: "left", isVisible: true }),
        w3: toolWindow({ anchor: "left", isSplit: true, isVisible: true }),
      });
      getToolWindowsLayoutState(state, containerSize);
    }).not.toThrow();
    expect(() => {
      const state = new ToolWindowsState({
        w1: toolWindow({ anchor: "left", viewMode: "window", isVisible: true }),
        w2: toolWindow({ anchor: "left", viewMode: "window", isVisible: true }),
      });
      getToolWindowsLayoutState(state, containerSize);
    }).not.toThrow();
  });
});
