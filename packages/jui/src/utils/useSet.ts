import { useControlledState } from "@react-stately/utils";
import { useMemo } from "react";
import { ImmutableSet } from "./immutableSet";

/**
 * Creates map interface out of a setter of form (currentValue: Map) => Map
 * Use {@link useControllableSet} instead if you need a Set state in a React component.
 * This is useful for use outside React components, such as state management libraries.
 */
export const createSetInterface = <T>(
  set: (value: (prevState: Set<T>) => Set<T>) => void
) => ({
  add: (...values: T[]) =>
    set(
      (currentValue) => new Set(new ImmutableSet(currentValue).add(...values))
    ),
  delete: (...values: T[]) =>
    set(
      (currentValue) =>
        new Set(new ImmutableSet(currentValue).delete(...values))
    ),
  clear: () =>
    set((currentValue) => new Set(new ImmutableSet(currentValue).clear())),
  toggle: (...values: T[]) =>
    set(
      (currentValue) =>
        new Set(new ImmutableSet(currentValue).toggle(...values))
    ),
});

function useStateSetterForSet<T>(
  setValue: (value: (prevState: Set<T>) => Set<T>, ...args: any[]) => void
) {
  return useMemo(() => createSetInterface(setValue), [setValue]);
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

  // @ts-expect-error FIXME https://github.com/adobe/react-spectrum/issues/2320
  return [value, useStateSetterForSet(setValue)] as const;
};
