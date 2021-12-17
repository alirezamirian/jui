import React from "react";
import { CollectionSpeedSearchMatches } from "@intellij-platform/core/CollectionSpeedSearch/useCollectionSpeedSearchResult";
import { Collection, Node } from "@react-types/shared";

export type CollectionSpeedSearchContextValue = {
  matches: CollectionSpeedSearchMatches;
  collection: Collection<Node<unknown>>;
};

export const CollectionSpeedSearchContext = React.createContext<CollectionSpeedSearchContextValue | null>(
  null
);
