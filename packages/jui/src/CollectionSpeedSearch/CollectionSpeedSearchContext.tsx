import React from "react";
import { Collection, Node } from "@react-types/shared";
import { CollectionSpeedSearchMatches } from "./useCollectionSpeedSearchResult";

export type CollectionSpeedSearchContextValue = {
  matches: CollectionSpeedSearchMatches;
  collection: Collection<Node<unknown>>;
};

export const CollectionSpeedSearchContext =
  React.createContext<CollectionSpeedSearchContextValue | null>(null);
