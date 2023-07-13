import React, { useEffect } from "react";

/**
 * Works around an issue where the focus is lost after a component rendering the focused element is suspended and
 * unsuspended. Haven't tracked down the issue, but it can be the same react 17 issue we worked around in
 * {@link UNSAFE_React17SuspenseFix}.
 */
export function UNSAFE_FocusRestoringSuspense({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    const focusedElement = document.activeElement;
    return () => {
      if (
        focusedElement instanceof HTMLElement &&
        focusedElement !== document.activeElement &&
        document.activeElement === document.body &&
        focusedElement.isConnected
      ) {
        focusedElement.focus(); // restore focus
      }
    };
  }, []);
  return <>{children}</>;
}
