/**
 * Properly typed filter function for filtering out null/undefined items in array.
 */
export const notNull = <T>(
  item: T | undefined | null
): item is NonNullable<T> => item != null;
