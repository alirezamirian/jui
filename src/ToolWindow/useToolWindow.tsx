import { useFocusWithin } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import React, { FocusEventHandler, RefObject, useState } from "react";

export function useToolWindow(
  contentRef: RefObject<Element>,
  focusableContentRef: RefObject<{ focus: () => void }>
) {
  const [focusWithin, setFocusWithin] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });
  const { focusDelegatorProps } = useFocusDelegator(
    focusableContentRef,
    contentRef
  );

  return {
    toolWindowContentProps: mergeProps(focusWithinProps),
    toolWindowHeaderProps: {
      toolWindowFocused: focusWithin,
    },
    toolWindowProps: {
      tabIndex: -1,
      ...focusDelegatorProps,
    },
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
