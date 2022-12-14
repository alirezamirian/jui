import React, { ReactElement } from "react";
import { ItemProps } from "@react-types/shared";
import { Item as StatelyItem, PartialNode } from "@react-stately/collections";

// noinspection JSUnusedLocalSymbols
/**
 * Item for collection components, which by default disables caching, unless `invalidated` prop is set to false on the
 * context passed to useCollection. Control over cache invalidation policy can be enabled by using
 * `useCollectionCacheInvalidation` for creating such context object.
 */
function Item<T>(props: ItemProps<T>): ReactElement {
  return null as any as React.ReactElement;
}

export type CacheInvalidationContext = { invalidated?: boolean };

// We don't want getCollectionNode to show up in the type definition
let _Item = Item as <T>(props: ItemProps<T>) => JSX.Element;
export { _Item as Item };

/**
 * @private @preapproved
 */
Item.getCollectionNode = function* getCollectionNode<T>(
  props: ItemProps<T>,
  context: CacheInvalidationContext
): Generator<PartialNode<T>> {
  const itemGenerator: Generator<PartialNode<T>> = (
    StatelyItem as any
  ).getCollectionNode(props, context);
  const result = itemGenerator.next().value;
  const originalShouldInvalidate = result.shouldInvalidate;
  result.shouldInvalidate = (context: CacheInvalidationContext) =>
    originalShouldInvalidate?.(context) || context.invalidated;
  yield result;
};
