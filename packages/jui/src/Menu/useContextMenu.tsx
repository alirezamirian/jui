import React, { useEffect, useRef } from "react";
import { MenuTriggerState } from "@react-stately/menu";
import { useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMouseEventOverlayPosition } from "@intellij-platform/core/utils/useMouseEventOverlayPosition";
import { areInNestedOverlays } from "@intellij-platform/core/Overlay";

export type UseContextMenuProps = {
  /**
   * Whether opening contextmenu is disabled.
   */
  isDisabled?: boolean;
  /**
   * Called when contextmenu is opened.
   * @param args
   */
  onOpen?: (args: {
    /**
     * The target element on which contextmenu event was triggered.
     */
    target: Element;
  }) => void;
};
/**
 * Functionality and accessibility of context menu.
 */
export const useContextMenu = (
  { isDisabled = false, onOpen }: UseContextMenuProps,
  state: MenuTriggerState
) => {
  const containerRef = useRef<number | null>(null);
  /**
   * NOTE: not using useMenuTrigger because:
   * - There is no option to have a trigger like this: "right click + long press only by touch" which seems to be the
   *   reasonable trigger for context menu. If we want to use it just for long press, we could disable it if it's not
   *   a touch device, but that would be suboptimal, since both touch and mouse can be available, and it should depend
   *   not on availability of touch, but on the triggered event type. Plus, isDisabled is broken in v<3.5.0
   * - It's not quite clear at the moment, if the aria attributes that useMenuTrigger sets would be applicable in case
   *   of this context menu component too. the trigger is not the container. For example, if there is a list rendered
   *   inside, the selected item would be the trigger. Maybe even this component, as a container for context menu
   *   is not the best way to allow for context menu, when comes to a11y concerns. For now, we skip a11y props of the
   *   trigger. A11y props of the menu itself (e.g. aria-label) would also be up to the usage of this component.
   *
   *   TODO: add support for long touch
   */
  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    containerRef.current = e.timeStamp;
    updatePosition(e);
    onOpen?.({ target: e.target as Element });
    e.preventDefault();
    // NOTE: we can't use offsetX/offsetY, because it would depend on the exact target that was clicked.
    if (state.isOpen) {
      /**
       * If the context menu is already open, closing and reopening makes sure the menu properly gains the focus.
       * Otherwise, the focus may go back to the background.
       * It also better matches the reference impl.
       */
      state.close();
      setTimeout(() => {
        state.open(null);
      });
    } else {
      state.open(null);
    }
  };
  useEffect(() => {
    const onOutsideContextMenu = (e: MouseEvent) => {
      // Using timestamp an easy (and hopefully reliable) way to detect if it's the same
      // event being handled by onContextMenu, avoiding the overhead of requiring a ref for the container.
      if (containerRef.current !== e.timeStamp) {
        state.close();
      }
    };
    /**
     * right clicks outside are not currently captured as "outside interaction" by react-aria's useOverlay hook.
     * so we set up a global listener to close the context menu when contextmenu event is triggered outside the
     * context menu container.
     * to not require a ref just for this, the ref is manually updated when contextmenu event is triggered
     * on the container (which happens before the event propagates to the document).
     */
    document.addEventListener("contextmenu", onOutsideContextMenu);
    return () =>
      document.removeEventListener("contextmenu", onOutsideContextMenu);
  }, []);

  const overlayRef = useRef(null);

  const { overlayProps: positionProps, updatePosition } =
    useMouseEventOverlayPosition({
      overlayRef,
      placement: "bottom start",
      // shouldFlip should be false, but it doesn't work as expected. Overlay container is rendered within the view port
      // but the menu overflows from the overlay container
      shouldFlip: true,
      offset: -8,
      crossOffset: 2, // to not get the first item hovered on open
      isOpen: state.isOpen,
    });
  const { overlayProps } = useOverlay(
    {
      onClose: () => {
        return state.close();
      },
      shouldCloseOnBlur: false,
      isOpen: state.isOpen,
      isKeyboardDismissDisabled: false,
      isDismissable: true,
      shouldCloseOnInteractOutside: (element) => {
        return !areInNestedOverlays(overlayRef.current, element);
      },
    },
    overlayRef
  );

  const containerProps: React.HTMLAttributes<HTMLElement> = isDisabled
    ? {}
    : {
        onContextMenu,
      };
  return {
    /**
     * props to be applied on the container element which is supposed to have the context menu
     */
    containerProps,
    /**
     * The ref to be applied on the menu overlay wrapper. It's usually an input instead of an output in similar
     * react-aria hooks, but it seemed unnecessary here.
     */
    overlayRef,
    /**
     * props to be applied on the menu overlay wrapper.
     */
    overlayProps: mergeProps(overlayProps, positionProps),
  };
};
