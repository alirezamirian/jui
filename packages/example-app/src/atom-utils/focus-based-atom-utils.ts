import { DOMAttributes, FocusEvent, useEffect, useRef } from "react";
import { PrimitiveAtom } from "jotai";
import { equals } from "ramda";
import { useFocusWithin } from "@react-aria/interactions";

import { useStableSetAtom } from "./useStableSetAtom";

export const createFocusBasedSetterHook = <T extends unknown, N extends T = T>(
  atom: PrimitiveAtom<T>,
  nullValue: N
) => {
  let focusedElement: Element | null = null;
  return (value: T, name: string = "unknown") => {
    const setValue = useStableSetAtom(atom);
    const elementRef = useRef<Element>();
    useEffect(() => {
      if (focusedElement === elementRef.current) {
        setValue((currentValue) => {
          return equals(value, currentValue) ? currentValue : value;
        });
      }
    }, [value]);
    return useFocusWithin({
      onFocusWithin: (e: FocusEvent) => {
        elementRef.current = e.currentTarget;
        focusedElement = e.currentTarget;
        setValue(value);
      },
      onBlurWithin: (e: FocusEvent) => {
        if (
          e.relatedTarget instanceof Element &&
          e.relatedTarget?.closest("[data-overlay-container], [role=menu]")
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
    }).focusWithinProps as Pick<DOMAttributes<Element>, "onFocus" | "onBlur">;
  };
};
