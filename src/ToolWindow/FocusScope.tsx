import {
  FocusManager,
  FocusScope as WrappedFocusScope,
  FocusScopeProps,
  useFocusManager,
} from "@react-aria/focus";
import React, { ForwardedRef, useImperativeHandle, useRef } from "react";

/**
 * A version of FocusScope which also allows for imperatively moving focus to the scope.
 * It's useful for
 */
export const FocusScope = React.forwardRef(function BetterFocusScope(
  { children, ...otherProps }: FocusScopeProps,
  ref: ForwardedRef<{ focus: () => void }>
) {
  const directChildRef = useRef<HTMLSpanElement>(null);
  const focusManagerRef = useRef<FocusManager>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        const focusManager = focusManagerRef.current;
        const containerElement = directChildRef.current?.parentElement;
        if (!focusManager) {
          throw new Error("focus manager not found!");
        }
        if (!containerElement) {
          throw new Error("container element not found");
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
