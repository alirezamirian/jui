import {
  RecoilState,
  RecoilValue,
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { equals } from "ramda";

export const createFocusBasedSetterHook =
  <T extends unknown, N extends T = T>(state: RecoilState<T>, nullValue: N) =>
  (value: T) => {
    const setValue = useSetRecoilState(state);
    const isFocusedRef = useRef(false);
    useEffect(() => {
      if (isFocusedRef.current) {
        setValue((currentValue) =>
          equals(value, currentValue) ? currentValue : value
        );
      }
    }, [value]);
    return {
      onFocus: () => {
        setValue(value);
        isFocusedRef.current = true;
      },
      onBlur: (e: FocusEvent) => {
        if (
          e.relatedTarget instanceof Element &&
          e.relatedTarget?.closest("[data-overlay-container]")
        ) {
          // hacky and probably not so reliable way to work around this issue:
          // There are actions that depend on focus-based contextual value. Like "Commit file/folder" action that
          // depends on activePaths state which is focus-based. If the action is triggered via menu, when the menu
          // is opened the focus is lost and therefore the action gets disabled as the activePaths become null.
          // With this hacky fix, we check if the focus is being moved to an overlay, and we don't clear the contextual
          // state on blur, in this case.
          // There are probably better ways to handle this focus-based contextual actions that wouldn't require such
          // hacks.
          return;
        }
        setValue(nullValue);
        isFocusedRef.current = false;
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

export function useRecoilInitialValue<T>(recoilState: RecoilState<T>): T;
export function useRecoilInitialValue<T>(
  recoilState: RecoilState<T>,
  defaultValue?: Exclude<T, undefined | null>
): Exclude<T, undefined | null>;
export function useRecoilInitialValue<T>(
  recoilState: RecoilState<T>,
  defaultValue?: T
) {
  return useRecoilCallback(
    ({ snapshot }) =>
      () =>
        snapshot.getLoadable(recoilState).getValue() ?? defaultValue,
    []
  );
}
