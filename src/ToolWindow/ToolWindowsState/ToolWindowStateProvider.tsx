import React, { Key, RefObject, useContext, useMemo } from "react";
import { ToolWindowsProps } from "../ToolWindows";
import { ToolWindowState, ViewMode, WindowBounds } from "./ToolWindowsState";
import { Anchor } from "../utils";

type ToolWindowStateContextValue = {
  state: Readonly<ToolWindowState>;
  hide: () => void;
  moveToSide: (args: { anchor: Anchor; isSplit: boolean }) => void;
  changeViewMode: (viewMode: ViewMode) => void;
  stretchWidth: (value: number) => void;
  stretchHeight: (value: number) => void;
  setFloatingBounds: (bounds: WindowBounds) => void;
};
const ToolWindowStateContext = React.createContext<ToolWindowStateContextValue | null>(
  null
);

/**
 * Used in a tool window's UI tree, to get access to the tool window state and actions for changing it.
 */
export const useToolWindowState = () => {
  const context = useContext(ToolWindowStateContext);
  if (!context) {
    throw new Error(
      "useToolWindowContext is meant to be used inside a tool window."
    );
  }
  return context;
};

/**
 * Used in ToolWindows to provide tool window state and necessary actions as a context, which will be accessible
 * within the tool window content tree, via {@link useToolWindowState}
 */
export const ToolWindowStateProvider: React.FC<
  { id: Key; containerRef: RefObject<HTMLElement> } & Pick<
    ToolWindowsProps,
    "toolWindowsState" | "onToolWindowStateChange"
  >
> = ({
  toolWindowsState,
  containerRef,
  onToolWindowStateChange,
  id,
  children,
}) => {
  const contextValue = useMemo((): ToolWindowStateContextValue => {
    const state = toolWindowsState.windows[id];
    return {
      state,
      hide: () => {
        onToolWindowStateChange(toolWindowsState.hide(id));
      },
      moveToSide: (side) => {
        onToolWindowStateChange(toolWindowsState.move(id, side));
      },
      changeViewMode: (viewMode: ViewMode) => {
        onToolWindowStateChange(toolWindowsState.changeViewMode(id, viewMode));
      },
      stretchWidth: (value: number) => {
        const container = containerRef.current;
        if (!container) {
          throw new Error("Couldn't resize since the container is not present");
        }
        onToolWindowStateChange(
          toolWindowsState.stretchWidth(
            id,
            value,
            container.getBoundingClientRect()
          )
        );
      },
      stretchHeight: (value: number) => {
        const container = containerRef.current;
        if (!container) {
          throw new Error("Couldn't resize since the container is not present");
        }
        onToolWindowStateChange(
          toolWindowsState.stretchHeight(
            id,
            value,
            container.getBoundingClientRect()
          )
        );
      },
      setFloatingBounds: (bounds: WindowBounds) => {
        onToolWindowStateChange(toolWindowsState.setFloatingBound(id, bounds));
      },
    };
  }, [toolWindowsState, id]);
  return (
    <ToolWindowStateContext.Provider value={contextValue}>
      {children}
    </ToolWindowStateContext.Provider>
  );
};
