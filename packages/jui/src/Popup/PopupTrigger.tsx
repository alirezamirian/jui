import React, { ForwardedRef } from "react";
import { OverlayTriggerProps, useOverlayTrigger } from "@react-aria/overlays";
import { PressResponder } from "@react-aria/interactions";
import { useObjectRef } from "@react-aria/utils";
import {
  OverlayTriggerProps as OverlayTriggerStateProps,
  useOverlayTriggerState,
} from "@react-stately/overlays";

import { Popup, PopupProps } from "./Popup";
import { PopupControllerContext } from "./PopupContext";

export interface PopupTriggerProps
  extends Partial<OverlayTriggerProps>,
    OverlayTriggerStateProps {
  placement?: Required<PopupProps>["positioning"]["placement"];
  popup:
    | React.ReactElement
    | (({ close }: { close: () => void }) => React.ReactNode);
  children: React.ReactElement;
}

/**
 * Popup opened by a trigger. `trigger` can be an element of any pressable component (such as {@link Button} or
 * {@link ActionButton}), and is rendered in place. Similar to {@link Popup component}, `children` defines the content
 * of Popup.
 */
export const PopupTrigger = React.forwardRef(function PopupTrigger(
  { placement, children, popup, ...props }: PopupTriggerProps,
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
        {children}
      </PressResponder>
      {state.isOpen && (
        <PopupControllerContext.Provider
          value={{
            overlayProps,
            positioning: {
              targetRef: triggerRef,
              placement,
            },
            onClose: state.close,
          }}
        >
          {typeof popup === "function" ? popup({ close: state.close }) : popup}
        </PopupControllerContext.Provider>
      )}
    </>
  );
});
