import React, {
  HTMLAttributes,
  ReactElement,
  RefObject,
  useRef,
  useState,
} from "react";
import {
  TooltipTriggerProps as AriaTooltipTriggerProps,
  useTooltipTrigger as useAriaTooltipTrigger,
} from "@react-aria/tooltip";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { FocusableProvider } from "@react-aria/focus";
import { useMouseEventOverlayPosition } from "@intellij-platform/core/utils/useMouseEventOverlayPosition";
import { OverlayContainer } from "@react-aria/overlays";
import { mergeProps, useLayoutEffect } from "@react-aria/utils";
import { useTheme } from "@intellij-platform/core/styled";
import { TooltipContext } from "@intellij-platform/core/Tooltip/TooltipContext";

interface TooltipTriggerProps
  extends Omit<AriaTooltipTriggerProps, "isOpen" | "defaultOpen" | "trigger"> {
  /**
   * Tooltip content. The value should be an element of type {@link Tooltip}.
   */
  tooltip: ReactElement;
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
 * reference impl. This may be revisited in the future.
 *
 * TODO: Implement timeout-based auto-hide (https://jetbrains.github.io/ui/controls/tooltip/#19)
 * TODO: HelpTooltip implements different types of Alignment, one of which is "Cursor". Maybe we can do the same. It may
 *   also help with the challenges in supporting "tooltip on focus" and "controlled state".
 */
export const TooltipTrigger = ({
  tooltip,
  children,
  /**
   * ide.tooltip.initialReshowDelay registry key. [Docs](https://jetbrains.github.io/ui/controls/tooltip/#19) says
   * it's 300 by default, but it's 500 in the code currently.
   */
  delay = 500,
  ...props
}: TooltipTriggerProps): JSX.Element => {
  const theme = useTheme();
  const state = useTooltipTriggerState({
    ...props,
    delay,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isInteractive, setInteractive] = useState(false);
  const {
    /**
     * onMouseDown is preventDefault-ed which interferes with functionality of the tooltip trigger, in use cases like
     * tool window stripe button. Note that since pointerDown is handled for calling the tooltip trigger's onPressStart
     * handler (which hides the tooltip), there is no issue in excluding onMouseDown, because it's only used to preventDefault
     * the event, because of some edge cases focus handling which is not our concern.
     */
    triggerProps: { onMouseDown, ...triggerProps },
    tooltipProps,
  } = useTooltipTrigger(
    props,
    // In Intellij Platform. The tooltip hides right away. We follow the same, unless the tooltip is interactive.
    // Maybe something to rethink if it's worth following the reference impl for.
    { ...state, close: isInteractive ? state.close : () => state.close(true) },
    triggerRef
  );
  const { overlayProps } = useMouseEventOverlayPosition({
    overlayRef,
    // targetRef: triggerRef,
    isOpen: state.isOpen,
    placement: "bottom left",
    shouldFlip: true,
    offset: theme.value<number>("HelpTooltip.mouseCursorOffset") ?? 20,
  });
  useLayoutEffect(() => {
    setInteractive(
      overlayRef.current?.querySelector(
        'a, button, [role="button"], [role=link]'
      ) !== null
    );
  });
  return (
    <>
      {normalizeChildren(children, { ...triggerProps, ref: triggerRef })}
      {state.isOpen && (
        <OverlayContainer>
          <TooltipContext.Provider value={{ state, isInteractive }}>
            <div
              {...mergeProps(
                overlayProps,
                // Not sure if it's ok to apply tooltip props on this wrapper, but it probably is.
                tooltipProps
              )}
              ref={overlayRef}
            >
              {tooltip}
            </div>
          </TooltipContext.Provider>
        </OverlayContainer>
      )}
    </>
  );
};

function normalizeChildren(
  children: Pick<TooltipTriggerProps, "children">["children"],
  triggerProps: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement> }
) {
  if (typeof children === "function") {
    return children(triggerProps);
  }
  if (React.isValidElement(children) && typeof children.type === "string") {
    return React.cloneElement(children, triggerProps);
  }
  return <FocusableProvider {...triggerProps}>{children}</FocusableProvider>;
}

/**
 * A wrapper around react-aria's useTooltipTrigger, adjusting it for Intellij Platform.
 */
const useTooltipTrigger: typeof useAriaTooltipTrigger = (props, state, ref) => {
  const {
    /**
     * Excluding onFocus, because in the original impl, tooltip is not shown upon focus. It's probably nicer to have
     * the tooltip shown on focused tho, and it's something to revisit in the future.
     * If we want to support showing tooltip on focus, or if we want to allow controlled open state, we should let it
     * be positioned by the trigger element in that case, rather than mouse position.
     * One solution would be to use useOverlayPosition as well, and conditionally use the right `overlayProps`, based on
     * whether the position determined by mouse is within `triggerRef.current?.getBoundingClientRect()`. Another way
     * (maybe better) would be to have `useMouseEventOverlayPosition` accept `bounds` or `containerBounds`, which if
     * passed, makes sure the position is kept within that boundary. Outside positions would be mapped to the closest
     * point on the border of the boundary.
     */
    triggerProps: { onFocus, ...triggerProps },
    tooltipProps,
  } = useAriaTooltipTrigger(props, state, ref);
  // onPointerDown returned from the underlying usePress stops propagation which messes with some usages of tooltip
  // like in tab or tool window stripe button. We replace onPointerDown handler with a similar handler that closes
  // the tooltip.
  triggerProps.onPointerDown = () => {
    state.close(true);
  };
  return {
    triggerProps,
    tooltipProps,
  };
};
