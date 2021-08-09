import React, { Key, useContext, useMemo } from "react";
import { ToolWindowsProps } from "./ToolWindows";
import { ToolWindowState } from "./ToolWindowsState/ToolWindowsState";

const ToolWindowContext = React.createContext<{
  state: Readonly<ToolWindowState>;
  hide: () => void;
} | null>(null);

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
  { id: Key } & Pick<
    ToolWindowsProps,
    "toolWindowsState" | "onToolWindowStateChange"
  >
> = ({ toolWindowsState, onToolWindowStateChange, id, children }) => {
  const state = toolWindowsState.windows[id];
  const contextValue = useMemo(() => {
    return {
      state,
      hide: () => {
        onToolWindowStateChange(toolWindowsState.hide(id));
      },
    };
  }, [toolWindowsState, state]);
  return (
    <ToolWindowContext.Provider value={contextValue}>
      {children}
    </ToolWindowContext.Provider>
  );
};
