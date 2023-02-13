import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useDebouncedCallback = (
  fn: () => void,
  { timeout = 100 } = {}
) => {
  const fnRef = useRef(fn);
  const currentTimeoutId = useRef<number | null>(null);
  useLayoutEffect(() => {
    fnRef.current = fn;
  });
  useEffect(() => {
    return () => {
      if (currentTimeoutId.current !== null) {
        clearTimeout(currentTimeoutId.current);
      }
    };
  }, []);
  return useCallback(() => {
    if (currentTimeoutId.current !== null) {
      clearTimeout(currentTimeoutId.current);
    }
    currentTimeoutId.current = window.setTimeout(fn, timeout);
  }, []);
};
