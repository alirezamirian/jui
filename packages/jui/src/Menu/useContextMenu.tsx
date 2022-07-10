import React, { useRef } from "react";
import { MenuTriggerState } from "@react-stately/menu";
import { useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMouseEventOverlayPosition } from "@intellij-platform/core/utils/useMouseEventOverlayPosition";

/**
 * Functionality and accessibility of context menu.
 */
export const useContextMenu = (
  { isDisabled = false }: { isDisabled?: boolean },
  state: MenuTriggerState
) => {
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
    e.preventDefault();
    // NOTE: we can't use offsetX/offsetY, because it would depend on the exact target that was clicked.
    if (!state.isOpen) {
      state.open(null);
    }
    updatePosition(e);
  };

  const overlayRef = useRef(null);

  const {
    overlayProps: positionProps,
    updatePosition,
  } = useMouseEventOverlayPosition({
    overlayRef,
    placement: "bottom start",
    // shouldFlip should be false, but it doesn't work as expected. Overlay container is rendered within the view port
    // but the menu overflows from the overlay container
    shouldFlip: true,
    offset: -8,
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
        // FIXME: this is kind of hacky and should be removed when nested menu is properly supported
        return !element.matches("[role=menu] *");
      },
    },
    overlayRef
  );

  const containerProps: React.HTMLAttributes<HTMLElement> = isDisabled
    ? {}
    : { onContextMenu };
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
