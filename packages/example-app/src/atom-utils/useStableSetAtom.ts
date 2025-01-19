import { PrimitiveAtom, useSetAtom, useStore } from "jotai";
import { useCallback } from "react";

type Options = Parameters<typeof useStore>[0];
type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

/**
 * unlike recoil, and unlike React state setter, jotai's state setter returned from
 * useSetAtom always causes a rerender even if the current value is returned
 * from the updater function passed to the setter.
 * That can cause infinite rerender.
 * useStableSetAtom is a drop-in replacement for useSetAtom for primitive atoms,
 * which doesn't set state if the new value is the same as the old value.
 */
export function useStableSetAtom<T>(
  atom: PrimitiveAtom<T>,
  options?: Options
): SetAtom<[T | ((currentValue: T) => T)], void> {
  const store = useStore(options);
  const setAtom = useSetAtom<PrimitiveAtom<T>>(atom);

  return useCallback(
    (value) => {
      const currentValue = store.get(atom);
      const newValue =
        typeof value === "function"
          ? (value as (currentValue: T) => T)(currentValue) // why is casting needed?
          : value;
      if (newValue !== currentValue) {
        setAtom(newValue);
      }
      return newValue;
    },
    [useSetAtom, store]
  );
}
