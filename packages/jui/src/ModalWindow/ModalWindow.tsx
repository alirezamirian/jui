import React, { HTMLAttributes } from "react";
import {
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";
import { AriaDialogProps } from "@react-types/dialog"; // temporary phantom dependency
import { styled } from "@intellij-platform/core/styled";
import { WINDOW_SHADOW } from "@intellij-platform/core/style-constants";
import { mergeProps } from "@react-aria/utils";
import {
  Bounds,
  useResizableMovableWindow,
  WindowInteractionHandler,
  WindowMoveHandle,
  WindowResizeHandles,
} from "@intellij-platform/core/Window";

export interface ModalWindowProps extends AriaDialogProps {
  children: React.ReactNode;
  title: React.ReactNode; // Maybe string here since it's a special case in the original impl, where title is OS-handled and can only be a string
  /**
   * An area at the bottom of the window which is not scrolled as opposed to `children`. Use {@link WindowLayout.Footer}
   * for rendering the common layout of a window footer.
   */
  footer?: React.ReactNode;
  onClose?: () => void;
  /**
   * @default "all"
   */
  interactions?: "all" | "move" | "none";
  defaultBounds?: Bounds;
  bounds?: Bounds;
  onBoundsChange?: (bounds: Bounds) => void;
  minWidth?: number;
  minHeight?: number;
  /**
   * For performance reason, window bounds is kept in a local state during a resize or move interaction, and
   * `onBoundsChange` is called once at the end of interaction. `interceptInteraction` gives a chance of rectifying
   * bounds changes during an interaction to for example apply custom size/placement constraints.
   */
  interceptInteraction?: (
    newBounds: Bounds,
    interactionType: "move" | "resize"
  ) => Bounds;
}

const StyledWindowTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 13px; // not rem! intentional
  line-height: 20px;
  cursor: default;
  user-select: none;
  padding: 0 8px;
`;

const StyledWindowUnderlay = styled.div`
  position: fixed;
  z-index: 1000; // FIXME: z-index should not be hard-coded like this
  inset: 0;
`;
const StyledWindowContainer = styled.div`
  position: absolute;
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

const StyledWindowContentWrapper = styled.div`
  overflow: auto;
  flex: 1;
`;

const StyledWindowFooter = styled.div`
  min-height: min-content;
`;

export const ModalWindowInner = ({
  interactions = "all",
  footer,
  ...props
}: ModalWindowProps): React.ReactElement => {
  const { title, children } = props;

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

  const { bounds, windowInteractionHandlerProps } =
    useResizableMovableWindow(props);

  const renderTitle = (otherProps: HTMLAttributes<HTMLElement> = {}) => (
    <StyledWindowTitle {...mergeProps(titleProps, otherProps)}>
      {title || <>&nbsp;</>}
    </StyledWindowTitle>
  );

  return (
    <StyledWindowUnderlay {...underlayProps}>
      <WindowInteractionHandler {...windowInteractionHandlerProps}>
        <FocusScope contain restoreFocus autoFocus>
          <StyledWindowContainer
            {...mergeProps(overlayProps, dialogProps, modalProps)}
            style={bounds}
            ref={ref}
          >
            <StyledWindowInnerContainer>
              {interactions !== "none" ? (
                <WindowMoveHandle>
                  {({ moveHandleProps }) => renderTitle(moveHandleProps)}
                </WindowMoveHandle>
              ) : (
                renderTitle()
              )}
              <StyledWindowContentWrapper>
                {children}
              </StyledWindowContentWrapper>
              {footer && <StyledWindowFooter>{footer}</StyledWindowFooter>}
            </StyledWindowInnerContainer>
            {interactions === "all" && (
              <WindowResizeHandles
                minWidth={props.minWidth}
                minHeight={props.minHeight}
              />
            )}
          </StyledWindowContainer>
        </FocusScope>
      </WindowInteractionHandler>
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
 * NOTE: The part regarding rendering WindowInteractionHandler, and rendering as a dialog with a focus scope, in an
 * overlay container could be extracted into a component which is then used to create custom resizable/movable overlay
 * dialogs, like "Branches", or "Search Everywhere".
 *
 * TODO: support sizing the window based on minimum/natural size the content requires.
 * TODO: show close button (maybe os-aware styles?)
 * TODO: imperative API for opening a stack of windows (it may be not needed)
 *
 */
export const ModalWindow = (props: ModalWindowProps) => (
  <OverlayContainer>
    <ModalWindowInner {...props} />
  </OverlayContainer>
);
