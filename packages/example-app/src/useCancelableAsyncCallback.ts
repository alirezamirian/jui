import { useRef } from "react";
// @ts-expect-error caf package doesn't come with typing, and @types/caf doesn't exist at the moment
import { CAF } from "caf";

/**
 * A utility to avoid race condition in async flows that should be triggered based on some user interaction.
 * Accepts a generator function representing a cancelable async flow. Each `yield` expression is a potential point of
 * cancellation, and the last invocation always cancels previous in progress invocations (if any).
 * Based on [Cancelable Async Flows](https://github.com/getify/CAF#cancelable-async-flows-caf)
 */
export const useCancelableAsyncCallback = <A extends any[]>(
  asyncCallback: (...args: A) => Generator
) => {
  const cancelToken = useRef<null | { abort: () => void; signal: unknown }>(
    null
  );

  const callbackRef = useRef(asyncCallback);
  callbackRef.current = asyncCallback;

  return (...args: any[]) => {
    cancelToken.current?.abort();
    cancelToken.current = new CAF.cancelToken();

    CAF(function (signal: unknown, ...args: A): unknown {
      return callbackRef.current(...args);
    })(cancelToken.current, ...args);
  };
};
