import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Interim solution for non-reactive callbacks, until
 * [useEvent](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md) (or whatever it will end up being
 * called), becomes available.
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  let ref = useRef<typeof fn>();
  useLayoutEffect(() => {
    ref.current = fn;
  });
  const callback = ((...args: Parameters<T>) =>
    ref.current?.apply(null, args)) as T;
  return useCallback<T>(callback, []);
}
