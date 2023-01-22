import React, { useRef } from "react";
import { OverlayTriggerProps, useOverlayTrigger } from "@react-aria/overlays";
import { PressResponder } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import {
  OverlayTriggerProps as OverlayTriggerStateProps,
  useOverlayTriggerState,
} from "@react-stately/overlays";

import { Popup, PopupProps } from "./Popup";

export interface PopupOnTriggerProps
  extends Partial<OverlayTriggerProps>,
    Omit<PopupProps, "positioning" | "onClose" | "id">,
    OverlayTriggerStateProps {
  trigger: React.ReactElement;
  placement?: Required<PopupProps>["positioning"]["placement"];
}

/**
 * Popup opened by a trigger. `trigger` can be an element of any pressable component (such as {@link Button} or
 * {@link ActionButton}), and is rendered in place. Similar to {@link Popup component}, `children` defines the content
 * of Popup.
 */
export const PopupOnTrigger = React.forwardRef(function PopupOnTrigger({
  trigger,
  placement,
  ...props
}: PopupOnTriggerProps) {
  const state = useOverlayTriggerState(props);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { overlayProps, triggerProps } = useOverlayTrigger(
    { type: props.type || "menu" },
    state,
    triggerRef
  );
  return (
    <>
      <PressResponder ref={triggerRef} {...triggerProps}>
        {trigger}
      </PressResponder>
      {state.isOpen && (
        <Popup
          {...mergeProps(props, overlayProps)}
          positioning={{ targetRef: triggerRef, placement }}
          onClose={state.close}
        />
      )}
    </>
  );
});
