import { Key, RefObject, useEffect, useState } from "react";

/**
 * Given a ref to a scrollable container of collection items, returns the keys that are not completely visible and
 * are off view because of scroll. It relies on data-key property of observed elements.
 * @param scrollableItemsContainerRef
 * @param threshold
 */
export function useCollectionOverflowObserver(
  scrollableItemsContainerRef: RefObject<HTMLElement>,
  { threshold = 0.9 }: { threshold?: number } = {}
) {
  const [intersectionObserver, setIntersectionObserver] =
    useState<IntersectionObserver | null>(null);
  const [overflowedKeys, setOverflowedKeys] = useState<Set<Key>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newHiddenKeys = entries
          .map((entry) =>
            !entry.isIntersecting && entry.target instanceof HTMLElement
              ? entry.target.dataset.key
              : undefined
          )
          .filter<string>((val): val is string => Boolean(val));
        const newVisibleKeys = entries
          .map((entry) =>
            entry.isIntersecting && entry.target instanceof HTMLElement
              ? entry.target.dataset.key
              : null
          )
          .filter<string>((val): val is string => Boolean(val));

        setOverflowedKeys(
          (currentOverflowMenuKeys) =>
            new Set(
              [...currentOverflowMenuKeys]
                .filter((key) => !newVisibleKeys.includes(`${key}`))
                .concat(newHiddenKeys)
            )
        );
      },
      {
        root: scrollableItemsContainerRef.current,
        rootMargin: "0px",
        threshold,
      }
    );
    setIntersectionObserver(observer);
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    intersectionObserver,
    overflowedKeys,
  };
}
