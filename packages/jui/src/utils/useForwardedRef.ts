import React, { useRef } from "react";

/**
 * For when a component needs to forward ref, but it too needs to use the same ref. Since forwarded ref can be in form
 * of a callback too, this will normalize it as a RefObject.
 * NOTE: Should we keep the ref in state because of edge cases?
 */
export default function useForwardedRef<T>(
  forwardedRef: React.Ref<T>
): React.RefObject<T> {
  const innerRef = useRef<T>(null);
  React.useEffect(() => {
    if (!forwardedRef) {
      return;
    }

    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  });

  return innerRef;
}
