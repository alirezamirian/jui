import React, { RefObject, useEffect, useRef, useState } from "react";
import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useToolWindowState } from "@intellij-platform/core/ToolWindows";
import { useOverlayMoveHandle } from "@intellij-platform/core/Overlay";
import { useFocusForwarder } from "@intellij-platform/core/utils/useFocusForwarder";

export function useToolWindow(
  {
    containerRef,
    contentRef,
    focusableContentRef,
  }: {
    containerRef: RefObject<HTMLElement>;
    contentRef: RefObject<Element>;
    focusableContentRef: RefObject<{ focus: () => void }>;
  },
  { onFocusChange }: { onFocusChange?: (focused: boolean) => void } = {}
) {
  const [contentHasFocus, setContentHasFocus] = useState(false);
  /**
   * NOTE: useFocusWithin form @react-aria/interactions (at least until 3.5.1) has a couple of problem, because of which
   * we may need to implement our own version of it.
   * - It doesn't play nice with FocusScope with `contain` set to true. When something is blurred, FocusScope prevents
   *   that by restoring focus back immediately. but the blur event is already caught by useFocusWithin. One solution
   *   would be to change useFocusWithin implementation to ignore these blur events that are immediately followed
   *   by a focus event that keeps the focus in.
   * - useFocusWithin has an inconsistent behaviour when it comes to Portals. Since it uses react props for handling
   *   focus and blur, the [react tree determines event bubbling](https://reactjs.org/docs/portals.html#event-bubbling-through-portals),
   *   which can be a very nice feature, when an overlay (rendered in a portal) grabs the focus, which should still
   *   be seen as "within". But the problems is that the current implementation uses DOM `.contains(e.relatedTarget)`
   *   method to determine if focus is no longer within. First of all, using react tree or dom tree to determine "within"
   *   can be seen as an option perhaps. Secondly, it should be consistent on focus and blur.
   *
   *   Right now these problems are no big deal. but it may become an issue when portals are used within the content
   *   of the tool window.
   *
   * NOTE: In the original implementation, when a heading toolbar button opens a menu, and focus goes to menu, the
   * header loses the focus appearance, ant it relies only on content having the focus.
   */
  const { focusWithinProps: contentFocusWithinProps } = useFocusWithin({
    onFocusWithinChange: setContentHasFocus,
  });

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: onFocusChange,
  });

  const { toolWindowProps: autoHideProps } = useAutoHide();

  const { focusForwarderProps } = useFocusForwarder({
    forwardFocus: focusableContentRef.current?.focus,
    ignoreFocusedDescendant: true,
  });

  // If there is no focusable content rendered in the tool window, nothing will be autofocused. In that case
  // we will focus the tool window container itself as a fallback.
  useEffect(() => {
    if (
      !document.activeElement ||
      !containerRef.current?.contains(document.activeElement)
    ) {
      containerRef.current?.focus();
    }
  }, []);

  const { moveHandleProps } = useOverlayMoveHandle();

  return {
    contentHasFocus,
    toolWindowProps: mergeProps(
      focusForwarderProps,
      focusWithinProps,
      autoHideProps,
      {
        tabIndex: -1,
      }
    ),
    toolWindowContentProps: contentFocusWithinProps,
    toolWindowHeaderProps: moveHandleProps,
  };
}

/**
 * Applies the auto hide behaviour of tool window based on view mode information and by handling focus and blur events,
 * on the root tool window element. Returns the necessary props that should be applied to the root tool window element.
 * The implementation is not perfect and may not 100% match the original Intellij Platform implementation.
 * If this focus based implementation for auto hide proves to be fragile and not good enough in future,
 * an alternative approach would be to move auto hide logic to the state management logic as much as possible,
 * and limit the focus based auto-hiding to only when the focus goes within the main content area. That should have
 * less focus-related edge cases.
 * TODO: auto hide behaviour should be moved to the core ToolWindows API. ToolWindows now renders a FocusScope and
 * handles focus events on any tool window, to track last focused tool window.
 */
function useAutoHide() {
  const { blur } = useToolWindowState();
  const hideTimeoutId = useRef<number | null>(null);
  const { focusWithinProps: windowFocusWithinProps } = useFocusWithin({
    onBlurWithin: (e) => {
      // setTimeout and windowHasFocusRef is to work around the problem with useFocusWithin, described above.
      hideTimeoutId.current = window.setTimeout(() => {
        // Sometimes when the element is blurred, the subsequent focus that is triggered by FocusScope to keep the focus
        // is a little delayed and therefore after the timeout reaches. It seem to happen only when a non-focusable
        // area is clicked. We mitigate it by ignoring blur events where nothing is focused. It's not a problem
        // at least with `DefaultToolWindow` implementation that uses a FocusScope.
        const isSomethingElseFocused = e.relatedTarget;
        if (isSomethingElseFocused) {
          blur();
        }
      });
    },
    onFocusWithin: () => {
      if (hideTimeoutId.current !== null) {
        clearTimeout(hideTimeoutId.current);
        hideTimeoutId.current = null;
      }
    },
  });
  return {
    toolWindowProps: windowFocusWithinProps,
  };
}
