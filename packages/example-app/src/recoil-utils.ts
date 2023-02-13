import { RecoilState, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";

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
