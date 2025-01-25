export {
  type CollectionFocusProxyProps,
  useCollectionFocusProxy,
} from "./useCollectionFocusProxy";
export { Divider, DividerItem } from "./Divider";
export * from "./ItemStateContext";
export * from "./ItemLayout";
export { Item } from "./Item";

// Exporting from third-party modules leads to weird "@parcel/transformer-typescript-types: Got unexpected undefined"
// error.
// It's probably a bug in Parcel maybe triggered by something like a circular dependency.
// FIXME: remove this comment and reorder exports when the build tool is changed (to Rolldown or Vite or...)
export { Section } from "@react-stately/collections";
export { SelectionManager } from "@react-stately/selection";
export type { Selection } from "@react-types/shared";

// NOTE: some stuff like `useCollectionCacheInvalidation` are not exported from the index, since the index is re-exported
// from other modules like Menu, Tabs, etc., but that part of the API is not considered a public API at the moment.
// Those stuff are intentionally imported by relative path to Collections folder ATM.
