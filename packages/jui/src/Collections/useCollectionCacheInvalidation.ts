import { CacheInvalidationContext } from "@intellij-platform/core/Collections/Item";
import { usePrevious } from "@intellij-platform/core/utils/usePrevious";

export interface CollectionCacheInvalidationProps {
  /**
   * Defines cache invalidation policy for items. By default, the render result is cached based on the item objects.
   * This is equivalent of passing false or not passing anything for `cacheInvalidation`. If `true` is passed, it will
   * always invalidate the render result, causing the collection to be recreated on each re-render. It can
   * considerably affect performance in large collections. in addition to boolean value, an object with the list of
   * invalidators can also be passed. renderer function is called each time any of the invalidators are changed.
   * Think of it as [dependency array in react hooks](https://reactjs.org/docs/hooks-reference.html#usememo). Except
   * that the length of the array can also safely change.
   */
  cacheInvalidation?: boolean | { invalidators: ReadonlyArray<unknown> };
}

/**
 * Allows cache invalidation options based on input props, for components that use collection
 */
export const useCollectionCacheInvalidation = ({
  cacheInvalidation,
}: CollectionCacheInvalidationProps): CacheInvalidationContext => {
  const invalidators =
    typeof cacheInvalidation === "object" ? cacheInvalidation.invalidators : [];
  const lastInvalidators = usePrevious(invalidators);

  const invalidated =
    typeof cacheInvalidation === "object"
      ? cacheInvalidation.invalidators.length !== lastInvalidators.length ||
        cacheInvalidation.invalidators.some(
          (anInvalidator, index) => anInvalidator !== lastInvalidators[index]
        )
      : cacheInvalidation;

  return {
    invalidated,
  };
};
