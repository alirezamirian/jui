import { useRef } from "react";

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  // FIXME: With concurrent features enabled, it's not safe to update ref value at render phase.
  //  Should be safe to update the value in a layoutEffect instead, but usages should be checked after the refactoring
  ref.current = value;
  return ref;
}
