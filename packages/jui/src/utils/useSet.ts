import { useControlledState } from "@react-stately/utils";
import { useMemo } from "react";
import { ImmutableSet } from "./immutableSet";

export function useSetStateSetter<T>(
  setValue: (value: (prevState: Set<T>) => Set<T>, ...args: any[]) => void
) {
  return useMemo(
    () => ({
      add: (...values: T[]) =>
        setValue(
          (currentValue) =>
            new Set(new ImmutableSet(currentValue).add(...values))
        ),
      delete: (...values: T[]) =>
        setValue(
          (currentValue) =>
            new Set(new ImmutableSet(currentValue).delete(...values))
        ),
      clear: () =>
        setValue(
          (currentValue) => new Set(new ImmutableSet(currentValue).clear())
        ),
      toggle: (...values: T[]) =>
        setValue(
          (currentValue) =>
            new Set(new ImmutableSet(currentValue).toggle(...values))
        ),
    }),
    [setValue]
  );
}

/**
 * controllable state management for a Set. returns a tuple containing the value and an object with Set functions on it,
 * which would update the state.
 */
export const useControllableSet = <T>(
  valueProp: Set<T> | undefined,
  defaultValue: Set<T> = new Set(),
  onChange: ((newValue: Set<T>) => void) | undefined
) => {
  const [value, setValue] = useControlledState(
    valueProp!, // bad typing in useControlledState
    defaultValue,
    onChange! // bad typing in useControlledState
  );

  return [value, useSetStateSetter(setValue)] as const;
};
