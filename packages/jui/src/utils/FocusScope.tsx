import {
  FocusManager,
  focusSafely,
  FocusScope as WrappedFocusScope,
  FocusScopeProps,
  useFocusManager,
} from "@react-aria/focus";
import React, {
  ForwardedRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

type BetterFocusScopeProps = FocusScopeProps & {
  /**
   *
   */
  forceRestoreFocus?: boolean;
};
export type FocusScopeRef = { focus: (forceFocusFirst?: boolean) => void };
/**
 * A version of FocusScope which also allows for imperatively moving focus to the scope.
 * and has tiny patches/improvements
 * It's useful for
 */
export const FocusScope = React.forwardRef(function BetterFocusScope(
  { children, forceRestoreFocus, ...otherProps }: BetterFocusScopeProps,
  ref: ForwardedRef<FocusScopeRef>
) {
  const directChildRef = useRef<HTMLSpanElement>(null);
  const focusManagerRef = useRef<FocusManager>(null);
  useForceRestoreFocus(forceRestoreFocus);
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

/**
 * Kind of a patchy solution for focus restoration when currently focused element is in a different focus scope, but
 * we still want focus restoration to work. So far the only use case is in nested menu, which is rendered as a separate
 * overlay with a focus scope. If focus is within that submenu, when the menu is closed, the default `restoreFocus`
 * doesn't work because there is a check in useRestoreFocus, which requires the currently focused element to be in
 * the focus scope, to do the focus restoration:
 * https://github.com/adobe/react-spectrum/blob/e14523fedd93ac1a4ede355aed70988af572ae74/packages/%40react-aria/focus/src/FocusScope.tsx#L460
 */
function useForceRestoreFocus(restoreFocus?: boolean) {
  useLayoutEffect(() => {
    let nodeToRestore = document.activeElement as HTMLElement;

    return () => {
      if (restoreFocus && nodeToRestore) {
        requestAnimationFrame(() => {
          if (document.body.contains(nodeToRestore)) {
            focusSafely(nodeToRestore);
          }
        });
      }
    };
  }, [restoreFocus]);
}
