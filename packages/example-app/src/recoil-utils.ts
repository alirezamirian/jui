import {
  RecoilState,
  RecoilValue,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useEffect, useRef, useState } from "react";

export const createFocusBasedSetterHook =
  <T extends unknown, N extends T = T>(state: RecoilState<T>, nullValue: N) =>
  (value: T) => {
    const setValue = useSetRecoilState(state);
    const isFocusedRef = useRef(false);
    useEffect(() => {
      if (isFocusedRef.current) {
        setValue(value);
      }
    }, [value]);
    return {
      activePathsProviderProps: {
        onFocus: () => {
          setValue(value);
          isFocusedRef.current = true;
        },
        onBlur: () => {
          setValue(nullValue);
          isFocusedRef.current = false;
        },
      },
    };
  };

/**
 * Returns the latest value of a recoil value, or null, if the value is being loaded for the first time.
 * Useful for when stale data is ok, but may get synced soon.
 */
export function useLatestRecoilValue<T>(recoilValue: RecoilValue<T>): T | null {
  const [state, setState] = useState<T | null>(null);
  let loadable = useRecoilValueLoadable(recoilValue);

  useEffect(() => {
    if (loadable.state === "hasValue") {
      setState(loadable.contents);
    }
  }, [loadable]);

  return state;
}

/**
 * Refreshes recoil value on mount
 */
export function useRefreshRecoilValueOnMount<T>(value: RecoilValue<T>) {
  const refresh = useRecoilRefresher_UNSTABLE(value);
  useEffect(() => {
    refresh();
  }, []);
}
