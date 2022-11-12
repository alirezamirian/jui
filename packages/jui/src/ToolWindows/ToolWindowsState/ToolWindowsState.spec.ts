import { mapObjIndexed, mergeDeepRight, sortBy } from "ramda";
import { Key } from "react";
import {
  areInSameSection,
  SideInfo,
  ToolWindowsState,
  toolWindowState,
  ToolWindowState,
} from "./ToolWindowsState";

const windows = {
  l2: toolWindowState(),
  l3: toolWindowState(),
  l4: toolWindowState({ viewMode: "float" }),
  l5: toolWindowState({ viewMode: "undock" }),
  l6: toolWindowState({ viewMode: "window", isVisible: true }),
  l7: toolWindowState({ viewMode: "undock", isVisible: true }),
  l1 /*👁*/: toolWindowState({ order: 2, isVisible: true }),

  l8: toolWindowState({ isSplit: true }),
  l9 /*👁*/: toolWindowState({ isSplit: true, isVisible: true }),
  // -------------------------------------------------------------------------------------------------- //
  r1 /*👁*/: toolWindowState({ anchor: "right", isVisible: true, weight: 0.3 }),
  r2: toolWindowState({ anchor: "right" }),

  r3: toolWindowState({ anchor: "right", isSplit: true }),
  r4: toolWindowState({ anchor: "right", isSplit: true }),
  // -------------------------------------------------------------------------------------------------- //
  b1: toolWindowState({ anchor: "bottom" }),

  b2: toolWindowState({
    anchor: "bottom",
    viewMode: "undock",
    isSplit: true,
    isVisible: true,
    weight: 0.4,
  }),
  // -------------------------------------------------------------------------------------------------- //
  t1 /*👁*/: toolWindowState({ anchor: "top", isVisible: true }),
};
const state = new ToolWindowsState(windows);

describe("tool window state", () => {
  test("hide or show return the same state if the key doesn't exist in the state", () => {
    const state = new ToolWindowsState({ w1: toolWindowState() });
    expect(state.hide("w2")).toEqual(state);
    expect(state.show("w2")).toEqual(state);
  });
  test("hide returns the same state if the window is already not visible", () => {
    const state = { w1: toolWindowState() };
    expect(new ToolWindowsState(state).hide("w1")).toEqual(
      new ToolWindowsState(state)
    );
  });
  test("hiding a tool window only toggles the visibility of that window", () => {
    expectChanges(state.hide("l1"), {
      l1: { isVisible: false },
    });
  });

  test("show a tool window of mode 'float' or 'window' only toggles the visibility of that window", () => {
    expectChanges(state.show("l4"), {
      l4: { isVisible: true },
    });
  });

  // FIXME: this can be simplified, because the reason undocked windows are closed is that they are always "unpinned",
  //  so they are closed when blurred. In other words, the reason undocked ones are also closed is not a side effect
  //  of a docked window being opened, but the undocked window being blurred.
  test("showing a docked window hides other docked and undocked windows in the same section", () => {
    expectChanges(state.show("l2"), {
      l1: { isVisible: false },
      l2: { isVisible: true },
      l7: { isVisible: false },
    });
  });

  test("showing an undocked window hides other undocked windows and doesn't hide docked windows in the same section", () => {
    expectChanges(state.show("l5"), {
      l7: { isVisible: false },
      l5: { isVisible: true },
    });
  });
  test("showing a removed from sidebar window will add it back", () => {
    expect(
      state.removeFromSidebar("l9").show("l9").removedFromSideBarIds
    ).not.toContain("l9");
  });

  test("toggle is equivalent of calling show, if tool window is not currently opened", () => {
    expect(state.toggle("l5")).toEqual(state.show("l5"));
  });

  test("toggle is equivalent of calling hide, if tool window is currently opened", () => {
    expect(state.toggle("l6")).toEqual(state.hide("l6"));
  });

  test.skip("showing a window in split section of a currently open side, adjusts the weight based on the currently open window in the main section", () => {
    expectChanges(state.show("r4"), {
      r4: { isVisible: true, weight: 0.3 },
    });
  });

  test.skip("showing a window in main section of a currently open side, sets the weight of the currently open window in split section to the one of the opened window", () => {
    expectChanges(state.show("b1"), {
      b1: { isVisible: true },
      b2: { weight: 0.2 },
    });
  });

  test("an undocked or docked_unpinned is closed when losing focus", () => {
    expectChanges(state.blur("l7"), {
      l7: { isVisible: false },
    });
  });

  test("blur returns the same state if the key is invalid", () => {
    expect(state.blur("missingKey")).toEqual(state);
  });

  test("changeViewMode returns the same state if the new view mode is the same as the existing one", () => {
    expect(state.changeViewMode("l9", "docked_pinned")).toEqual(state);
  });

  test("changeViewMode returns the same state if the key is invalid", () => {
    expect(state.changeViewMode("missingKey", "docked_pinned")).toEqual(state);
  });

  test("changing view mode to window or float, just sets the viewport on the target tool window", () => {
    expectChanges(state.changeViewMode("l9", "window"), {
      l9: { viewMode: "window" },
    });
    expectChanges(state.changeViewMode("l9", "float"), {
      l9: { viewMode: "float" },
    });
  });

  test("changing view mode to docked closes other docked windows in the same section", () => {
    expectChanges(state.changeViewMode("l6", "docked_pinned"), {
      l6: { viewMode: "docked_pinned" },
      l1: { isVisible: false },
    });
    expectChanges(state.changeViewMode("l6", "docked_unpinned"), {
      l6: { viewMode: "docked_unpinned" },
      l1: { isVisible: false },
    });
  });

  test("changing view mode to undocked closes other undocked windows in the same section", () => {
    expectChanges(state.changeViewMode("l6", "undock"), {
      l6: { viewMode: "undock" },
      l7: { isVisible: false },
    });
  });

  test("move returns the same state if the key is invalid", () => {
    expect(state.move("missingKey", 1)).toEqual(state);
  });

  test("moving to the same place", () => {
    const newState = state.move("l3", 1);
    const expectedOrder = ["l2", "l3", "l4", "l5", "l6", "l7", "l1"] as const;
    expectOrderInSide(windows.l3, newState, expectedOrder);
  });

  test("moving an window inside it's own section", () => {
    const newState = state.move("l3", 2);
    const expectedOrder = ["l2", "l4", "l3", "l5", "l6", "l7", "l1"] as const;
    expectOrderInSide(windows.l3, newState, expectedOrder);
  });

  test("moving to another section without specifying the new index", () => {
    const newSide: SideInfo = { anchor: "right", isSplit: true };
    const newState = state.move("l3", newSide);
    const expectedOrder = ["l2", "l4", "l5", "l6", "l7", "l1"] as const;
    expectOrderInSide(windows.l3, newState, expectedOrder);
    expectOrderInSide(newSide, newState, ["r3", "r4", "l3"]);
  });

  test("moving to another section to a particular index", () => {
    const newSide: SideInfo = { anchor: "right", isSplit: true };
    const newState = state.move("l3", newSide, 0);
    const expectedOrder = ["l2", "l4", "l5", "l6", "l7", "l1"] as const;
    expectOrderInSide(windows.l3, newState, expectedOrder);
    expectOrderInSide(newSide, newState, ["l3", "r3", "r4"]);
  });

  test("moving an opened docked window to another side with a currently opened docked window", () => {
    const newSide: SideInfo = { anchor: "right", isSplit: false };
    const newState = state.move("l9", newSide, 0);
    expectOrderInSide(windows.l9, newState, ["l8"]);
    expectOrderInSide(newSide, newState, ["l9", "r1", "r2"]);
    expect(newState.windows.r1.isVisible).toBe(false);
    expect(newState.windows.r2.isVisible).toBe(false);
  });

  test("moving an opened undocked window to another side with an opened undocked window", () => {
    const targetKey = "l7";
    const newSide: SideInfo = { anchor: "bottom", isSplit: true };
    const newState = state.move(targetKey, newSide, 0);
    const expectedOrder = ["l2", "l3", "l4", "l5", "l6", "l1"] as const;
    expectOrderInSide(windows[targetKey], newState, expectedOrder);
    expectOrderInSide(newSide, newState, [targetKey, "b2"]);
    expect(newState.windows.b2.isVisible).toBe(false);
  });

  test("moving an opened docked window to another side with an opened undocked window", () => {
    const targetKey = "l7";
    const newSide: SideInfo = { anchor: "right", isSplit: false };
    const newState = state.move(targetKey, newSide, 0);
    const expectedOrder = ["l2", "l3", "l4", "l5", "l6", "l1"] as const;
    expectOrderInSide(windows[targetKey], newState, expectedOrder);
    expectOrderInSide(newSide, newState, [targetKey, "r1", "r2"]);
    expect(newState.windows.r1.isVisible).toBe(true);
    expect(newState.windows.r2.isVisible).toBe(false);
  });

  test("resizeDock updates weight of the currently visible docked window in that anchor", () => {
    expectChanges(state.resizeDock("left", 100, { width: 200, height: 400 }), {
      l1: { weight: 0.5 },
      l9: { weight: 0.5 },
    });
    expectChanges(state.resizeDock("right", 100, { width: 200, height: 400 }), {
      r1: { weight: 0.5 },
    });
    expectChanges(state.resizeDock("top", 100, { width: 200, height: 400 }), {
      t1: { weight: 0.25 },
    });
    expectNoChanges(
      state.resizeDock("bottom", 100, { width: 200, height: 400 })
    );
  });

  test("resizeUndock updates weight of the currently visible undock window in that anchor", () => {
    expectChanges(
      state.resizeUndock("left", 100, { width: 200, height: 400 }),
      {
        l7: { weight: 0.5 },
      }
    );
    expectNoChanges(
      state.resizeUndock("right", 100, { width: 200, height: 400 })
    );
    expectNoChanges(
      state.resizeUndock("top", 100, { width: 200, height: 400 })
    );
    expectChanges(
      state.resizeUndock("bottom", 100, { width: 200, height: 400 }),
      {
        b2: { weight: 0.25 },
      }
    );
  });

  test("resize split view in a side sets sideWeight for both docked windows", () => {
    expectChanges(state.resizeDockSplitView("left", 0.3), {
      l1: { sideWeight: 0.7 },
      l9: { sideWeight: 0.3 },
    });
  });

  test("stretch width sets the weight if in docked mode, and width property of floatingBounds if in window or float mode", () => {
    expectChanges(state.stretchWidth("l1", 10, { width: 200, height: 400 }), {
      l1: { weight: windows.l1.weight + 10 / 200 },
      l9: { weight: windows.l9.weight + 10 / 200 },
    });
    expectChanges(state.stretchWidth("l7", -10, { width: 200, height: 400 }), {
      l7: { weight: round(windows.l7.weight - 10 / 200) },
    });
    expectChanges(state.stretchWidth("l4", 10, { width: 200, height: 400 }), {
      l4: { floatingBounds: { width: windows.l4.floatingBounds!.width + 10 } },
    });
    expectChanges(state.stretchWidth("l6", -10, { width: 200, height: 400 }), {
      l6: { floatingBounds: { width: windows.l6.floatingBounds!.width - 10 } },
    });
  });

  test("stretch height sets the weight if in docked mode, and height property of floatingBounds if in window or float mode", () => {
    expectChanges(state.stretchHeight("b2", 10, { width: 200, height: 400 }), {
      b2: { weight: round(windows.b2.weight + 10 / 400) },
    });

    expectChanges(state.stretchHeight("t1", -10, { width: 200, height: 400 }), {
      t1: { weight: round(windows.t1.weight - 10 / 400) },
    });
    expectChanges(state.stretchHeight("l4", 10, { width: 200, height: 400 }), {
      l4: {
        floatingBounds: { height: windows.l4.floatingBounds!.height + 10 },
      },
    });
    expectChanges(state.stretchHeight("l6", -10, { width: 200, height: 400 }), {
      l6: {
        floatingBounds: { height: windows.l6.floatingBounds!.height - 10 },
      },
    });
  });

  test("restoreWindows restores state to before hideAll", () => {
    expectNoChanges(state.hideAll().restoreWindows());
  });

  test("restoreWindows restores state to before hideAll, even if tool windows are moved while closed", () => {
    expectNoChanges(
      state
        .hideAll()
        .move("l6", { anchor: "right", isSplit: true })
        .restoreWindows()
    );
  });
  test("removeFromSidebar adds the id to the list of removedFromSidebarIds and set visibility to hidden", () => {
    const newState = state.removeFromSidebar("l6");
    expectChanges(newState, {
      l6: { isVisible: false },
    });
    expect(newState.removedFromSideBarIds).toContain("l6");
  });

  // TODO: make sure if opening a tool window in docked view should in any way set the sideWeight of some of the
  //  windows. It seems the current implementation of ToolWindowState and ToolWindowLayoutState works exactly
  //  like Intellij Platform, and there is no need for adding that complication. Make sure about it.
  //  observation: It seems when windows are switched, the sideWeight for the previously open one (on the other side)
  //  is set.

  // TODO: add a test for this: when a window in split section of an anchor becomes visible while there is a window open
  //  in main view, the one in split view should get the weight of the one in main view.
});

const expectOrderInSide = (
  side: SideInfo,
  newState: ToolWindowsState,
  expectedOrder: Readonly<Array<keyof typeof windows>>
) => {
  const keysAndOrders: { key: Key; order: number }[] = [];
  Object.keys(newState.windows).forEach((key) => {
    if (areInSameSection(side, newState.windows[key as keyof typeof windows])) {
      keysAndOrders.push({ key, order: newState.windows[key].order });
    }
  });
  expect(
    sortBy(({ order }) => order, keysAndOrders).map(({ key }) => key)
  ).toEqual(expectedOrder);
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

function expectChanges(
  newState: ToolWindowsState,
  updates: {
    [key in keyof typeof state.windows]?: DeepPartial<ToolWindowState>;
  }
) {
  expect(newState.windows).toEqual({
    ...state.windows,
    ...mapObjIndexed(
      (value, key) => mergeDeepRight(state.windows[key], value || {}),
      updates
    ),
  });
}
const round = (num: number) => parseFloat(num.toFixed(5));

function expectNoChanges(newState: ToolWindowsState) {
  return expectChanges(newState, {});
}
