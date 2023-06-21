import React, { ForwardedRef } from "react";
import { OverlayTriggerProps, useOverlayTrigger } from "@react-aria/overlays";
import { PressResponder } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import {
  OverlayTriggerProps as OverlayTriggerStateProps,
  useOverlayTriggerState,
} from "@react-stately/overlays";

import { Popup, PopupProps } from "./Popup";

export interface PopupOnTriggerProps
  extends Partial<OverlayTriggerProps>,
    Omit<PopupProps, "positioning" | "onClose" | "children" | "id">,
    OverlayTriggerStateProps {
  trigger: React.ReactElement;
  placement?: Required<PopupProps>["positioning"]["placement"];
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
}

/**
 * Popup opened by a trigger. `trigger` can be an element of any pressable component (such as {@link Button} or
 * {@link ActionButton}), and is rendered in place. Similar to {@link Popup component}, `children` defines the content
 * of Popup.
 */
export const PopupOnTrigger = React.forwardRef(function PopupOnTrigger(
  { trigger, placement, children, ...props }: PopupOnTriggerProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  const state = useOverlayTriggerState(props);
  const triggerRef = useObjectRef(forwardedRef);
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
        >
          {typeof children === "function"
            ? children({ close: state.close })
            : children}
        </Popup>
      )}
    </>
  );
});
