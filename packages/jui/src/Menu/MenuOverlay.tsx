import React, { HTMLProps, useEffect } from "react";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import {
  MenuOverlayContext,
  MenuProps,
} from "@intellij-platform/core/Menu/Menu";
import { areInNestedOverlays, Overlay } from "@intellij-platform/core/Overlay";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useOverlay, usePreventScroll } from "@react-aria/overlays";

export interface MenuOverlayProps {
  children: React.ReactNode;
  restoreFocus?: boolean;
  overlayProps: HTMLProps<HTMLDivElement>;
  overlayRef?: React.Ref<HTMLDivElement>;
  /**
   * Sets the default value of {@link Menu}'s {@link MenuProps#autoFocus} prop.
   */
  defaultAutoFocus?: MenuProps<unknown>["autoFocus"];
  onClose: () => void;
}

/**
 * Overlay container for Menu.
 * Positioning is not implemented at this layer.
 * {@link MenuOverlayProps#overlayProps} should be used for positioning.
 */
export function MenuOverlay({
  children,
  restoreFocus,
  overlayProps: otherOverlayProps,
  overlayRef: inputOverlayRef,
  defaultAutoFocus,
  onClose,
}: MenuOverlayProps) {
  const overlayRef = useObjectRef(inputOverlayRef);
  const { overlayProps } = useOverlay(
    {
      onClose,
      shouldCloseOnBlur: false,
      isOpen: true,
      isKeyboardDismissDisabled: false,
      isDismissable: true,
      shouldCloseOnInteractOutside: (element) => {
        // FIXME: this is kind of hacky and should be removed when nested menu is properly supported
        return !areInNestedOverlays(overlayRef.current, element);
      },
    },
    overlayRef
  );

  usePreventScroll();

  /**
   * right clicks outside are not currently captured as "outside interaction" by react-aria's useOverlay hook.
   * so we set up a global listener to close the context menu when contextmenu event is triggered outside the
   * context menu container.
   * NOTE: event handler is set up for the `capture` phase, to have it run before the handler for context menu
   * when the menu is used as a context menu
   */
  useEffect(() => {
    const onOutsideContextMenu = () => {
      onClose();
    };
    document.addEventListener("contextmenu", onOutsideContextMenu, {
      capture: true,
    });
    return () =>
      document.removeEventListener("contextmenu", onOutsideContextMenu);
  }, []);

  return (
    <Overlay>
      <FocusScope restoreFocus={restoreFocus} autoFocus>
        <MenuOverlayContext.Provider
          value={{
            close: onClose,
            defaultAutoFocus,
          }}
        >
          <div
            {...mergeProps(overlayProps, otherOverlayProps)}
            ref={overlayRef}
          >
            {children}
          </div>
        </MenuOverlayContext.Provider>
      </FocusScope>
    </Overlay>
  );
}
