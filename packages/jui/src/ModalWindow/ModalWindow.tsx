import React, { RefObject, useContext } from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  Overlay,
  useModalOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { DOMAttributes } from "@react-types/shared";
import { useDialog } from "@react-aria/dialog";
import { AriaDialogProps } from "@react-types/dialog"; // temporary phantom dependency
import { css, styled } from "@intellij-platform/core/styled";
import { isMac, mergeProps } from "@react-aria/utils";
import {
  OverlayInteractionHandler,
  OverlayResizeHandles,
  ResizableMovableOverlayOptions,
  useResizableMovableOverlay,
} from "@intellij-platform/core/Overlay";
import { WindowContext } from "@intellij-platform/core/ModalWindow/WindowContext";
import { UNSAFE_React17SuspenseFix } from "@intellij-platform/core/Overlay/UNSAFE_React17SuspenseFix";
import { StyledDelayedLoadingSpinner } from "@intellij-platform/core/ModalWindow/StyledDelayedLoadingSpinner";

export interface ModalWindowProps
  extends AriaDialogProps,
    ResizableMovableOverlayOptions {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  /**
   * By default, a Suspense boundary is included around the overlays
   * to avoid suspended renders from bubbling up into
   * the higher levels of the application.
   * The suspense boundary is around the overlay itself, and *inside* the modal
   * underlay (if any), which means the interaction with background content
   * will immediately get blocked until rendering is unsuspended.
   * Pass `false` if you don't want this behavior.
   * Pass anything else to render a custom Suspense fallback.
   */
  suspense?: React.ReactNode;
}

const StyledWindowUnderlay = styled.div`
  position: fixed;
  z-index: 1000; // FIXME: z-index should not be hard-coded like this
  inset: 0;
  align-content: center; // for loading
`;

const WINDOW_SHADOW = isMac()
  ? css`
      box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56),
        0 0 0 1px #747474
          /* FIXME: it's not accurate. In macOS the outline has a gradient*/;
    `
  : css`
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15), 0 8px 12px rgba(0, 0, 0, 0.1),
        inset 0 0 0 1px #515355;
    `;
export const StyledWindowContainer = styled.div`
  position: fixed;
  // not checked if there should be a better substitute for * in the following colors. Maybe "Component"?
  background-color: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  border-radius: 8px;
  outline: none;
  ${WINDOW_SHADOW};
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

export const WindowControllerContext = React.createContext<
  Partial<Pick<ModalWindowProps, "onClose">>
>({});

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
 *
 */
export const ModalWindow = ({
  interactions = "all",
  minWidth = DEFAULT_WINDOW_MIN_WIDTH,
  minHeight = DEFAULT_WINDOW_MIN_HEIGHT,
  className,
  suspense,
  ...props
}: ModalWindowProps): React.ReactElement => {
  const propsContext = useContext(WindowControllerContext);
  const onClose = () => {
    propsContext.onClose?.();
    props.onClose?.();
  };

  const ref = React.useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable: false,
      isKeyboardDismissDisabled: false,
    },
    // useModalOverlay doesn't really need the full `OverlayTriggerState` interface.
    // It only requires `isOpen` and `close`.
    // However, it's currently typed like this, so useOverlayTriggerState is used,
    // just to comply with the required type, and in the unlikely case where a future minor version starts to use
    // other properties from `OverlayTriggerState`
    useOverlayTriggerState({
      isOpen: true,
      onOpenChange: (isOpen) => {
        if (!isOpen) {
          onClose();
        }
      },
    }),
    ref
  );
  usePreventScroll();

  const MaybeSuspend = suspense === false ? React.Fragment : React.Suspense;
  return (
    // disableFocusManagement is used because FocusScope is rendered in our implementation.
    // Might be a candidate for refactoring to use the built-in FocusScope of Overlay
    <Overlay disableFocusManagement>
      <StyledWindowUnderlay {...underlayProps} className={className}>
        <MaybeSuspend
          fallback={
            suspense === undefined ? <StyledDelayedLoadingSpinner /> : suspense
          }
        >
          <WindowFrame
            modalProps={modalProps}
            windowRef={ref}
            modalWindowProps={{ ...props, minHeight, minWidth, interactions }}
          />
        </MaybeSuspend>
      </StyledWindowUnderlay>
    </Overlay>
  );
};

/**
 * Window frame taken out into a separate component, so that hook that measures
 * content size based on the passed ref is remounted whenever the suspense
 * boundary unsuspends.
 */
function WindowFrame({
  windowRef,
  modalProps,
  modalWindowProps: {
    minWidth,
    minHeight,
    interactions,
    children,
    ...modalWindowProps
  },
}: {
  windowRef: RefObject<HTMLDivElement>;
  modalProps: DOMAttributes;
  modalWindowProps: ModalWindowProps;
}) {
  const { dialogProps, titleProps } = useDialog(modalWindowProps, windowRef);

  const {
    bounds: style,
    overlayInteractionHandlerProps,
    UNSAFE_measureContentSize,
  } = useResizableMovableOverlay(windowRef, {
    ...modalWindowProps,
    minHeight,
    minWidth,
  });

  return (
    <OverlayInteractionHandler {...overlayInteractionHandlerProps}>
      <FocusScope contain restoreFocus autoFocus>
        <StyledWindowContainer
          {...mergeProps(dialogProps, modalProps, {
            style,
          })}
          ref={windowRef}
        >
          <StyledWindowInnerContainer>
            <WindowContext.Provider
              value={{
                isActive: true, // because it's modal. WindowContext would be used for non-modal windows too, in future
                titleProps,
                movable: interactions !== "none",
              }}
            >
              <UNSAFE_React17SuspenseFix
                measureContentSize={UNSAFE_measureContentSize}
              >
                {children}
              </UNSAFE_React17SuspenseFix>
            </WindowContext.Provider>
          </StyledWindowInnerContainer>
          {interactions === "all" && <OverlayResizeHandles />}
        </StyledWindowContainer>
      </FocusScope>
    </OverlayInteractionHandler>
  );
}
