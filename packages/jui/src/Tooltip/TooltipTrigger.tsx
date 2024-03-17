import React, {
  HTMLAttributes,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { TooltipTriggerProps as AriaTooltipTriggerProps } from "@react-aria/tooltip";
import { AriaPositionProps } from "@react-aria/overlays";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useMouseEventOverlayPosition } from "@intellij-platform/core/utils/useMouseEventOverlayPosition";
import { useTheme } from "@intellij-platform/core/styled";
import { TooltipTriggerAndOverlay } from "@intellij-platform/core/Tooltip/TooltipTriggerAndOverlay";

export interface TooltipTriggerProps
  // controlling isOpen state is not supported since positioning is based on cursor.
  // PositionedTooltipTrigger can be used for controlled isOpen state
  extends Omit<AriaTooltipTriggerProps, "isOpen" | "defaultOpen" | "trigger"> {
  /**
   * Tooltip content. The value should be an element of type {@link Tooltip}.
   */
  tooltip: ReactElement;
  /**
   * Placement of the tooltip with respect to the cursor
   * @default "bottom left"
   */
  placement?: AriaPositionProps["placement"];
  /**
   * The additional offset applied along the main axis between the element and its
   * anchor element.
   * @default theme.value<number>("HelpTooltip.mouseCursorOffset") ?? 20
   */
  offset?: number;
  /**
   * Either a focusable component, or a render function which accepts trigger props and passes it to some component.
   */
  children:
    | React.ReactNode
    | ((
        props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement> }
      ) => React.ReactNode);
}

/**
 * Sets {@param tooltip} for its {@param children}.
 * Showing tooltip on focus and controlled open state are not supported at the moment, based on how tooltip works in the
 * reference impl, and since tooltip is positioned based on cursor position. Positioning the tooltip based on cursor
 * position requires tooltip to be opened on hover. That's why neither controlling opened state nor showing the tooltip
 * on focus are supported here. {@link PositionedTooltipTrigger} allows for positioning the tooltip with respect to the
 * trigger element, and offers more options.
 */
export const TooltipTrigger = ({
  tooltip,
  children,
  /**
   * ide.tooltip.initialReshowDelay registry key. [Docs](https://jetbrains.github.io/ui/controls/tooltip/#19) says
   * it's 300 by default, but it's 500 in the code currently.
   */
  delay = 500,
  offset,
  placement = "bottom left",
  ...props
}: TooltipTriggerProps): JSX.Element => {
  const triggerRef = useRef<HTMLElement>(null);
  const theme = useTheme();
  const state = useTooltipTriggerState({
    ...props,
    delay,
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  const positionAria = useMouseEventOverlayPosition({
    overlayRef,
    isOpen: state.isOpen,
    placement,
    shouldFlip: true,
    offset:
      offset ?? theme.value<number>("HelpTooltip.mouseCursorOffset") ?? 20,
  });

  // FIXME: Find the explanation for why it happens, and fix it properly, if it's a legit issue.
  useEffect(() => {
    if (state.isOpen) {
      requestAnimationFrame(() => {
        positionAria.updatePosition();
      });
    }
  }, [state.isOpen]);

  return (
    <TooltipTriggerAndOverlay
      tooltip={tooltip}
      positionAria={positionAria}
      trigger={children}
      state={state}
      overlayRef={overlayRef}
      triggerRef={triggerRef}
      /**
       * If we want to support showing tooltip on focus, or if we want to allow controlled open state, we should let it
       * be positioned by the trigger element in that case, rather than mouse position.
       * One solution would be to use useOverlayPosition as well, and conditionally use the right `overlayProps`, based on
       * whether the position determined by mouse is within `triggerRef.current?.getBoundingClientRect()`. Another way
       * (maybe better) would be to have `useMouseEventOverlayPosition` accept `bounds` or `containerBounds`, which if
       * passed, makes sure the position is kept within that boundary. Outside positions would be mapped to the closest
       * point on the border of the boundary.
       */
      showOnFocus={false}
      isDisabled={props.isDisabled}
    />
  );
};
