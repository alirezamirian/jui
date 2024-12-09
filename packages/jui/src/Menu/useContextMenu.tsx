import React, { useRef, useState } from "react";
import { MenuTriggerState } from "@react-stately/menu";

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
  const [positionOrigin, setPositionOrigin] = useState<React.MouseEvent>();
  /**
   * NOTE: not using useMenuTrigger because:
   * - There is no option to have a trigger like this: "right click + long press only by touch" which seems to be the
   *   reasonable trigger for context menu. If we want to use it just for long press, we could disable it if it's not
   *   a touch device, but that would be suboptimal, since both touch and mouse can be available, and it should depend
   *   not on availability of touch, but on the triggered event type. Plus, isDisabled is broken in v<3.5.0
   * - It's not quite clear at the moment, if the aria attributes that useMenuTrigger sets would be applicable to
   *   this context menu component too. The trigger is not the container. For example, if there is a list rendered
   *   inside, the selected item would be the trigger. Maybe even this component, as a container for context menu
   *   is not the best way to allow for context menu, when it comes to a11y concerns. For now, we skip a11y props of the
   *   trigger. A11y props of the menu itself (e.g. aria-label) would also be up to the usage of this component.
   *
   *   TODO: add support for long touch
   */
  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof Element)) {
      return;
    }
    setPositionOrigin(e);
    onOpen?.({ target: e.target });
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

  const overlayRef = useRef(null);

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

    positionOrigin,
  };
};
