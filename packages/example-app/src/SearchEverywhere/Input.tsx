import React, { ForwardedRef, HTMLProps } from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";

export const Input = React.forwardRef(function Input(
  props: HTMLProps<HTMLInputElement>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const ref = useObjectRef(forwardedRef);
  // NOTE: it's important not to pass all props to useFocusable (or not to merge returned props with ALL props), as it
  // results for duplicate event handling, for events like onKeyDown that is handled by useFocusable too.
  const { focusableProps } = useFocusable({ autoFocus: props.autoFocus }, ref);
  return <input {...mergeProps(focusableProps, props)} ref={ref} />;
});
