import React, { HTMLProps, useEffect } from "react";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useOverlay, usePreventScroll } from "@react-aria/overlays";
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
  const MaybeSuspend = suspense === false ? React.Fragment : React.Suspense;

  return (
    <Overlay>
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
