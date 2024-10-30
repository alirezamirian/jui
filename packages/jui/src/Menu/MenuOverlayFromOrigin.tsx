import React, { ForwardedRef } from "react";
import {
  MenuOverlay,
  MenuOverlayProps,
} from "@intellij-platform/core/Menu/MenuOverlay";
import { useOverlayPositionFromOrigin } from "@intellij-platform/core/Menu/useOverlayPositionFromOrigin";
import { useObjectRef } from "@react-aria/utils";

interface MenuOverlayFromOriginProps
  extends Pick<MenuOverlayProps, "onClose" | "defaultAutoFocus"> {
  /**
   * Origin point within the viewport, based on which the menu overlay should be positioned.
   * Any pointer/mouse event, or a plain object with clientX and clientY can be passed.
   */
  origin:
    | {
        /**
         * Horizontal coordinate of the origin point within the viewport.
         * See {@link MouseEvent.clientX}
         */
        clientX: number;
        /**
         * Vertical coordinate of the origin point within the viewport.
         * See {@link MouseEvent.clientX}
         */
        clientY: number;
      }
    | undefined;
  children: React.ReactNode;
}

/**
 * Menu overlay position based on an origin point on the screen.
 * Useful when the menu is opened by a pointer event.
 */
export const MenuOverlayFromOrigin = React.forwardRef(
  function MenuOverlayFromOrigin(
    { children, origin, ...otherProps }: MenuOverlayFromOriginProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) {
    const overlayRef = useObjectRef(forwardedRef);
    const { positionProps } = useOverlayPositionFromOrigin({
      overlayRef,
      origin,
      containerPadding: { x: 0, y: 4 },
    });
    return (
      <>
        {Boolean(origin) && (
          <MenuOverlay
            overlayProps={positionProps}
            overlayRef={overlayRef}
            restoreFocus
            {...otherProps}
          >
            {children}
          </MenuOverlay>
        )}
      </>
    );
  }
);
