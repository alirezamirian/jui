import React, { ForwardedRef } from "react";
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  usePopover,
} from "@react-aria/overlays";
import { OverlayTriggerState } from "@react-stately/overlays";

import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";

import { styled } from "../styled";
import { useObjectRef } from "@react-aria/utils";

export interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

const StyledPopover = styled.div`
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${WINDOW_SHADOW}; // FIXME: OS-dependant style?
`;
export const Popover = React.forwardRef(function Popover(
  { children, state, offset = 8, ...props }: PopoverProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const popoverRef = useObjectRef(forwardedRef);
  const { popoverProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      {/* Rendering underlay doesn't seem necessary based on the reference impl */}
      <StyledPopover {...popoverProps} ref={popoverRef}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </StyledPopover>
    </Overlay>
  );
});
