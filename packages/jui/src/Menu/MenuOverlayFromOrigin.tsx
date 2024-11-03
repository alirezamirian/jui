import React, { ForwardedRef, useEffect, useMemo } from "react";
import {
  MenuOverlay,
  MenuOverlayProps,
} from "@intellij-platform/core/Menu/MenuOverlay";
import { useOverlayPositionFromOrigin } from "@intellij-platform/core/Menu/useOverlayPositionFromOrigin";
import { getScrollParent, isScrollable, useObjectRef } from "@react-aria/utils";
import { createGlobalStyle } from "styled-components";

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

        /**
         * Origin's target element.
         * Used to find the scrollable parent and disable scrolling while
         * the overlay is rendered.
         */
        target?: EventTarget | HTMLElement | null;
      }
    | undefined;
  children: React.ReactNode;
}

const DisableScrollStyles = createGlobalStyle`
  .disable-scroll {
      overflow: hidden !important;
  }
`;

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

    const scrollParent: null | Element = useMemo(() => {
      if (!(origin?.target instanceof HTMLElement)) {
        return null;
      }
      return isScrollable(origin.target)
        ? origin.target
        : getScrollParent(origin.target);
    }, [origin?.target]);

    useEffect(() => {
      // Known issue: closing contextmenu causes a jump in scroll (see project view in example app)
      // It's an issue that existed before the change to disable scroll when the contextmenu is open,
      // so it should not have anythign to do with changing overflow hidden when the menu is open.
      scrollParent?.classList?.add("disable-scroll");
      return () => {
        scrollParent?.classList?.remove("disable-scroll");
      };
    }, []);

    return (
      <>
        <DisableScrollStyles />
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
