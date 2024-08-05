import React, { Key, MutableRefObject } from "react";
import { TreeState } from "@react-stately/tree";

export type TreeContextType<T> = {
  state: Pick<
    TreeState<T>,
    | "collection"
    | "selectionManager"
    | "expandedKeys"
    | "disabledKeys"
    | "toggleKey"
  >;
  focused: boolean;
  onActionRef: MutableRefObject<((key: Key) => void) | undefined>;
};

export const TreeContext = React.createContext<TreeContextType<any> | null>(
  null
);
