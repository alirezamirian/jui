import React, { RefObject, useContext } from "react";
import { ToolWindowRefValue } from "@intellij-platform/core";

interface ToolWindowManager {
  open(key: string): void;
}

export const ToolWindowsRefContext =
  React.createContext<RefObject<ToolWindowRefValue> | null>(null);

export const useToolWindowManager = (): ToolWindowManager => {
  const toolWindowRef = useContext(ToolWindowsRefContext);
  return {
    open: (key: string) => {
      toolWindowRef?.current?.changeState((state) => state.show(key));
      toolWindowRef?.current?.focus(key);
    },
  };
};
