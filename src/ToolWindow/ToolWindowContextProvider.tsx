import React, { Key, RefObject, useContext, useMemo } from "react";
import { ToolWindowsProps } from "./ToolWindows";
import { ToolWindowState, ViewMode } from "./ToolWindowsState/ToolWindowsState";
import { Anchor } from "./utils";

type ToolWindowContextValue = {
  state: Readonly<ToolWindowState>;
  hide: () => void;
  moveToSide: (args: { anchor: Anchor; isSplit: boolean }) => void;
  changeViewMode: (viewMode: ViewMode) => void;
  stretchWidth: (value: number) => void;
  stretchHeight: (value: number) => void;
};
const ToolWindowContext = React.createContext<ToolWindowContextValue | null>(
  null
);

export const useToolWindowContext = () => {
  const context = useContext(ToolWindowContext);
  if (!context) {
    throw new Error(
      "useToolWindowContext is meant to be used inside a tool window."
    );
  }
  return context;
};

export const ToolWindowContextProvider: React.FC<
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
  const state = toolWindowsState.windows[id];
  const contextValue = useMemo((): ToolWindowContextValue => {
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
    };
  }, [toolWindowsState, state]);
  return (
    <ToolWindowContext.Provider value={contextValue}>
      {children}
    </ToolWindowContext.Provider>
  );
};
