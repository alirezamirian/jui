import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import React, { FocusEventHandler, RefObject, useRef, useState } from "react";
import { isAutoHide } from "./ToolWindowsState/ToolWindowsState";
import { useToolWindowState } from "./ToolWindowsState/ToolWindowStateProvider";

export function useToolWindow(
  contentRef: RefObject<Element>,
  focusableContentRef: RefObject<{ focus: () => void }>
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

  const { toolWindowProps: autoHideProps } = useAutoHide();

  const { focusDelegatorProps } = useFocusDelegator(
    focusableContentRef,
    contentRef
  );

  return {
    contentHasFocus,
    toolWindowProps: mergeProps(focusDelegatorProps, autoHideProps, {
      tabIndex: -1,
    }),
    toolWindowContentProps: contentFocusWithinProps,
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
 */
function useAutoHide() {
  const { state, hide } = useToolWindowState();
  const hideTimeoutId = useRef<number | null>(null);
  const { focusWithinProps: windowFocusWithinProps } = useFocusWithin({
    onBlurWithin: (e) => {
      // setTimeout and windowHasFocusRef is to workaround the problem with useFocusWithin, described above.
      hideTimeoutId.current = window.setTimeout(() => {
        // Sometimes when the element is blurred, the subsequent focus that is triggered by FocusScope to keep the focus
        // is a little delayed and therefore after the timeout reaches. It seem to happen only when a non-focusable
        // area is clicked. We mitigate it by ignoring blur events where nothing is focused. It's not a problem
        // at least with `DefaultToolWindow` implementation that uses a FocusScope.
        const isSomethingElseFocused = e.relatedTarget;
        if (isAutoHide(state) && isSomethingElseFocused) {
          hide();
        }
      });
    },
    onFocusWithin: () => {
      if (hideTimeoutId.current !== null) {
        clearTimeout(hideTimeoutId.current);
      }
    },
  });
  return {
    toolWindowProps: windowFocusWithinProps,
  };
}

/**
 * Allows for having a focus scope (or simply a focusable element) get focused in a broader container,
 * by handling the focus element on the container, and forwarding the focus onto the target focus scope or element,
 * if currently focused element is not within that boundary.
 * Ensuring the container element is focusable is not something this hook does.
 */
function useFocusDelegator(
  focusableContentRef: RefObject<{ focus: () => void }>,
  contentRef: RefObject<Element>
) {
  const onFocus: FocusEventHandler = (event) => {
    if (event.target !== event.currentTarget) {
      // only when this container is focused. not when anything inside is focused.
      return;
    }
    const possiblyBlurredElement = event.relatedTarget;
    if (
      possiblyBlurredElement instanceof Element &&
      contentRef.current?.contains(possiblyBlurredElement)
    ) {
      // if anything inside the content is being blurred while the container is getting focused, don't do anything
      // let the focus stay where it is.
      return;
    }
    focusableContentRef.current?.focus();
  };
  return { focusDelegatorProps: { onFocus } };
}
