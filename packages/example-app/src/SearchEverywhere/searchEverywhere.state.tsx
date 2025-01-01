import { Bounds } from "@intellij-platform/core";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

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
  isOpen: atom(false),
  /**
   * Currently selected tab, e.g. "Actions", "Files", etc.
   */
  tab: atom<string>("All"),
  /**
   * The Element of the context of the action that triggered the popup. Used to provide context to search, if needed.
   */
  contextElement: atom<Element | null>(null),
  /**
   * Initial search query.
   */
  initialSearchQuery: atomFamily((tab: string) => atom("")),
  /**
   * Popup bounds
   */
  bounds: atom<Partial<Bounds> | null>(null),
};
