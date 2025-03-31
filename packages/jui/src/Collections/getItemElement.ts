import { Key, RefObject } from "react";

// non-public function in @react-aria/selection
export function getItemElement(
  collectionRef: RefObject<HTMLElement | null>,
  key: Key
) {
  let selector = `[data-key="${CSS.escape(String(key))}"]`;
  let collection = collectionRef.current?.dataset.collection;
  if (collection) {
    selector = `[data-collection="${CSS.escape(collection)}"]${selector}`;
  }
  return collectionRef.current?.querySelector<HTMLElement>(selector);
}
