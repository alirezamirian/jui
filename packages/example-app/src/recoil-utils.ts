import {
  Loadable,
  RecoilState,
  RecoilValue,
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { equals } from "ramda";

export type MaybeRecoilValue<T> = T | RecoilValue<T>;

export const createFocusBasedSetterHook = <T extends unknown, N extends T = T>(
  state: RecoilState<T>,
  nullValue: N
) => {
  let focusedElement: Element | null = null;
  return (value: T, name: string = "unknown") => {
    const setValue = useSetRecoilState(state);
    const elementRef = useRef<Element>();
    useEffect(() => {
      if (focusedElement === elementRef.current) {
        setValue((currentValue) =>
          equals(value, currentValue) ? currentValue : value
        );
      }
    }, [value]);
    return {
      onFocus: (e: FocusEvent) => {
        elementRef.current = e.currentTarget;
        focusedElement = e.currentTarget;
        setValue(value);
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
      },
    };
  };
};

/**
 * Returns the latest value of a recoil value, or null, if the value is being loaded for the first time.
 * Useful for when stale data is ok, but may get synced soon.
 *
 * TODO: returning a tuple here is not the best API. Ideally we could have a fourth type of Lodable which would be
 *  similar to LoadingLoadale, but would hold a previous value as well. Then we could have a hook like similar to
 *  useRecoilValueLoadable, but returning that specific type of Loadable. The only difference with
 *  useRecoilValueLoadable would be calling getValue() would return the previous value if state is loading, making it
 *  easy to implement the common pattern of keeping the previous data plus a loading indicator, when new data is being
 *  loaded.
 */
export function useLatestRecoilValue<T>(
  recoilValue: RecoilValue<T>
): [T | null, Loadable<unknown>["state"]] {
  const [state, setState] = useState<T | null>(null);
  let loadable = useRecoilValueLoadable(recoilValue);

  useEffect(() => {
    if (loadable.state === "hasValue") {
      setState(loadable.contents);
    }
  }, [loadable]);

  return [
    loadable.state === "hasValue" ? loadable.getValue() : state,
    loadable.state,
  ];
}

/**
 * Similar to {@link useLatestRecoilValue}, only that value is guaranteed
 * to be initialized. i.e. the first load of the recoil value will suspend
 * the rendering, but the subsequent updates will not, and the latest value
 * will be used, while a new value is being loaded.
 */
export function useExistingLatestRecoilValue<T>(
  recoilValue: RecoilValue<T>
): [T, Loadable<unknown>["state"]] {
  const [state, setState] = useState<T | null>(null);
  let loadable = useRecoilValueLoadable(recoilValue);

  useEffect(() => {
    if (loadable.state === "hasValue") {
      setState(loadable.contents);
    }
  }, [loadable]);

  const value = loadable.state === "hasValue" ? loadable.getValue() : state;

  if (value === null) {
    throw loadable.toPromise();
  }
  return [value, loadable.state];
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
