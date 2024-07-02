import {
  FocusManager,
  FocusScope as WrappedFocusScope,
  FocusScopeProps,
  useFocusManager,
} from "@react-aria/focus";
import React, { ForwardedRef, useImperativeHandle, useRef } from "react";

export type FocusScopeRef = { focus: (forceFocusFirst?: boolean) => void };
/**
 * A version of FocusScope which also allows for imperatively moving focus to the scope.
 * and has tiny patches/improvements
 * It's useful for
 */
export const FocusScope = React.forwardRef(function BetterFocusScope(
  { children, ...otherProps }: FocusScopeProps,
  ref: ForwardedRef<FocusScopeRef>
) {
  const directChildRef = useRef<HTMLSpanElement>(null);
  const focusManagerRef = useRef<FocusManager>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: (forceFocusFirst?: boolean) => {
        const focusManager = focusManagerRef.current;
        const containerElement = directChildRef.current?.parentElement;
        if (!focusManager) {
          throw new Error("focus manager not found!");
        }
        if (!containerElement) {
          throw new Error("container element not found");
        }
        if (forceFocusFirst) {
          return focusManager.focusFirst();
        }
        const alreadyHasFocused =
          document.activeElement &&
          document.activeElement !== containerElement &&
          containerElement.contains(document.activeElement);
        if (!alreadyHasFocused) {
          focusManager.focusNext({ tabbable: true });
        }
      },
    }),
    []
  );

  return (
    <WrappedFocusScope {...otherProps}>
      <GetFocusManager ref={focusManagerRef} />
      <span data-focus-root-direct-child="" hidden ref={directChildRef} />
      {children}
    </WrappedFocusScope>
  );
});
const GetFocusManager = React.forwardRef(function FocusScopeHandle(
  props: {},
  ref: ForwardedRef<FocusManager>
) {
  const focusManager = useFocusManager();
  useImperativeHandle(ref, () => focusManager, [focusManager]);
  return null;
});
