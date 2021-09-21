import React from "react";

/**
 * Generic state of items in collections, provided via a context.
 * To be used in Menu, Tree, or anything that deals with a collection of items for which the common states like
 * **disabled** or **selected** is applicable.
 */
export interface ItemStateContextType {
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}

export const ItemStateContext = React.createContext<ItemStateContextType | null>(
  null
);
