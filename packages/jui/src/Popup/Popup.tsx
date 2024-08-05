import React, { ForwardedRef, RefObject, useContext, useState } from "react";
import { DOMProps } from "@react-types/shared";
import { useFocusWithin, useInteractOutside } from "@react-aria/interactions";
import { FocusScope, useFocusable } from "@react-aria/focus";
import { useOverlay, usePreventScroll } from "@react-aria/overlays";
import { filterDOMProps, useObjectRef } from "@react-aria/utils";
import { pipe } from "ramda";

import {
  ensureInViewport,
  OverlayInteractionHandler,
  OverlayResizeHandles,
  position,
  ResizableMovableOverlayOptions,
  useResizableMovableOverlay,
} from "@intellij-platform/core/Overlay";
import { styled } from "@intellij-platform/core/styled";
import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { areInNestedOverlays, Overlay } from "@intellij-platform/core/Overlay";
import { mergeNonNullProps } from "@intellij-platform/core/utils/mergeNonNullProps";
import { useFocusForwarder } from "@intellij-platform/core/utils/useFocusForwarder";

import { useDialog } from "./_useDialog";
import { PopupHeader } from "./PopupHeader";
import { PopupContext, PopupControllerContext } from "./PopupContext";
import { PopupLayout } from "./PopupLayout";
import { StyledPopupHint } from "./StyledPopupHint";

export const StyledPopupContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  outline: none; // Focus will be reflected in header. No need for outline or any other focus style on the container
  ${WINDOW_SHADOW}; // FIXME: OS-dependant style?
`;

/**
 * only needed for setting overflow to hidden to make sure nothing will overflow a window under any circumstances.
 * The reason we can't set that overflow: "hidden" on the StyledWindowContainer itself is that we want resize handles
 * to overflow without bing clipped.
 */
const StyledInnerContainer = styled.div`
  height: inherit;
  overflow: hidden;
`;
export interface PopupProps extends ResizableMovableOverlayOptions, DOMProps {
  children: React.ReactNode;
  onClose?: () => void;

  nonDismissable?: boolean;

  /**
   * By default, Popup prevents scrolling on the scrollable ancestor, if popup is positioned relative to a target
   * element. Allowing or disallowing scroll can be forced by passing boolean value.
   */
  allowScroll?: "auto" | boolean;

  /**
   * Used to position the popup relative to a target element, if there is no positioning information in the input
   * `bounds`/`defaultBounds`.
   */
  positioning?: {
    targetRef: RefObject<HTMLElement>;
    placement?: "bottom" | "top";
  };
}

export const DEFAULT_POPUP_MIN_WIDTH = 50;
export const DEFAULT_POPUP_MIN_HEIGHT = 50;

/**
 * [Popup](https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-%28Community%29?node-id=75426%3A16881&t=vzpRGV2y2cDw5a6Z-0)
 * component, rendered as a draggable overlay which is positioned either in the center of the viewport or relative to a trigger element.
 * If there is a trigger element, use {@link PopupTrigger} instead.
 */
export const _Popup = (
  // NOTE: export is only for __docgenInfo to be emitted for this.
  {
    interactions = "move",
    nonDismissable = false,
    allowScroll = "auto",
    minWidth = DEFAULT_POPUP_MIN_WIDTH,
    minHeight = DEFAULT_POPUP_MIN_HEIGHT,
    positioning: positioningProp,
    onClose: onCloseProp,
    ...props
  }: PopupProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
): JSX.Element => {
  const propsContext = useContext(PopupControllerContext);
  const positioning = positioningProp || propsContext.positioning;
  const onClose = () => {
    onCloseProp?.();
    propsContext.onClose?.();
  };
  const ref = useObjectRef<HTMLDivElement>(forwardedRef);
  const shouldCloseOnInteractOutside = (element: Element) => {
    return (
      !positioning?.targetRef.current?.contains(element) &&
      !areInNestedOverlays(ref.current, element)
    );
  };
  const { overlayProps } = useOverlay(
    {
      isOpen: true, // FIXME?
      onClose,
      shouldCloseOnBlur: !nonDismissable,
      shouldCloseOnInteractOutside,
    },
    ref
  );
  // Passing isDismissable to useOverlay also utilizes useInteractOutside and closes the overlay, but it calls
  // preventDefault() and stopPropagation() on the event, which prevents focus from going to elements outside the popup.
  // Not sure why they do this in react-aria, but it seems we are better off not using that option and using
  // useInteractOutside directly here like this:
  useInteractOutside({
    ref,
    onInteractOutsideStart: (e) => {
      if (
        !nonDismissable &&
        shouldCloseOnInteractOutside(e.target as Element)
      ) {
        onClose();
      }
    },
    // onInteractOutsideStart will not be called if onInteractOutside is not passed!
    onInteractOutside: () => {},
  });

  usePreventScroll({
    isDisabled: allowScroll === "auto" ? !positioning : allowScroll,
  });

  const { bounds, positioned, overlayInteractionHandlerProps } =
    useResizableMovableOverlay(ref, {
      ...props,
      minWidth,
      minHeight,
      observeContentResize: true,
    });
  const positionedBounds =
    positioning?.targetRef.current && !positioned
      ? pipe(
          position({
            targetElement: positioning.targetRef.current,
            placement: positioning.placement,
          }),
          ensureInViewport
        )(bounds)
      : bounds;

  const [isActive, setActive] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setActive,
  });
  const { focusableProps } = useFocusable(
    {
      excludeFromTabOrder: true,
    },
    ref
  );
  const { focusForwarderProps } = useFocusForwarder();

  const { dialogProps, titleProps } = useDialog(props, ref);

  /**
   * A hook like useOverlayStack or useOverlayZIndex can be introduced which would handle focus/blur, and return/set
   * the right z-index so that only the overlay holding the focus would have a higher z-index than others.
   */
  const zIndex = isActive ? 1 : 0;

  return (
    <Overlay>
      <OverlayInteractionHandler {...overlayInteractionHandlerProps}>
        {/* TODO: FocusScope is redundant. Test focus restoration without it (in status bar progress), and remove it if unnecessary */}
        <FocusScope restoreFocus>
          <StyledPopupContainer
            ref={ref}
            style={{
              ...positionedBounds,
              zIndex,
            }}
            tabIndex={-1}
            {...mergeNonNullProps(
              focusWithinProps,
              focusableProps,
              focusForwarderProps,
              overlayProps,
              propsContext.overlayProps || {},
              dialogProps,
              filterDOMProps(props)
            )}
          >
            <PopupContext.Provider
              value={{
                isActive,
                movable: interactions !== "none",
                titleProps,
              }}
            >
              <StyledInnerContainer>{props.children}</StyledInnerContainer>
              {interactions === "all" && <OverlayResizeHandles />}
            </PopupContext.Provider>
          </StyledPopupContainer>
        </FocusScope>
      </OverlayInteractionHandler>
    </Overlay>
  );
};

export const Popup = Object.assign(React.forwardRef(_Popup), {
  Header: PopupHeader,
  Layout: PopupLayout,
  Hint: StyledPopupHint,
});
