import React, { HTMLProps, useEffect, useRef } from "react";
import { mergeProps, useLayoutEffect, useObjectRef } from "@react-aria/utils";
import {
  ariaHideOutside,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import {
  MenuOverlayContext,
  MenuProps,
} from "@intellij-platform/core/Menu/Menu";
import { areInNestedOverlays, Overlay } from "@intellij-platform/core/Overlay";
import {
  DelayedLoadingSpinner,
  LOADING_SPINNER_SIZE_SMALL,
} from "@intellij-platform/core/LoadingSpinner";

export interface MenuOverlayProps {
  children: React.ReactNode;
  restoreFocus?: boolean;
  autoFocus?: boolean;
  overlayProps: HTMLProps<HTMLDivElement>;
  overlayRef?: React.Ref<HTMLDivElement>;
  /**
   * Sets the default value of {@link Menu}'s {@link MenuProps#autoFocus} prop.
   */
  defaultAutoFocus?: MenuProps<unknown>["autoFocus"];
  onClose: () => void;
  suspense?: React.ReactNode;
}

/**
 * Overlay container for Menu.
 * Positioning is not implemented at this layer.
 * {@link MenuOverlayProps#overlayProps} should be used for positioning.
 */
export function MenuOverlay({
  children,
  restoreFocus,
  autoFocus,
  overlayProps: otherOverlayProps,
  overlayRef: inputOverlayRef,
  defaultAutoFocus,
  onClose,
  suspense,
}: MenuOverlayProps) {
  const overlayRef = useObjectRef(inputOverlayRef);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    if (overlayContainerRef.current) {
      // This is done in usePopover, and either ariaHideOutside or keepVisible
      // is called depending on isModal.
      // In JUI, menus are non-modal, but keepVisible is not exposed from @react-aria/overlays.
      // Without calling either keepVisible or ariaHideOutside, if the menu is rendered in a modal
      // overlay like ModalWindow, it will be caught by ModalWindow's ariaHideOutside mutation observer
      // getting aria-hidden="true".
      // TODO: refactor to use the more high-level, usePopover hook.
      return ariaHideOutside([overlayContainerRef.current]);
    }
  }, [overlayContainerRef]);

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
  const MaybeSuspend = suspense === false ? React.Fragment : React.Suspense;

  return (
    <Overlay containerRef={overlayContainerRef}>
      <FocusScope restoreFocus={restoreFocus} autoFocus={autoFocus}>
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
            <MaybeSuspend
              fallback={
                suspense === undefined ? (
                  <DelayedLoadingSpinner size={LOADING_SPINNER_SIZE_SMALL} />
                ) : (
                  suspense
                )
              }
            >
              {children}
            </MaybeSuspend>
          </div>
        </MenuOverlayContext.Provider>
      </FocusScope>
    </Overlay>
  );
}
