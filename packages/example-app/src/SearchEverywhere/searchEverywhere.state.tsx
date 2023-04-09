import { Bounds } from "@intellij-platform/core";
import { atom } from "recoil";

export type SearchEveryWhereTab =
  | "All"
  | "Classes"
  | "Files"
  | "Symbols"
  | "Actions"
  | "Git";

export const searchEverywhereState = {
  /**
   * Whether the popup is open
   */
  isOpen: atom({
    key: "search.everywhere.isOpen",
    default: false,
  }),
  /**
   * Currently selected tab, e.g. "Actions", "Files", etc.
   */
  tab: atom<SearchEveryWhereTab>({
    key: "search.everywhere.tab",
    default: "All",
  }),
  /**
   * The Element of the context of the action that triggered the popup. Used to provide context to search, if needed.
   */
  contextElement: atom<Element>({
    key: "search.everywhere.contextElement",
    default: undefined,
  }),
  /**
   * Initial search query. TODO: make it per contributor
   */
  searchQuery: atom<string>({
    key: "search.everywhere.initialQuery",
    default: "",
  }),
  /**
   * Popup bounds
   */
  bounds: atom<Partial<Bounds> | null>({
    key: "search.everywhere.bounds",
    default: null,
  }),
};
