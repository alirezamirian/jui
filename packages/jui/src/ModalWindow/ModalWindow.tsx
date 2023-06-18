import React, { FocusEventHandler, useRef } from "react";
import {
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import { focusSafely, FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";
import { AriaDialogProps } from "@react-types/dialog"; // temporary phantom dependency
import { styled } from "@intellij-platform/core/styled";
import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { mergeProps } from "@react-aria/utils";
import {
  OverlayInteractionHandler,
  OverlayResizeHandles,
  ResizableMovableOverlayOptions,
  useResizableMovableOverlay,
} from "@intellij-platform/core/Overlay";
import { WindowContext } from "@intellij-platform/core/ModalWindow/WindowContext";

export interface ModalWindowProps
  extends AriaDialogProps,
    ResizableMovableOverlayOptions {
  children: React.ReactNode;
  onClose?: () => void;
}

const StyledWindowUnderlay = styled.div`
  position: fixed;
  z-index: 1000; // FIXME: z-index should not be hard-coded like this
  inset: 0;
`;
const StyledWindowContainer = styled.div`
  position: fixed;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  border-radius: 8px;
  ${WINDOW_SHADOW}; // FIXME: OS-dependant style?
  outline: 1px solid #555; // FIXME
`;

/**
 * only needed for setting overflow to hidden to make sure nothing will overflow a window under any circumstances.
 * The reason we can't set that overflow: "hidden" on the StyledWindowContainer itself is that we want resize handles
 * to overflow without bing clipped.
 */
const StyledWindowInnerContainer = styled.div`
  height: inherit;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const DEFAULT_WINDOW_MIN_WIDTH = 50;
export const DEFAULT_WINDOW_MIN_HEIGHT = 24;

export const ModalWindowInner = ({
  interactions = "all",
  minWidth = DEFAULT_WINDOW_MIN_WIDTH,
  minHeight = DEFAULT_WINDOW_MIN_HEIGHT,
  ...props
}: ModalWindowProps): React.ReactElement => {
  const { children } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: true, // maybe allow rendering closed window? :-?
      onClose: props.onClose,
      isDismissable: false,
      isKeyboardDismissDisabled: false,
      shouldCloseOnBlur: false,
    },
    ref
  );
  usePreventScroll();
  const { modalProps } = useModal();

  const { dialogProps, titleProps } = useDialog(props, ref);

  const { bounds: style, overlayInteractionHandlerProps } =
    useResizableMovableOverlay(ref, { ...props, minHeight, minWidth });

  const { focusContainmentFixProps } = useFocusContainmentFix();

  return (
    <StyledWindowUnderlay {...underlayProps}>
      <OverlayInteractionHandler {...overlayInteractionHandlerProps}>
        <FocusScope contain restoreFocus autoFocus>
          <StyledWindowContainer
            {...mergeProps(
              overlayProps,
              dialogProps,
              modalProps,
              focusContainmentFixProps,
              { style }
            )}
            ref={ref}
          >
            <StyledWindowInnerContainer>
              <WindowContext.Provider
                value={{
                  isActive: true, // because it's modal. WindowContext would be used for non-modal windows too, in future
                  titleProps,
                  movable: interactions !== "none",
                }}
              >
                {children}
              </WindowContext.Provider>
            </StyledWindowInnerContainer>
            {interactions === "all" && <OverlayResizeHandles />}
          </StyledWindowContainer>
        </FocusScope>
      </OverlayInteractionHandler>
    </StyledWindowUnderlay>
  );
};

/**
 * A movable/resizable modal window. The window header which holds the title, can be used to drag the window around.
 * In the reference impl, modal windows are os-native, and contain os-level buttons for minimize/close/maximise, which
 * are not relevant here since they wouldn't be os-native windows. A close button is still relevant (and kind of
 * necessary) and will be added in next iterations.
 *
 * The content container doesn't come with any padding. Other related components should be used for common layouts in
 * modal windows.
 * Example use cases: Window for git operations such as push, update, revert, new branch, etc.
 *
 * ![img.png](https://user-images.githubusercontent.com/3150694/181095858-968c5c66-2ae7-4e40-84e3-e6df43cd4aa4.png)
 *
 * NOTE: The part regarding rendering OverlayInteractionHandler, and rendering as a dialog with a focus scope, in an
 * overlay container could be extracted into a component which is then used to create custom resizable/movable overlay
 * dialogs, like "Branches", or "Search Everywhere".
 *
 * TODO: show close button (maybe os-aware styles?)
 * TODO: imperative API for opening a stack of windows (it may be not needed)
 *
 */
export const ModalWindow = (props: ModalWindowProps) => (
  <OverlayContainer>
    <ModalWindowInner {...props} />
  </OverlayContainer>
);

/**
 * The way FocusScope is implemented at the moment, it's possible for another focus scope to steal the focus,
 * right after the modal window is opened. The issue is not tracked down to the root cause. But with this hook,
 * we make sure there is no way for focus to go out of the modal window, when it's mounted.
 */
function useFocusContainmentFix<T extends HTMLElement>() {
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const onFocus: FocusEventHandler<T> = (e) => {
    lastFocusedElementRef.current = e.target;
  };
  const onBlur: FocusEventHandler = (e) => {
    const probablyFocusedElement = e.relatedTarget;
    if (
      !probablyFocusedElement ||
      (probablyFocusedElement instanceof Element &&
        !e.currentTarget.contains(probablyFocusedElement))
    ) {
      const elementToFocus = lastFocusedElementRef.current;
      if (elementToFocus) {
        focusSafely(elementToFocus);
      }
    }
  };
  return {
    focusContainmentFixProps: {
      onFocus,
      onBlur,
    },
  };
}
