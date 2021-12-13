import { TreeState } from "@intellij-platform/core/Tree/__tmp__useTreeState";
import React, { Key, MutableRefObject } from "react";

export type TreeContextType<T> = {
  state: TreeState<T>;
  focused: boolean;
  onActionRef: MutableRefObject<((key: Key) => void) | undefined>;
};

export const TreeContext = React.createContext<TreeContextType<any> | null>(
  null
);
