import React, { Key } from "react";
import { ListState } from "@react-stately/list";

export type ListContextType<T> = {
  state: ListState<T>;
  focused: boolean;
  onAction: ((key: Key) => void) | undefined;
};

export const ListContext = React.createContext<ListContextType<any> | null>(
  null
);
