import { ActionDefinition } from "@intellij-platform/core";
import { Key, ReactNode } from "react";

export interface SearchEverywhereContributor<R extends {}> {
  id: string;
  title: string;
  actionId: string;
  use: (args: {
    everyWhereAutoSet: boolean;
  }) => SearchEverywhereContributorResult<R>;
}

export interface SearchEverywhereContributorResult<R extends {}> {
  search(pattern: string): Array<R>;

  processSelectedItem(item: R): void;

  renderItem(item: R): ReactNode;
  getItemText(item: R): string;
  getKey(item: R): Key;

  actions?: ActionDefinition[];
  searchDeps: any[]; // FIXME: useMemo issue
  isEverywhere: boolean;
  toggleEverywhere?: () => void;
  headerFilters?: ReactNode;
  searchAdvertiser?: ReactNode;
}
