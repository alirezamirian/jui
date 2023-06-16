import React, {
  HTMLAttributes,
  HTMLProps,
  ReactElement,
  RefObject,
  useState,
} from "react";
import { useTooltipTrigger as useAriaTooltipTrigger } from "@react-aria/tooltip";
import { TooltipTriggerState } from "@react-stately/tooltip";
import { FocusableProvider } from "@react-aria/focus";
import { OverlayContainer } from "@react-aria/overlays";
import { mergeProps, useLayoutEffect } from "@react-aria/utils";
import { TooltipContext } from "@intellij-platform/core/Tooltip/TooltipContext";

interface TooltipTriggerBaseProps {
  /**
   * Tooltip content. The value should be an element of type {@link Tooltip}.
   */
  tooltip: ReactElement;
  /**
   * props to be applied on the tooltip overlay, for positioning.
   */
  tooltipOverlayProps: HTMLProps<HTMLDivElement>;
  /**
   * Either a focusable component, or a render function which accepts trigger props and passes it to some component.
   */
  trigger:
    | React.ReactNode
    | ((
        props: HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLElement> }
      ) => React.ReactNode);

  state: TooltipTriggerState;

  showOnFocus?: boolean;

  overlayRef: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLElement>;
  isDisabled?: boolean;
}

/**
 * Sets {@param tooltip} for its {@param children}. It doesn't handle tooltip positioning, and so shouldn't be used
 * directly. {@param tooltipOverlayProps} should be used to apply the intended positioning.
 *
 * TODO: Implement timeout-based auto-hide (https://jetbrains.github.io/ui/controls/tooltip/#19)
 * TODO: shadow
 */
export const TooltipTriggerAndOverlay = ({
  tooltip,
  trigger,
  state,
  tooltipOverlayProps,
  overlayRef,
  triggerRef,
  showOnFocus,
  ...props
}: TooltipTriggerBaseProps): JSX.Element => {
  const [isInteractive, setInteractive] = useState(false);
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    props,
    // In Intellij Platform. The tooltip hides right away. We follow the same, unless the tooltip is interactive.
    // Maybe something to rethink if it's worth following the reference impl for.
    { ...state, close: isInteractive ? state.close : () => state.close(true) },
    triggerRef
  );

  if (!showOnFocus) {
    delete triggerProps.onFocus;
  }

  useLayoutEffect(() => {
    setInteractive(
      overlayRef.current?.querySelector(
        'a, button, [role="button"], [role=link]'
      ) !== null
    );
  });
  return (
    <>
      {normalizeChildren(trigger, { ...triggerProps, ref: triggerRef })}
      {state.isOpen && !props.isDisabled && (
        <OverlayContainer>
          <TooltipContext.Provider value={{ state, isInteractive }}>
            <div
              {...mergeProps(
                tooltipOverlayProps,
                // Is it ok to apply tooltip props on this wrapper?
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
  children: TooltipTriggerBaseProps["trigger"],
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
  const { triggerProps, tooltipProps } = useAriaTooltipTrigger(
    props,
    state,
    ref
  );
  // onPointerDown returned from the underlying usePress stops propagation which messes with some usages of tooltip
  // like in tab or tool window stripe button. We replace onPointerDown handler with a similar handler that closes
  // the tooltip.
  triggerProps.onPointerDown = () => {
    if (!(ref.current instanceof HTMLInputElement)) {
      state.close(true);
    }
  };
  /**
   * onMouseDown is preventDefault-ed which interferes with functionality of the tooltip trigger, in use cases like
   * tool window stripe button. Note that since pointerDown is handled for calling the tooltip trigger's onPressStart
   * handler (which hides the tooltip), there is no issue in excluding onMouseDown, because it's only used to preventDefault
   * the event, because of some edge cases focus handling which is not our concern.
   */
  delete triggerProps.onMouseDown;

  return {
    triggerProps,
    tooltipProps,
  };
};
