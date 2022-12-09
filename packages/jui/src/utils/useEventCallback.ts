import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Interim solution for non-reactive callbacks, until
 * [useEvent](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md) (or whatever it will end up being
 * called), becomes available.
 */
export function useEventCallback<A, R>(
  fn: (...args: A[]) => R
): (...args: A[]) => R | undefined {
  let ref = useRef<typeof fn>();
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => ref.current?.apply(null, args), []);
}
